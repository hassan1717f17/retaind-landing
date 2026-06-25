
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
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
