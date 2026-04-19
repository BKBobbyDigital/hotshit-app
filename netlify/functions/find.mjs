/**
 * POST /api/find
 * Body: { lat: number, lon: number, category: string, radiusTier?: 0|1|2|3 }
 * Returns: { category, radiusMi, cityClass, count, pool: [...] }
 *
 * Pipeline:
 *   1. Resolve city class → default radius for this location
 *   2. Call Google Places searchText with openNow + minRating pre-filters
 *   3. Apply our quality threshold (rating, reviews); relax once if too sparse
 *   4. Score each survivor (rating + popularity + proximity + personalBias)
 *   5. Return top 12 — client picks randomly from top 5, rerolls draw from 6-12
 *   6. 5-min in-memory cache keyed by (lat-bucket, lon-bucket, category, radiusTier)
 */

// Dense-urban bounding boxes — 0.25mi default radius makes sense here.
// Order doesn't matter; first match wins.
const DENSE_BBOXES = [
  { name: 'NYC',     minLat: 40.68, maxLat: 40.88, minLon: -74.03, maxLon: -73.90 },
  { name: 'SF',      minLat: 37.70, maxLat: 37.82, minLon: -122.52, maxLon: -122.36 },
  { name: 'Chicago', minLat: 41.84, maxLat: 41.97, minLon: -87.70,  maxLon: -87.60 },
  { name: 'Boston',  minLat: 42.32, maxLat: 42.40, minLon: -71.13,  maxLon: -71.00 },
  { name: 'DC',      minLat: 38.87, maxLat: 38.99, minLon: -77.12,  maxLon: -76.97 },
  { name: 'Philly',  minLat: 39.92, maxLat: 40.02, minLon: -75.22,  maxLon: -75.12 },
];

function cityClass(lat, lon) {
  for (const bb of DENSE_BBOXES) {
    if (lat >= bb.minLat && lat <= bb.maxLat && lon >= bb.minLon && lon <= bb.maxLon) {
      return { klass: 'dense', defaultRadiusMi: 0.25, name: bb.name };
    }
  }
  return { klass: 'urban', defaultRadiusMi: 0.6, name: null };
}

// Map our 10 categories to Google-friendly text queries.
// Text Search handles natural language well; no need to map to includedTypes
// strictly (karaoke isn't a first-class Places type yet).
const CATEGORY_QUERIES = {
  burgers:   'burger restaurant',
  beer:      'beer bar',
  cocktails: 'cocktail bar',
  coffee:    'coffee shop',
  karaoke:   'karaoke bar',
  pizza:     'pizza',
  sports:    'sports bar',
  sushi:     'sushi',
  tacos:     'tacos',
};
const CATEGORY_LIST = Object.keys(CATEGORY_QUERIES);

// --- Scoring -----------------------------------------------------------------

// V1 always returns 0. V2 Bobby layer consults user favorites here.
function personalBias(_place) { return 0; }

function score(place, distanceMi) {
  const rating = place.rating || 0;
  const reviews = place.userRatingCount || 0;
  const ratingNorm = clamp01((rating - 4.0) / 1.0);
  const popNorm = clamp01(Math.log10(Math.max(1, reviews)) / Math.log10(2000));
  const proxNorm = clamp01(1 - distanceMi / 1.5);
  return 0.45 * ratingNorm + 0.25 * popNorm + 0.30 * proxNorm + personalBias(place);
}

function clamp01(n) { return Math.max(0, Math.min(1, n)); }

function haversineMi(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // miles
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
          + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// --- Google Places -----------------------------------------------------------

async function searchText({ query, lat, lon, radiusMi, minRating }) {
  const url = 'https://places.googleapis.com/v1/places:searchText';
  const body = {
    textQuery: query,
    locationBias: {
      circle: {
        center: { latitude: lat, longitude: lon },
        radius: radiusMi * 1609.34,
      },
    },
    openNow: true,
    minRating,
    rankPreference: 'RELEVANCE',
    pageSize: 20,
  };
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.rating',
        'places.userRatingCount',
        'places.currentOpeningHours.openNow',
        'places.types',
        'places.location',
        'places.priceLevel',
        'places.businessStatus',
      ].join(','),
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Places API ${resp.status}: ${text.slice(0, 400)}`);
  }
  const data = await resp.json();
  return data.places || [];
}

// --- Pool normalization ------------------------------------------------------

function normalizePlace(place, distanceMi) {
  const typeGuess = (place.types || []).find((t) =>
    !['point_of_interest', 'establishment', 'food'].includes(t)
  ) || (place.types || [])[0] || 'spot';
  return {
    place_id: place.id,
    name: place.displayName?.text || 'Unknown',
    addr: place.formattedAddress || '',
    rating: place.rating || 0,
    reviewCount: place.userRatingCount || 0,
    distanceMi: +distanceMi.toFixed(2),
    priceLevel: place.priceLevel || null,
    // hoursText is 'OPEN NOW' from here; detail endpoint could enrich with closing time
    hoursText: place.currentOpeningHours?.openNow ? 'OPEN NOW' : null,
    // Default buzz derives from type tokens; Claude will overwrite when blurb
    // endpoint is called for this pick.
    buzz: [typeGuess.replace(/_/g, ' ').toUpperCase()],
    buzzLabel: null, // set by attachBuzz once we know the full pool context
    blurb: null,
    typeHint: typeGuess,
  };
}

// Compute a 'BUZZ' indicator per place from the full pool context. Pure
// derivation from rating + reviewCount + within-pool ranking — no extra API
// calls. Used by the result card to show 🔥 BUZZING / 🏆 LEGENDARY / etc.
function attachBuzz(places) {
  if (!places.length) return places;
  const sortedByReviews = [...places].sort(
    (a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)
  );
  const busiestId = sortedByReviews[0]?.place_id;
  // Top 25% threshold (review count of the place at the 25th percentile)
  const top25idx = Math.max(0, Math.ceil(places.length * 0.25) - 1);
  const top25Floor = sortedByReviews[top25idx]?.reviewCount || 0;

  return places.map((p) => {
    const rating = p.rating || 0;
    const reviews = p.reviewCount || 0;
    let label = null;
    if (rating >= 4.7 && reviews >= 1000) label = '🏆 LEGENDARY';
    else if (p.place_id === busiestId && reviews >= 100) label = '🔥 BUSIEST';
    else if (reviews >= top25Floor && reviews >= 200) label = '🔥 BUZZING';
    else if (rating >= 4.5 && reviews < 100 && reviews >= 25) label = '💎 SLEEPER';
    return { ...p, buzzLabel: label };
  });
}

// --- Cache (in-memory; survives per function instance warmness) --------------

const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000;

function cacheKey(lat, lon, category, radiusTier) {
  // bucket to ~100m so nearby users share cache
  const latB = Math.round(lat * 1000) / 1000;
  const lonB = Math.round(lon * 1000) / 1000;
  return `${latB}|${lonB}|${category}|${radiusTier}`;
}

// --- Handler -----------------------------------------------------------------

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'POST only' }, 405);
  }
  try {
    if (!process.env.GOOGLE_PLACES_KEY) {
      return json({ error: 'GOOGLE_PLACES_KEY not configured' }, 500);
    }
    const body = await req.json();
    const lat = Number(body.lat);
    const lon = Number(body.lon);
    const radiusTier = Math.max(0, Math.min(3, Number(body.radiusTier) || 0));
    let category = String(body.category || '').toLowerCase();

    if (!Number.isFinite(lat) || !Number.isFinite(lon) || !category) {
      return json({ error: 'lat, lon, and category are required' }, 400);
    }

    if (category === 'random') {
      category = CATEGORY_LIST[Math.floor(Math.random() * CATEGORY_LIST.length)];
    }
    const query = CATEGORY_QUERIES[category];
    if (!query) {
      return json({ error: `unknown category: ${category}` }, 400);
    }

    const key = cacheKey(lat, lon, category, radiusTier);
    const cached = cache.get(key);
    if (cached && Date.now() - cached.t < CACHE_TTL_MS) {
      return json(cached.data);
    }

    const { klass, defaultRadiusMi, name: cityName } = cityClass(lat, lon);
    const multipliers = [1, 2, 4, 8];
    const radiusMi = defaultRadiusMi * multipliers[radiusTier];

    // First pass: strict quality floor
    let places = await searchText({ query, lat, lon, radiusMi, minRating: 4.2 });
    let filtered = places.filter(
      (p) => p.businessStatus === 'OPERATIONAL' && (p.userRatingCount || 0) >= 75
    );

    // Relax once if too sparse
    if (filtered.length < 5) {
      places = await searchText({ query, lat, lon, radiusMi, minRating: 4.0 });
      filtered = places.filter(
        (p) => p.businessStatus === 'OPERATIONAL' && (p.userRatingCount || 0) >= 25
      );
    }

    const scored = filtered
      .map((p) => {
        const d = haversineMi(lat, lon, p.location.latitude, p.location.longitude);
        return { raw: p, dist: d, s: score(p, d) };
      })
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map(({ raw, dist }) => normalizePlace(raw, dist));

    const withBuzz = attachBuzz(scored);

    const result = {
      category,
      radiusMi,
      radiusTier,
      cityClass: klass,
      cityName,
      count: withBuzz.length,
      pool: withBuzz,
    };
    cache.set(key, { t: Date.now(), data: result });
    return json(result);
  } catch (e) {
    return json({ error: String(e.message || e) }, 500);
  }
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export const config = { path: '/api/find' };
