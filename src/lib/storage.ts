import { eq } from "drizzle-orm";
import { db } from "./db/client";
import {
  newsletterSubscribers,
  leads,
  assessmentUsers,
  assessmentResponses,
  assessmentScores,
  assessmentReports,
  inhouseAssessmentUsers,
  inhouseAssessmentResponses,
  inhouseAssessmentScores,
  inhouseAssessmentReports,
  type InsertSubscriber,
  type InsertAssessmentUser,
  type InsertAssessmentResponse,
  type InsertAssessmentScore,
  type InsertAssessmentReport,
  type AssessmentUser,
  type AssessmentScore,
  type AssessmentReport,
  type InsertInhouseAssessmentUser,
  type InsertInhouseAssessmentResponse,
  type InsertInhouseAssessmentScore,
  type InsertInhouseAssessmentReport,
  type InhouseAssessmentUser,
  type InhouseAssessmentScore,
  type InhouseAssessmentReport,
  type InsertLead,
} from "./db/schema";

export const storage = {
  async subscribeToNewsletter(subscriber: InsertSubscriber): Promise<void> {
    if (!db) return;
    await db.insert(newsletterSubscribers).values(subscriber).onConflictDoNothing();
  },

  async createLead(lead: InsertLead): Promise<void> {
    if (!db) return;
    await db.insert(leads).values(lead);
  },

  async createAssessmentUser(
    user: InsertAssessmentUser,
    visitorId?: string | null,
  ): Promise<AssessmentUser> {
    if (!db) return { id: 0, ...user, visitorId: visitorId ?? null, createdAt: new Date() } as AssessmentUser;
    const [created] = await db
      .insert(assessmentUsers)
      .values({ ...user, visitorId: visitorId ?? null })
      .returning();
    return created;
  },

  async findAssessmentUserByVisitorId(visitorId: string): Promise<{ id: number } | undefined> {
    if (!db) return undefined;
    const [row] = await db
      .select({ id: assessmentUsers.id })
      .from(assessmentUsers)
      .where(eq(assessmentUsers.visitorId, visitorId))
      .limit(1);
    return row;
  },

  async createAssessmentResponses(responses: InsertAssessmentResponse[]): Promise<void> {
    if (!db || responses.length === 0) return;
    await db.insert(assessmentResponses).values(responses);
  },

  async createAssessmentScore(score: InsertAssessmentScore): Promise<AssessmentScore> {
    if (!db) return {
      id: 0,
      experienceScore: 0, commercialScore: 0, ambitionScore: 0,
      readinessScore: 0, barrierScore: 0, totalScore: 0,
      currentRevenueEstimate: null, hybridRevenueEstimate: null,
      scaledRevenueEstimate: null, ownerTeamRevenueEstimate: null,
      ...score,
    } satisfies AssessmentScore;
    const [created] = await db.insert(assessmentScores).values(score).returning();
    return created;
  },

  async createAssessmentReport(report: InsertAssessmentReport): Promise<AssessmentReport> {
    if (!db) return { id: 0, ...report, generatedAt: new Date() } as AssessmentReport;
    const [created] = await db.insert(assessmentReports).values(report).returning();
    return created;
  },

  async getAssessmentScore(userId: number): Promise<AssessmentScore | undefined> {
    if (!db) return undefined;
    const [score] = await db.select().from(assessmentScores).where(eq(assessmentScores.userId, userId));
    return score;
  },

  async getAssessmentReport(userId: number): Promise<AssessmentReport | undefined> {
    if (!db) return undefined;
    const [report] = await db.select().from(assessmentReports).where(eq(assessmentReports.userId, userId));
    return report;
  },

  async createInhouseAssessmentUser(
    user: InsertInhouseAssessmentUser,
    visitorId?: string | null,
  ): Promise<InhouseAssessmentUser> {
    if (!db) return { id: 0, ...user, jobTitle: user.jobTitle ?? null, visitorId: visitorId ?? null, createdAt: new Date() } as InhouseAssessmentUser;
    const [created] = await db
      .insert(inhouseAssessmentUsers)
      .values({ ...user, visitorId: visitorId ?? null })
      .returning();
    return created;
  },

  async findInhouseAssessmentUserByVisitorId(visitorId: string): Promise<{ id: number } | undefined> {
    if (!db) return undefined;
    const [row] = await db
      .select({ id: inhouseAssessmentUsers.id })
      .from(inhouseAssessmentUsers)
      .where(eq(inhouseAssessmentUsers.visitorId, visitorId))
      .limit(1);
    return row;
  },

  async createInhouseAssessmentResponses(responses: InsertInhouseAssessmentResponse[]): Promise<void> {
    if (!db || responses.length === 0) return;
    await db.insert(inhouseAssessmentResponses).values(responses);
  },

  async createInhouseAssessmentScore(score: InsertInhouseAssessmentScore): Promise<InhouseAssessmentScore> {
    if (!db) return {
      id: 0,
      roleDefinitionScore: 0, candidateAttractionScore: 0,
      sourcingStrengthScore: 0, candidateEvaluationScore: 0,
      decisionQualityScore: 0, totalScore: 0,
      topWeaknesses: null,
      ...score,
    } satisfies InhouseAssessmentScore;
    const [created] = await db.insert(inhouseAssessmentScores).values(score).returning();
    return created;
  },

  async createInhouseAssessmentReport(report: InsertInhouseAssessmentReport): Promise<InhouseAssessmentReport> {
    if (!db) return { id: 0, ...report, generatedAt: new Date() } as InhouseAssessmentReport;
    const [created] = await db.insert(inhouseAssessmentReports).values(report).returning();
    return created;
  },
};
