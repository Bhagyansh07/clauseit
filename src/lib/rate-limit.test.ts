import { describe, it, expect } from "vitest";
import type { NextRequest } from "next/server";
import { rateLimit, RateLimitError, clientIp, authLimits } from "@/lib/rate-limit";

function fakeRequest(headers: Record<string, string>): NextRequest {
  return {
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
    },
  } as unknown as NextRequest;
}

describe("rateLimit", () => {
  it("allows calls up to the limit and throws after it", () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 3; i++) {
      expect(() => rateLimit(key, 3, 60_000)).not.toThrow();
    }
    expect(() => rateLimit(key, 3, 60_000)).toThrow(RateLimitError);
  });

  it("tracks keys independently", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, 1, 60_000);
    expect(() => rateLimit(a, 1, 60_000)).toThrow();
    expect(() => rateLimit(b, 1, 60_000)).not.toThrow();
  });

  it("forgets hits once they fall outside the window", () => {
    const key = `w-${Math.random()}`;
    rateLimit(key, 1, -1); // already-expired window
    expect(() => rateLimit(key, 1, -1)).not.toThrow();
  });
});

describe("clientIp", () => {
  it("takes the first address from x-forwarded-for", () => {
    const req = fakeRequest({ "x-forwarded-for": "203.0.113.9, 10.0.0.1" });
    expect(clientIp(req)).toBe("203.0.113.9");
  });

  it("falls back to x-real-ip", () => {
    const req = fakeRequest({ "x-real-ip": "198.51.100.4" });
    expect(clientIp(req)).toBe("198.51.100.4");
  });

  it("returns 'unknown' when no header is present", () => {
    expect(clientIp(fakeRequest({}))).toBe("unknown");
  });
});

describe("authLimits", () => {
  it("normalises the email and scopes the keys", () => {
    const req = fakeRequest({ "x-forwarded-for": "1.2.3.4" });
    const { ipKey, emailKey } = authLimits(req, "  User@Example.COM ");
    expect(ipKey).toBe("auth:1.2.3.4");
    expect(emailKey).toBe("auth:email:user@example.com");
  });
});
