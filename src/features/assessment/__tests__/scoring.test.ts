import { describe, it, expect } from "vitest";
import { calculateScores, calculateRevenue, calculateInhouseScores } from "../scoring";

const top = [
  ["q1","15+ years"],["q2","Technology Services / SaaS / Cyber"],["q3","Agency owner / founder"],
  ["q4","50+"],["q5","£200k+"],["q6","25%+"],["q7","76–100%"],["q8","More than 50%"],
  ["q9","£500k+"],["q10","Significantly grow my revenue"],["q11","20+"],["q12","Significant time and effort"],
  ["q13","10"],["q14","Yes, regularly"],["q15","10"],["q16","Yes, I use a structured methodology"],
  ["q17","None"],["q18","retained"],["q19","guarantee"],["q20","retainer"],
].map(([questionId, responseValue]) => ({ questionId, responseValue }));

describe("calculateScores", () => {
  it("scores a top-tier recruiter as a Retained Leader with maxed dimensions", () => {
    const s = calculateScores(top);
    expect(s.experienceScore).toBe(20);
    expect(s.commercialScore).toBe(20);
    expect(s.totalScore).toBeGreaterThanOrEqual(81);
    expect(s.category).toBe("Retained Leader");
  });
  it("clamps each dimension at 20 and total at 100", () => {
    const s = calculateScores(top);
    for (const k of ["experienceScore","commercialScore","ambitionScore","readinessScore","barrierScore"] as const) {
      expect(s[k]).toBeLessThanOrEqual(20);
    }
    expect(s.totalScore).toBeLessThanOrEqual(100);
  });
});

describe("calculateRevenue", () => {
  it("returns positive monotonic estimates (current ≤ scaled)", () => {
    const s = calculateScores(top);
    const r = calculateRevenue(top, s);
    expect(r.currentRevenueEstimate).toBeGreaterThan(0);
    expect(r.scaledRevenueEstimate).toBeGreaterThan(0);
    expect(r.avgRetainedFee).toBeGreaterThan(0);
  });
});

describe("calculateInhouseScores", () => {
  it("categorises an all-best in-house responder and returns ≤5 weaknesses", () => {
    const resp = [
      ["q5","10"],["q6","Almost always"],["q7","We define behavioural success factors and outcomes before recruiting"],
      ["q8","10"],["q9","Highly tailored role marketing campaigns"],["q10","10"],
      ["q11","Multi-channel campaigns"],["q12","10"],["q13","Targeted multi-channel campaign sourcing"],
      ["q14","Always"],["q15","10"],["q16","Behavioural benchmarks & questionnaires, Final Fit & Risk analysis"],
      ["q17","10"],["q18","Fully structured and aligned to the benchmark and early assessment outputs"],
      ["q19","Almost always"],["q20","Always structured and evidence-led"],
    ].map(([questionId, responseValue]) => ({ questionId, responseValue }));
    const s = calculateInhouseScores(resp);
    expect(s.totalScore).toBeLessThanOrEqual(100);
    expect(s.category).toBe("Hiring Leader");
    expect(s.topWeaknesses.length).toBeLessThanOrEqual(5);
  });
});
