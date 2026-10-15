import { describe, it, expect } from "vitest";
import { getVerdict } from "@/lib/verdict";

describe("getVerdict", () => {
  it("treats a low score as safe to sign", () => {
    expect(getVerdict(0).verdict).toBe("yes");
    expect(getVerdict(3).verdict).toBe("yes");
    expect(getVerdict(3).colorToken).toBe("emerald");
  });

  it("is cautious in the middle band", () => {
    expect(getVerdict(4).verdict).toBe("cautious");
    expect(getVerdict(6).verdict).toBe("cautious");
    expect(getVerdict(6).colorToken).toBe("amber");
  });

  it("says do not sign for high scores", () => {
    expect(getVerdict(7).verdict).toBe("dont-sign");
    expect(getVerdict(10).verdict).toBe("dont-sign");
    expect(getVerdict(10).colorToken).toBe("red");
  });

  it("always returns a non-empty label", () => {
    for (const score of [0, 3, 4, 6, 7, 10]) {
      expect(getVerdict(score).label.length).toBeGreaterThan(0);
    }
  });
});
