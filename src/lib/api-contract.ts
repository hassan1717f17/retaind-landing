import { z } from "zod/v4";
import {
  insertSubscriberSchema,
  insertAssessmentUserSchema,
  insertInhouseAssessmentUserSchema,
} from "@/lib/db/schema";

// Extend subscriber schema with email format validation
export const newsletterSubscribeSchema = insertSubscriberSchema.extend({
  email: z.string().email(),
});

export type NewsletterSubscribeInput = z.infer<typeof newsletterSubscribeSchema>;

export const assessmentSubmitSchema = z.object({
  user: insertAssessmentUserSchema,
  responses: z.array(
    z.object({
      questionId: z.string(),
      responseValue: z.string(),
    })
  ),
});

export type AssessmentSubmitInput = z.infer<typeof assessmentSubmitSchema>;

export const inhouseAssessmentSubmitSchema = z.object({
  user: insertInhouseAssessmentUserSchema,
  responses: z.array(
    z.object({
      questionId: z.string(),
      responseValue: z.string(),
    })
  ),
});

export type InhouseAssessmentSubmitInput = z.infer<
  typeof inhouseAssessmentSubmitSchema
>;

export const api = {
  newsletter: {
    subscribe: {
      method: "POST" as const,
      path: "/api/newsletter",
      input: newsletterSubscribeSchema,
      responses: {
        201: z.object({ message: z.string() }),
        400: z.object({ message: z.string() }),
        409: z.object({ message: z.string() }),
      },
    },
  },
  assessment: {
    submit: {
      method: "POST" as const,
      path: "/api/assessment/submit",
      input: assessmentSubmitSchema,
    },
  },
  inhouseAssessment: {
    submit: {
      method: "POST" as const,
      path: "/api/inhouse-assessment/submit",
      input: inhouseAssessmentSubmitSchema,
    },
  },
};
