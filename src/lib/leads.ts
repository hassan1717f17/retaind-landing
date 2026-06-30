import type {
  InsertLead,
  AssessmentLeadSource,
  InsertAssessmentUser,
  InsertInhouseAssessmentUser,
} from "@/lib/db/schema";

// Maps an assessment respondent to a `lead` row. Assessment leads carry no
// JAG-specific fields (companyWebsite, location, salaryBand, advertStatus) —
// those stay null. paymentAttempted (false) and followUpStatus ('new') use
// the table defaults.
export function toLead(
  user: InsertAssessmentUser | InsertInhouseAssessmentUser,
  source: AssessmentLeadSource,
): InsertLead {
  return {
    userName: user.name,
    userEmail: user.email,
    companyName: user.company,
    jobTitle: "jobTitle" in user ? user.jobTitle ?? null : null,
    source,
  };
}
