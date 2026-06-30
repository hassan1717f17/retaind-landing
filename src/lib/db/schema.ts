
import { sql } from "drizzle-orm";
import { pgTable, text, serial, integer, timestamp, uuid, varchar, boolean, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(newsletterSubscribers).pick({
  email: true,
});

export type Subscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export const assessmentUsers = pgTable("assessment_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  // Fingerprint Pro device id — limits report generation per device.
  visitorId: text("visitor_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const assessmentResponses = pgTable("assessment_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => assessmentUsers.id),
  questionId: text("question_id").notNull(),
  responseValue: text("response_value").notNull(),
  score: integer("score").notNull().default(0),
});

export const assessmentScores = pgTable("assessment_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => assessmentUsers.id),
  experienceScore: integer("experience_score").notNull().default(0),
  commercialScore: integer("commercial_score").notNull().default(0),
  ambitionScore: integer("ambition_score").notNull().default(0),
  readinessScore: integer("readiness_score").notNull().default(0),
  barrierScore: integer("barrier_score").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  category: text("category").notNull(),
  currentRevenueEstimate: integer("current_revenue_estimate"),
  hybridRevenueEstimate: integer("hybrid_revenue_estimate"),
  scaledRevenueEstimate: integer("scaled_revenue_estimate"),
  ownerTeamRevenueEstimate: integer("owner_team_revenue_estimate"),
});

export const assessmentReports = pgTable("assessment_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => assessmentUsers.id),
  reportText: text("report_text").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const insertAssessmentUserSchema = createInsertSchema(assessmentUsers).omit({
  id: true,
  createdAt: true,
  visitorId: true,
});

export const insertAssessmentResponseSchema = createInsertSchema(assessmentResponses).omit({
  id: true,
});

export const insertAssessmentScoreSchema = createInsertSchema(assessmentScores).omit({
  id: true,
});

export const insertAssessmentReportSchema = createInsertSchema(assessmentReports).omit({
  id: true,
  generatedAt: true,
});

export type AssessmentUser = typeof assessmentUsers.$inferSelect;
export type InsertAssessmentUser = z.infer<typeof insertAssessmentUserSchema>;

export type AssessmentResponse = typeof assessmentResponses.$inferSelect;
export type InsertAssessmentResponse = z.infer<typeof insertAssessmentResponseSchema>;

export type AssessmentScore = typeof assessmentScores.$inferSelect;
export type InsertAssessmentScore = z.infer<typeof insertAssessmentScoreSchema>;

export type AssessmentReport = typeof assessmentReports.$inferSelect;
export type InsertAssessmentReport = z.infer<typeof insertAssessmentReportSchema>;

export const inhouseAssessmentUsers = pgTable("inhouse_assessment_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  jobTitle: text("job_title"),
  // Fingerprint Pro device id — limits report generation per device.
  visitorId: text("visitor_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inhouseAssessmentResponses = pgTable("inhouse_assessment_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => inhouseAssessmentUsers.id),
  questionId: text("question_id").notNull(),
  responseValue: text("response_value").notNull(),
  score: integer("score").notNull().default(0),
});

export const inhouseAssessmentScores = pgTable("inhouse_assessment_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => inhouseAssessmentUsers.id),
  roleDefinitionScore: integer("role_definition_score").notNull().default(0),
  candidateAttractionScore: integer("candidate_attraction_score").notNull().default(0),
  sourcingStrengthScore: integer("sourcing_strength_score").notNull().default(0),
  candidateEvaluationScore: integer("candidate_evaluation_score").notNull().default(0),
  decisionQualityScore: integer("decision_quality_score").notNull().default(0),
  totalScore: integer("total_score").notNull().default(0),
  category: text("category").notNull(),
  topWeaknesses: text("top_weaknesses").array(),
});

export const inhouseAssessmentReports = pgTable("inhouse_assessment_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => inhouseAssessmentUsers.id),
  reportText: text("report_text").notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const insertInhouseAssessmentUserSchema = createInsertSchema(inhouseAssessmentUsers).omit({
  id: true,
  createdAt: true,
  visitorId: true,
});

export const insertInhouseAssessmentResponseSchema = createInsertSchema(inhouseAssessmentResponses).omit({
  id: true,
});

export const insertInhouseAssessmentScoreSchema = createInsertSchema(inhouseAssessmentScores).omit({
  id: true,
});

export const insertInhouseAssessmentReportSchema = createInsertSchema(inhouseAssessmentReports).omit({
  id: true,
  generatedAt: true,
});

export type InhouseAssessmentUser = typeof inhouseAssessmentUsers.$inferSelect;
export type InsertInhouseAssessmentUser = z.infer<typeof insertInhouseAssessmentUserSchema>;

export type InhouseAssessmentResponse = typeof inhouseAssessmentResponses.$inferSelect;
export type InsertInhouseAssessmentResponse = z.infer<typeof insertInhouseAssessmentResponseSchema>;

export type InhouseAssessmentScore = typeof inhouseAssessmentScores.$inferSelect;
export type InsertInhouseAssessmentScore = z.infer<typeof insertInhouseAssessmentScoreSchema>;

export type InhouseAssessmentReport = typeof inhouseAssessmentReports.$inferSelect;
export type InsertInhouseAssessmentReport = z.infer<typeof insertInhouseAssessmentReportSchema>;

// ---------------------------------------------------------------------------
// Shared `lead` table — owned by this app, read by the main retaind app's
// Admin Control Centre (/app/admin/leads). Schema mirrors the main app's
// finalized lead data model exactly (§13.3 Lead Management). Do NOT diverge
// from the column names/types without coordinating: both apps point at the
// same physical table in retaind_dev.
// ---------------------------------------------------------------------------
export const leads = pgTable(
  "lead",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userName: varchar("user_name", { length: 200 }).notNull(),
    userEmail: varchar("user_email", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 200 }),
    companyWebsite: varchar("company_website", { length: 500 }),
    jobTitle: varchar("job_title", { length: 200 }),
    location: varchar("location", { length: 200 }),
    salaryBand: varchar("salary_band", { length: 100 }),
    // 'jag_standalone' | 'bad_hire_calculator' | 'landing_page' | 'manual'
    // | 'agency_assessment' | 'inhouse_assessment'
    source: varchar("source", { length: 30 }).notNull(),
    // 'generated' | 'saved' | 'posting-intent' — null for assessment leads
    advertStatus: varchar("advert_status", { length: 20 }),
    paymentAttempted: boolean("payment_attempted").default(false).notNull(),
    // 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
    followUpStatus: varchar("follow_up_status", { length: 20 })
      .default("new")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`now()`)
      .notNull(),
  },
  (t) => [
    index("lead_email_idx").on(t.userEmail),
    index("lead_follow_up_status_idx").on(t.followUpStatus),
    index("lead_source_idx").on(t.source),
    index("lead_payment_attempted_idx").on(t.paymentAttempted),
    index("lead_created_at_idx").on(t.createdAt.desc()),
  ],
);

// Source values this app produces. The main app's LeadSource union is the
// superset; these two must be added there for the admin UI to label them.
export type AssessmentLeadSource = "agency_assessment" | "inhouse_assessment";

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;
