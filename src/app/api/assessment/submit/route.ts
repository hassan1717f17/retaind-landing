import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { assessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateScores, calculateRevenue } from "@/features/assessment/scoring";
import {
  generateReport,
  generateFallbackReport,
} from "@/lib/ai/openai";

export async function POST(req: Request) {
  try {
    const input = assessmentSubmitSchema.parse(await req.json());

    const user = await storage.createAssessmentUser(input.user);

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
