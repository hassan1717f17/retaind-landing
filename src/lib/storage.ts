import { eq } from "drizzle-orm";
import { db } from "./db/client";
import {
  newsletterSubscribers,
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
} from "./db/schema";

export const storage = {
  async subscribeToNewsletter(subscriber: InsertSubscriber): Promise<void> {
    if (!db) return;
    await db.insert(newsletterSubscribers).values(subscriber).onConflictDoNothing();
  },

  async createAssessmentUser(user: InsertAssessmentUser): Promise<AssessmentUser> {
    if (!db) return { id: 0, ...user, createdAt: new Date() } as AssessmentUser;
    const [created] = await db.insert(assessmentUsers).values(user).returning();
    return created;
  },

  async createAssessmentResponses(responses: InsertAssessmentResponse[]): Promise<void> {
    if (!db || responses.length === 0) return;
    await db.insert(assessmentResponses).values(responses);
  },

  async createAssessmentScore(score: InsertAssessmentScore): Promise<AssessmentScore> {
    if (!db) return { id: 0, ...score } as AssessmentScore;
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

  async createInhouseAssessmentUser(user: InsertInhouseAssessmentUser): Promise<InhouseAssessmentUser> {
    if (!db) return { id: 0, ...user, createdAt: new Date() } as InhouseAssessmentUser;
    const [created] = await db.insert(inhouseAssessmentUsers).values(user).returning();
    return created;
  },

  async createInhouseAssessmentResponses(responses: InsertInhouseAssessmentResponse[]): Promise<void> {
    if (!db || responses.length === 0) return;
    await db.insert(inhouseAssessmentResponses).values(responses);
  },

  async createInhouseAssessmentScore(score: InsertInhouseAssessmentScore): Promise<InhouseAssessmentScore> {
    if (!db) return { id: 0, ...score } as InhouseAssessmentScore;
    const [created] = await db.insert(inhouseAssessmentScores).values(score).returning();
    return created;
  },

  async createInhouseAssessmentReport(report: InsertInhouseAssessmentReport): Promise<InhouseAssessmentReport> {
    if (!db) return { id: 0, ...report, generatedAt: new Date() } as InhouseAssessmentReport;
    const [created] = await db.insert(inhouseAssessmentReports).values(report).returning();
    return created;
  },
};
