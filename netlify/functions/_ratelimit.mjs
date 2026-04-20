/**
 * Simple per-IP token-bucket rate limiter backed by Netlify Blobs.
 *
 * Not a defense against distributed abuse — an abuse *speed bump* for
 * the casual 'loop in curl' case. For real protection you'd want
 * Redis/Upstash with atomic INCR. Good enough at our scale.
 *
 * Fails open: if the Blob store errors (rare), requests are allowed
 * through so legit users aren't locked out by infrastructure hiccups.
 */

import { getStore } from '@netlify/blobs';

export function getClientIp(req) {
  return req.headers.get('x-nf-client-connection-ip')
      || (req.headers.get('x-forwarded-for') || '').split(',')[0].trim()
      || null;
}

export async function checkRateLimit({ ip, endpoint, limit, windowMs }) {
  if (!ip) return { allowed: true, remaining: limit, retryAfter: 0 };

  const now = Date.now();
  let store;
  try {
    store = getStore({ name: 'hotshit-rate' });
  } catch {
    return { allowed: true, remaining: limit, retryAfter: 0 };
  }

  const key = `${endpoint}:${ip}`;
  let count = 0;
  let windowStart = now;

  try {
    const existing = await store.get(key, { type: 'json' });
    if (existing && (now - existing.windowStart) < windowMs) {
      count = existing.count;
      windowStart = existing.windowStart;
    }
  } catch {
    return { allowed: true, remaining: limit, retryAfter: 0 };
  }

  count += 1;

  try {
    await store.setJSON(key, { count, windowStart });
  } catch {
    /* swallow — best effort */
  }

  const allowed = count <= limit;
  const remaining = Math.max(0, limit - count);
  const retryAfter = allowed ? 0 : Math.ceil((windowStart + windowMs - now) / 1000);
  return { allowed, remaining, retryAfter };
}
