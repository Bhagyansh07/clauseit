import { describe, it, expect } from "vitest";
import { PLAN_LIMITS, PLAN_NAMES } from "@/lib/plans";

describe("plan limits", () => {
  it("defines a monthly document limit for every plan", () => {
    expect(PLAN_LIMITS.free).toBe(10);
    expect(PLAN_LIMITS.pro).toBe(100);
    expect(PLAN_LIMITS.premium).toBeGreaterThan(PLAN_LIMITS.pro);
  });

  it("gives higher plans a higher limit than the free plan", () => {
    expect(PLAN_LIMITS.pro).toBeGreaterThan(PLAN_LIMITS.free);
    expect(PLAN_LIMITS.premium).toBeGreaterThan(PLAN_LIMITS.free);
  });

  it("has a display name for every plan", () => {
    expect(PLAN_NAMES.free).toBe("Free");
    expect(PLAN_NAMES.pro).toBe("Pro");
    expect(PLAN_NAMES.premium).toBe("Premium");
  });
});
