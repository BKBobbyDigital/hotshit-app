/**
 * POST /api/blurb
 * Body: { place_id: string, name: string, typeHint?: string, addr?: string,
 *         rating?: number, reviewCount?: number }
 * Returns: { blurb: string, buzzwords: string[3] }
 *
 * - Permanent cache in Netlify Blobs keyed by place_id (blurbs don't change).
 * - Falls back to a safe default shape on any error so the UI never blocks.
 */

import Anthropic from '@anthropic-ai/sdk';
import { getStore } from '@netlify/blobs';

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 200;
// Bump to invalidate all cached blurbs (e.g., after tuning the system prompt).
const BLURB_VERSION = 1;
const cacheKeyFor = (place_id) => `${place_id}@v${BLURB_VERSION}`;

const SYSTEM = `You write short venue blurbs for Hot Shit, an app that helps friends decide where to go out.

Voice: fun, opinionated, slightly irreverent. Never use hype words like "amazing", "must-try", "authentic", "hidden gem". Punchy, confident sentences. Never hedge.

Given a place's name, type, address, rating, and review count, return ONLY a JSON object with these exact keys:
- "blurb": one short declarative sentence, MAX 90 characters, ending with a period. No emoji. No quotes in the text.
- "buzzwords": array of EXACTLY 3 strings. Each: 1-2 words, Title Case, MAX 12 characters each. No emoji.

Return the JSON object and nothing else. No code fences, no commentary.`;

// Category-flavored fallbacks used whenever the Claude call can't run
// (no credits, rate limit, transient error). Better than a single generic
// line showing up on every card.
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

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'POST only' }, 405);
  }
  let typeHint;
  try {
    const body = await req.json();
    let { place_id, name, typeHint: th, addr, rating, reviewCount } = body || {};
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
    console.log('[blurb] key ends with', process.env.ANTHROPIC_API_KEY.slice(-4));

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const userMsg = [
      `Name: ${name}`,
      typeHint ? `Type: ${typeHint}` : null,
      addr ? `Address: ${addr}` : null,
      rating ? `Rating: ${rating}` : null,
      reviewCount ? `Reviews: ${reviewCount}` : null,
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
      // Claude replied but we couldn't parse into the right shape — serve
      // fallback to the client, but don't cache it so the next call retries.
      console.error('[blurb] parse failed for', place_id, 'raw:', text.slice(0, 200));
      return json(fallbackFor(typeHint));
    }

    // Sanity: clamp shape
    const fb = fallbackFor(typeHint);
    const out = {
      blurb: parsed.blurb.trim().slice(0, 120),
      buzzwords: parsed.buzzwords.slice(0, 3).map((b) => String(b).trim().slice(0, 14)),
    };
    while (out.buzzwords.length < 3) out.buzzwords.push(fb.buzzwords[out.buzzwords.length]);

    await store.setJSON(key, out);
    return json(out);
  } catch (e) {
    // Never block the UI on blurb failures, but surface the reason in the
    // function logs so we can actually debug.
    console.error('[blurb] exception:', e && (e.status || ''), e && (e.message || e));
    if (e && e.error) console.error('[blurb] api error body:', JSON.stringify(e.error));
    return json(fallbackFor(typeHint));
  }
};

function safeParseJson(text) {
  // Strip possible code fences Claude sometimes adds despite the system prompt.
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
