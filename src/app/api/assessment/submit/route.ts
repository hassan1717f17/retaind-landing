import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { assessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateScores, calculateRevenue } from "@/features/assessment/scoring";
import { toLead } from "@/lib/leads";
import type { AssessmentScore } from "@/lib/db/schema";
import {
  generateReport,
  generateFallbackReport,
} from "@/lib/ai/reports";

export async function POST(req: Request) {
  try {
    const input = assessmentSubmitSchema.parse(await req.json());
    const visitorId = input.visitorId ?? null;

    // Limit one report per device per assessment type. Fails open: an absent
    // visitorId (fingerprinting unavailable) OR a DB error during the lookup
    // both skip the check rather than block a legitimate user.
    if (visitorId) {
      try {
        if (await storage.findAssessmentUserByVisitorId(visitorId)) {
          return NextResponse.json(
            {
              message: "You've already generated a report. Sign up to access more.",
              code: "ALREADY_SUBMITTED",
            },
            { status: 409 }
          );
        }
      } catch (dedupeError) {
        console.error("Device dedupe check failed (proceeding):", dedupeError);
      }
    }

    // The result is computed entirely in-memory — it never depends on the DB.
    const scores = calculateScores(input.responses);
    const revenue = calculateRevenue(input.responses, scores);

    let reportText: string;
    try {
      reportText = await generateReport(input.responses, scores, revenue, input.user.name);
    } catch (aiError) {
      console.error("AI report generation failed:", aiError);
      reportText = generateFallbackReport(input.user.name, scores, revenue);
    }

    const scorePayload = {
      ...scores,
      currentRevenueEstimate: revenue.currentRevenueEstimate,
      hybridRevenueEstimate: revenue.hybridRevenueEstimate,
      scaledRevenueEstimate: revenue.scaledRevenueEstimate,
      ownerTeamRevenueEstimate: revenue.ownerTeamRevenueEstimate,
    };

    // Persistence is best-effort: a database failure must NOT prevent the user
    // from receiving their report. The response is built from the in-memory
    // result above, falling back to it whenever a write fails.
    let userId = 0;
    let scoreRecord: AssessmentScore = { id: 0, userId: 0, ...scorePayload };
    try {
      const user = await storage.createAssessmentUser(input.user, visitorId);
      userId = user.id;
      await storage.createAssessmentResponses(
        input.responses.map((r) => ({
          userId: user.id,
          questionId: r.questionId,
          responseValue: r.responseValue,
          score: 0,
        }))
      );
      scoreRecord = await storage.createAssessmentScore({ userId: user.id, ...scorePayload });
      await storage.createAssessmentReport({ userId: user.id, reportText });
    } catch (persistError) {
      console.error("Assessment persistence failed (returning report anyway):", persistError);
    }

    // High-intent sales lead → Admin Control Centre. Non-fatal: a failure here
    // must not break the user's assessment result.
    try {
      await storage.createLead(toLead(input.user, "agency_assessment"));
    } catch (leadError) {
      console.error("Lead capture failed:", leadError);
    }

    return NextResponse.json(
      {
        userId,
        scores: scoreRecord,
        revenue: {
          currentRevenueEstimate: revenue.currentRevenueEstimate,
          hybridRevenueEstimate: revenue.hybridRevenueEstimate,
          scaledRevenueEstimate: revenue.scaledRevenueEstimate,
          ownerTeamRevenueEstimate: revenue.ownerTeamRevenueEstimate,
          avgRetainedFee: revenue.avgRetainedFee,
        },
        report: reportText,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Assessment submission error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Failed to process assessment" }, { status: 500 });
  }
}
