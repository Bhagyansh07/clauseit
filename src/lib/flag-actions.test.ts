import { describe, it, expect } from "vitest";
import { FLAG_LABEL, FLAG_ACTION } from "@/lib/flag-actions";
import type { FlagType } from "@/lib/types";

const ALL_FLAGS: FlagType[] = [
  "hidden_clause",
  "unfair_charge",
  "penalty",
  "auto_renewal",
  "liability",
  "other",
];

describe("flag copy", () => {
  it("labels every flag type", () => {
    for (const flag of ALL_FLAGS) {
      expect(FLAG_LABEL[flag]).toBeTruthy();
    }
  });

  it("gives every flag a bilingual action with both languages non-empty", () => {
    for (const flag of ALL_FLAGS) {
      const action = FLAG_ACTION[flag];
      expect(action.en.trim().length).toBeGreaterThan(0);
      expect(action.hi.trim().length).toBeGreaterThan(0);
      // The Hindi line must be actual Devanagari, not an empty placeholder.
      expect(/[\u0900-\u097F]/.test(action.hi)).toBe(true);
    }
  });
});
