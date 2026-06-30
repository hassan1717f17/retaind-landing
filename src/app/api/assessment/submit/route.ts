import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { assessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateScores, calculateRevenue } from "@/features/assessment/scoring";
import { toLead } from "@/lib/leads";
import {
  generateReport,
  generateFallbackReport,
} from "@/lib/ai/reports";

export async function POST(req: Request) {
  try {
    const input = assessmentSubmitSchema.parse(await req.json());

    // Limit one report per device per assessment type. Fails open: an absent
    // visitorId (fingerprinting unavailable) skips the check entirely.
    const visitorId = input.visitorId ?? null;
    if (visitorId && (await storage.findAssessmentUserByVisitorId(visitorId))) {
      return NextResponse.json(
        {
          message: "You've already generated a report. Sign up to access more.",
          code: "ALREADY_SUBMITTED",
        },
        { status: 409 }
      );
    }

    const user = await storage.createAssessmentUser(input.user, visitorId);

    const scores = calculateScores(input.responses);
    const revenue = calculateRevenue(input.responses, scores);

    const scoredResponses = input.responses.map((r) => ({
      userId: user.id,
      questionId: r.questionId,
      responseValue: r.responseValue,
      score: 0,
    }));
    await storage.createAssessmentResponses(scoredResponses);

    const scoreRecord = await storage.createAssessmentScore({
      userId: user.id,
      ...scores,
      currentRevenueEstimate: revenue.currentRevenueEstimate,
      hybridRevenueEstimate: revenue.hybridRevenueEstimate,
      scaledRevenueEstimate: revenue.scaledRevenueEstimate,
      ownerTeamRevenueEstimate: revenue.ownerTeamRevenueEstimate,
    });

    let reportText: string;
    try {
      reportText = await generateReport(input.responses, scores, revenue, input.user.name);
    } catch (aiError) {
      console.error("AI report generation failed:", aiError);
      reportText = generateFallbackReport(input.user.name, scores, revenue);
    }

    const report = await storage.createAssessmentReport({
      userId: user.id,
      reportText,
    });

    // High-intent sales lead → Admin Control Centre. Non-fatal: a failure here
    // must not break the user's assessment result.
    try {
      await storage.createLead(toLead(input.user, "agency_assessment"));
    } catch (leadError) {
      console.error("Lead capture failed:", leadError);
    }

    return NextResponse.json(
      {
        userId: user.id,
        scores: scoreRecord,
        revenue: {
          currentRevenueEstimate: revenue.currentRevenueEstimate,
          hybridRevenueEstimate: revenue.hybridRevenueEstimate,
          scaledRevenueEstimate: revenue.scaledRevenueEstimate,
          ownerTeamRevenueEstimate: revenue.ownerTeamRevenueEstimate,
          avgRetainedFee: revenue.avgRetainedFee,
        },
        report: report.reportText,
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
