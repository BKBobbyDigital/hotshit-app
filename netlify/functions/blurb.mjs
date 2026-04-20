/**
 * POST /api/blurb
 * Body: { place_id: string, name: string, typeHint?: string, addr?: string,
 *         rating?: number, reviewCount?: number }
 * Returns: { blurb: string, buzzwords: string[3] }
 *
 * Pipeline:
 *   1. Permanent Blobs cache lookup (keyed place_id@vN).
 *   2. Fetch Place Details from Google for reviews + editorialSummary —
 *      this is the source material that makes each place sound distinct.
 *   3. Call Claude Sonnet with the richer context.
 *   4. Cache result. Fallbacks for every failure mode, none of them cached.
 */

import Anthropic from '@anthropic-ai/sdk';
import { getStore } from '@netlify/blobs';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 200;
// Bump to invalidate all cached blurbs (e.g., after tuning the system prompt
// or switching models). v2 added Place Details review context + Sonnet upgrade.
// v3 added currentOpeningHours.periods so the client can compute live
// 'CLOSES IN N MIN' instead of a static OPEN UNTIL string.
const BLURB_VERSION = 3;
const cacheKeyFor = (place_id) => `${place_id}@v${BLURB_VERSION}`;

const SYSTEM = `You write short venue blurbs for Hot Shit, an app that helps friends decide where to go out.

Voice: fun, opinionated, slightly irreverent. Punchy, confident sentences. Never use hype words like "amazing", "must-try", "authentic", "hidden gem", "vibes". Never hedge.

You'll receive a place's name, type, rating, and — critically — real review snippets and/or an editorial summary. USE the review snippets to write something specific to THIS place: a signature dish, a specific detail, the actual vibe customers describe. Do not generalize. If reviews mention a standout item or quirk, lead with that.

Return ONLY a JSON object with these exact keys:
- "blurb": one short declarative sentence, MAX 90 characters, ending with a period. No emoji. No quotes in the text.
- "buzzwords": array of EXACTLY 3 strings. Each 1-2 words, Title Case, MAX 12 characters. Pull from what makes this place specific (e.g., "Adobada", "BYOB", "Counter Seat").

Return the JSON object and nothing else. No code fences, no commentary.`;

const FALLBACK_BY_TYPE = {
  bar:                 { blurb: 'Pull up. Order something cold.',           buzzwords: ['Drinks', 'Pull Up', 'Local'] },
  cocktail_bar:        { blurb: 'Sit at the bar. Ask what\'s good.',         buzzwords: ['Cocktails', 'Bar Seat', 'Vibe'] },
  sports_bar:          { blurb: 'Pitchers and the game on every screen.',   buzzwords: ['Sports', 'Pitchers', 'Loud'] },
  cafe:                { blurb: 'Caffeine, chair, done.',                    buzzwords: ['Coffee', 'Quiet', 'Chair'] },
  coffee_shop:         { blurb: 'Caffeine, chair, done.',                    buzzwords: ['Coffee', 'Quiet', 'Chair'] },
  hamburger_restaurant:{ blurb: 'Smash the burger. Don\'t overthink it.',    buzzwords: ['Burgers', 'Meat', 'Hands-on'] },
  pizza_restaurant:    { blurb: 'Pizza. Eat it.',                            buzzwords: ['Pizza', 'Slice', 'Done'] },
  sushi_restaurant:    { blurb: 'Counter seat if you can. Trust the chef.', buzzwords: ['Sushi', 'Counter', 'Omakase'] },
  mexican_restaurant:  { blurb: 'Margs mandatory. Tacos likely.',            buzzwords: ['Tacos', 'Margs', 'Late'] },
  karaoke:             { blurb: 'Private room. Pick your anthem.',           buzzwords: ['Karaoke', 'Late', 'Loud'] },
  restaurant:          { blurb: 'Solid kitchen. Get there.',                 buzzwords: ['Food', 'Tested', 'Close'] },
};
const FALLBACK_DEFAULT = { blurb: 'Solid pick. Go.', buzzwords: ['Local', 'Tested', 'Close'] };

function fallbackFor(typeHint) {
  const key = (typeHint || '').toLowerCase();
  return FALLBACK_BY_TYPE[key] || FALLBACK_DEFAULT;
}

async function fetchPlaceDetails(place_id) {
  if (!process.env.GOOGLE_PLACES_KEY) return null;
  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(place_id)}`;
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY,
        'X-Goog-FieldMask': 'reviews,editorialSummary,priceLevel,currentOpeningHours.periods',
      },
    });
    if (!resp.ok) {
      console.error('[blurb] Place Details failed:', resp.status, (await resp.text()).slice(0, 200));
      return null;
    }
    return await resp.json();
  } catch (e) {
    console.error('[blurb] Place Details exception:', e.message);
    return null;
  }
}

// Reject requests that didn't originate from our own UI. Abuse speed bump
// — Origin can be forged from non-browser clients, but browsers enforce it.
function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (origin === 'https://hot-shit.netlify.app') return true;
  if (/^https:\/\/[a-z0-9-]+--hot-shit\.netlify\.app$/.test(origin)) return true;
  if (origin === 'http://localhost:8888' || origin === 'http://localhost:3000') return true;
  return false;
}

import { checkRateLimit, getClientIp } from './_ratelimit.mjs';
const RL_LIMIT = 120;           // /api/blurb calls per IP per hour
const RL_WINDOW_MS = 60 * 60e3; // 1 hour

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'POST only' }, 405);
  }
  if (!isAllowedOrigin(req.headers.get('origin'))) {
    return json({ error: 'forbidden' }, 403);
  }
  const rl = await checkRateLimit({
    ip: getClientIp(req),
    endpoint: 'blurb',
    limit: RL_LIMIT,
    windowMs: RL_WINDOW_MS,
  });
  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ error: 'rate_limit', retryAfter: rl.retryAfter }),
      { status: 429, headers: { 'content-type': 'application/json', 'retry-after': String(rl.retryAfter) } },
    );
  }
  let typeHint;
  try {
    const body = await req.json();
    const { place_id, name, addr, rating, reviewCount, typeHint: th } = body || {};
    typeHint = th;
    if (!place_id || !name) {
      return json({ error: 'place_id and name required' }, 400);
    }

    const store = getStore({ name: 'hotshit-blurbs' });
    const key = cacheKeyFor(place_id);
    const cached = await store.get(key, { type: 'json' });
    if (cached) return json(cached);

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('[blurb] ANTHROPIC_API_KEY not set');
      return json(fallbackFor(typeHint));
    }

    // Pull review snippets + editorial summary to give Claude actual
    // per-place material to work from. Hours periods come along for the
    // client to compute live 'CLOSES IN N MIN' against the current time.
    const details = await fetchPlaceDetails(place_id);
    const reviews = (details?.reviews || [])
      .slice(0, 3)
      .map((r) => (r?.text?.text || '').replace(/\s+/g, ' ').trim().slice(0, 220))
      .filter(Boolean);
    const editorial = details?.editorialSummary?.text || null;
    const priceLevel = details?.priceLevel || null;
    const periods = details?.currentOpeningHours?.periods || null;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const userMsg = [
      `Name: ${name}`,
      typeHint ? `Type: ${typeHint}` : null,
      addr ? `Address: ${addr}` : null,
      rating ? `Rating: ${rating}` : null,
      reviewCount ? `Review count: ${reviewCount}` : null,
      priceLevel ? `Price level: ${priceLevel}` : null,
      editorial ? `Editorial summary: ${editorial}` : null,
      reviews.length
        ? `Review snippets:\n${reviews.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
        : null,
    ].filter(Boolean).join('\n');

    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM,
      messages: [{ role: 'user', content: userMsg }],
    });

    const text = resp.content.find((c) => c.type === 'text')?.text?.trim() || '';
    const parsed = safeParseJson(text);
    if (!parsed || typeof parsed.blurb !== 'string' || !Array.isArray(parsed.buzzwords)) {
      console.error('[blurb] parse failed for', place_id, 'raw:', text.slice(0, 200));
      return json(fallbackFor(typeHint));
    }

    const fb = fallbackFor(typeHint);
    const out = {
      blurb: parsed.blurb.trim().slice(0, 120),
      buzzwords: parsed.buzzwords.slice(0, 3).map((b) => String(b).trim().slice(0, 14)),
      periods,
      priceLevel,
    };
    while (out.buzzwords.length < 3) out.buzzwords.push(fb.buzzwords[out.buzzwords.length]);

    await store.setJSON(key, out);
    return json(out);
  } catch (e) {
    console.error('[blurb] exception:', e && (e.status || ''), e && (e.message || e));
    if (e && e.error) console.error('[blurb] api error body:', JSON.stringify(e.error));
    return json(fallbackFor(typeHint));
  }
};

function safeParseJson(text) {
  const cleaned = text
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/, '')
    .trim();
  try { return JSON.parse(cleaned); } catch { return null; }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export const config = { path: '/api/blurb' };
