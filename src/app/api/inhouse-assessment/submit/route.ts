import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { inhouseAssessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateInhouseScores } from "@/features/assessment/scoring";
import {
  generateInhouseReport,
  generateInhouseFallbackReport,
} from "@/lib/ai/openai";

export async function POST(req: Request) {
  try {
    const input = inhouseAssessmentSubmitSchema.parse(await req.json());

    const user = await storage.createInhouseAssessmentUser(input.user);

    const scores = calculateInhouseScores(input.responses);

    const scoredResponses = input.responses.map((r) => ({
      userId: user.id,
      questionId: r.questionId,
      responseValue: r.responseValue,
      score: 0,
    }));
    await storage.createInhouseAssessmentResponses(scoredResponses);

    const scoreRecord = await storage.createInhouseAssessmentScore({
      userId: user.id,
      ...scores,
    });

    let reportText: string;
    try {
      reportText = await generateInhouseReport(input.responses, scores, input.user.name);
    } catch (aiError) {
      console.error("AI inhouse report generation failed:", aiError);
      reportText = generateInhouseFallbackReport(input.user.name, scores);
    }

    const report = await storage.createInhouseAssessmentReport({
      userId: user.id,
      reportText,
    });

    return NextResponse.json(
      {
        userId: user.id,
        scores: scoreRecord,
        report: report.reportText,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Inhouse assessment submission error:", err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues?.[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to process assessment" },
      { status: 500 }
    );
  }
}
