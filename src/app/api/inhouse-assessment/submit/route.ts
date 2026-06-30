import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { inhouseAssessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateInhouseScores } from "@/features/assessment/scoring";
import { toLead } from "@/lib/leads";
import {
  generateInhouseReport,
  generateInhouseFallbackReport,
} from "@/lib/ai/reports";

export async function POST(req: Request) {
  try {
    const input = inhouseAssessmentSubmitSchema.parse(await req.json());

    // Limit one report per device per assessment type. Fails open: an absent
    // visitorId (fingerprinting unavailable) skips the check entirely.
    const visitorId = input.visitorId ?? null;
    if (visitorId && (await storage.findInhouseAssessmentUserByVisitorId(visitorId))) {
      return NextResponse.json(
        {
          message: "You've already generated a report. Sign up to access more.",
          code: "ALREADY_SUBMITTED",
        },
        { status: 409 }
      );
    }

    const user = await storage.createInhouseAssessmentUser(input.user, visitorId);

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

    // High-intent sales lead → Admin Control Centre. Non-fatal: a failure here
    // must not break the user's assessment result.
    try {
      await storage.createLead(toLead(input.user, "inhouse_assessment"));
    } catch (leadError) {
      console.error("Lead capture failed:", leadError);
    }

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
