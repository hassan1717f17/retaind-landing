import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { inhouseAssessmentSubmitSchema } from "@/lib/api-contract";
import { storage } from "@/lib/storage";
import { calculateInhouseScores } from "@/features/assessment/scoring";
import { toLead } from "@/lib/leads";
import type { InhouseAssessmentScore } from "@/lib/db/schema";
import {
  generateInhouseReport,
  generateInhouseFallbackReport,
} from "@/lib/ai/reports";

export async function POST(req: Request) {
  try {
    const input = inhouseAssessmentSubmitSchema.parse(await req.json());
    const visitorId = input.visitorId ?? null;

    // Limit one report per device per assessment type. Fails open: an absent
    // visitorId (fingerprinting unavailable) OR a DB error during the lookup
    // both skip the check rather than block a legitimate user.
    if (visitorId) {
      try {
        if (await storage.findInhouseAssessmentUserByVisitorId(visitorId)) {
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
    const scores = calculateInhouseScores(input.responses);

    let reportText: string;
    try {
      reportText = await generateInhouseReport(input.responses, scores, input.user.name);
    } catch (aiError) {
      console.error("AI inhouse report generation failed:", aiError);
      reportText = generateInhouseFallbackReport(input.user.name, scores);
    }

    // Persistence is best-effort: a database failure must NOT prevent the user
    // from receiving their report. The response is built from the in-memory
    // result above, falling back to it whenever a write fails.
    let userId = 0;
    let scoreRecord: InhouseAssessmentScore = { id: 0, userId: 0, ...scores };
    try {
      const user = await storage.createInhouseAssessmentUser(input.user, visitorId);
      userId = user.id;
      await storage.createInhouseAssessmentResponses(
        input.responses.map((r) => ({
          userId: user.id,
          questionId: r.questionId,
          responseValue: r.responseValue,
          score: 0,
        }))
      );
      scoreRecord = await storage.createInhouseAssessmentScore({ userId: user.id, ...scores });
      await storage.createInhouseAssessmentReport({ userId: user.id, reportText });
    } catch (persistError) {
      console.error("Inhouse assessment persistence failed (returning report anyway):", persistError);
    }

    // High-intent sales lead → Admin Control Centre. Non-fatal: a failure here
    // must not break the user's assessment result.
    try {
      await storage.createLead(toLead(input.user, "inhouse_assessment"));
    } catch (leadError) {
      console.error("Lead capture failed:", leadError);
    }

    return NextResponse.json(
      {
        userId,
        scores: scoreRecord,
        report: reportText,
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
