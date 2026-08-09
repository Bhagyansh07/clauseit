import type { NextRequest } from "next/server";

export class RateLimitError extends Error {}

interface Bucket {
  hits: number[];
}

const buckets = new Map<string, Bucket>();

function prune() {
  if (buckets.size <= 10000) return;
  const cutoff = Date.now() - 60 * 60 * 1000;
  for (const [key, bucket] of buckets) {
    if (bucket.hits[bucket.hits.length - 1] < cutoff) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): void {
  const now = Date.now();
  const cutoff = now - windowMs;
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => t > cutoff);

  if (bucket.hits.length >= limit) {
    throw new RateLimitError(
      "Too many attempts. Please wait a few minutes and try again."
    );
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  prune();
}

export function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function authLimits(req: NextRequest, email: string) {
  const ip = clientIp(req);
  return {
    ipKey: `auth:${ip}`,
    emailKey: `auth:email:${email.toLowerCase().trim()}`,
  };
}
