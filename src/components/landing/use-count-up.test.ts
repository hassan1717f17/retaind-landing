import { describe, it, expect } from "vitest";
import { formatStat } from "./use-count-up";

describe("formatStat", () => {
  it("appends a percent suffix", () => {
    expect(formatStat(80, { suffix: "%" })).toBe("80%");
  });
  it("appends a multiplier suffix", () => {
    expect(formatStat(3, { suffix: "x" })).toBe("3x");
  });
  it("rounds to an integer", () => {
    expect(formatStat(5.7, {})).toBe("6");
  });
  it("supports a prefix", () => {
    expect(formatStat(20, { prefix: "£", suffix: "k" })).toBe("£20k");
  });
});
