import type { AssessmentSubmitInput, InhouseAssessmentSubmitInput } from "@/lib/api-contract";
import type { AgencyScores, Revenue, InhouseScores } from "@/lib/ai/reports";
import type { AssessmentScore, InhouseAssessmentScore } from "@/lib/db/schema";

export interface AssessmentResult {
  userId: number;
  scores: AssessmentScore;
  revenue: {
    currentRevenueEstimate: number;
    hybridRevenueEstimate: number;
    scaledRevenueEstimate: number;
    ownerTeamRevenueEstimate: number | null;
    avgRetainedFee: number;
  };
  report: string;
}

export interface InhouseAssessmentResult {
  userId: number;
  scores: InhouseAssessmentScore;
  report: string;
}

// Error thrown when an API call returns a non-OK status. `code` carries the
// server's machine-readable reason (e.g. "ALREADY_SUBMITTED") when present.
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function subscribeNewsletter(email: string): Promise<{ message: string }> {
  const res = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "Failed to subscribe");
  return data as { message: string };
}

export async function submitAssessment(
  payload: AssessmentSubmitInput
): Promise<AssessmentResult> {
  const res = await fetch("/api/assessment/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message ?? "Failed to submit assessment", res.status, data.code);
  return data as AssessmentResult;
}

export async function submitInhouseAssessment(
  payload: InhouseAssessmentSubmitInput
): Promise<InhouseAssessmentResult> {
  const res = await fetch("/api/inhouse-assessment/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message ?? "Failed to submit in-house assessment", res.status, data.code);
  return data as InhouseAssessmentResult;
}
