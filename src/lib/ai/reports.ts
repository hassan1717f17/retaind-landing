import { AIClient } from "./client";

let _client: AIClient | null = null;
function client(): AIClient {
  if (!_client) _client = new AIClient();
  return _client;
}

export type QuestionResponse = { questionId: string; responseValue: string };

export interface AgencyScores {
  experienceScore: number;
  commercialScore: number;
  ambitionScore: number;
  readinessScore: number;
  barrierScore: number;
  totalScore: number;
  category: string;
}

export interface Revenue {
  currentRevenueEstimate: number;
  hybridRevenueEstimate: number;
  scaledRevenueEstimate: number;
  ownerTeamRevenueEstimate: number | null;
  avgRetainedFee: number;
}

export interface InhouseScores {
  roleDefinitionScore: number;
  candidateAttractionScore: number;
  sourcingStrengthScore: number;
  candidateEvaluationScore: number;
  decisionQualityScore: number;
  totalScore: number;
  category: string;
  topWeaknesses: string[];
}

export async function generateReport(
  responses: QuestionResponse[],
  scores: AgencyScores,
  revenue: Revenue,
  userName: string
): Promise<string> {
  const responseMap = new Map<string, string>();
  responses.forEach(r => responseMap.set(r.questionId, r.responseValue));

  const prompt = `You are a senior recruitment strategy consultant for Retaind.ai. Generate a personalised Recruiter Readiness Strategy Report for ${userName}.

RECRUITER PROFILE:
- Experience: ${responseMap.get("q1")}
- Sector: ${responseMap.get("q2")}
- Role: ${responseMap.get("q3")}
- Team size: ${responseMap.get("q4") || "N/A"}
- Typical salary range recruited: ${responseMap.get("q5")}
- Fee percentage: ${responseMap.get("q6")}
- Exclusive assignments: ${responseMap.get("q7")}
- Campaign success rate: ${responseMap.get("q8")}
- Revenue last 12 months: ${responseMap.get("q9")}
- Growth goal: ${responseMap.get("q10")}
- Active assignments: ${responseMap.get("q11")}
- Time investment willingness: ${responseMap.get("q12")}
- Retained confidence (1-10): ${responseMap.get("q13")}
- Retained experience: ${responseMap.get("q14")}
- Pricing confidence (1-10): ${responseMap.get("q15")}
- Methodology: ${responseMap.get("q16")}
- Barriers: ${responseMap.get("q17")}
- Scenario responses: Q18: ${responseMap.get("q18")}, Q19: ${responseMap.get("q19")}, Q20: ${responseMap.get("q20")}

SCORES (out of 20 each):
- Experience: ${scores.experienceScore}/20
- Commercial Position: ${scores.commercialScore}/20
- Growth Ambition: ${scores.ambitionScore}/20
- Retained Readiness: ${scores.readinessScore}/20
- Transition Barriers: ${scores.barrierScore}/20
- Total: ${scores.totalScore}/100
- Category: ${scores.category}

REVENUE ESTIMATES:
- Current model: £${revenue.currentRevenueEstimate?.toLocaleString()}
- Hybrid model: £${revenue.hybridRevenueEstimate?.toLocaleString()}
- Scaled retained model: £${revenue.scaledRevenueEstimate?.toLocaleString()}
${revenue.ownerTeamRevenueEstimate ? `- Agency team projection: £${revenue.ownerTeamRevenueEstimate.toLocaleString()}` : ""}

KNOWLEDGE BASE CONTEXT:
- Contingency recruitment: Recruiters only paid on placement, competing against 3-5 agencies, ~20% fill rate, 4 out of 5 assignments produce no revenue
- Retained recruitment: Exclusive engagement, structured search methodology, retainer payment upfront, strategic hiring support
- Retained fees: Typically 20-30% of base salary, with structured payment models (retainer + milestones)
- Revenue comparison: Contingency £80k-£160k/year vs Retained £250k-£750k/year
- Retaind.ai features: Team Behavioural Benchmarking, Job Specification to Advert Generator, Campaign Brochure Builder, Candidate Behavioural Questionnaire, Spider Chart Visual Comparison, AI-Assisted Interview Analysis, Evidence-Based Shortlisting
- Recruiter growth stages: Transition (win retained campaigns) → Scale (increase campaigns) → Brand (build specialist reputation)

REPORT STRUCTURE (follow this exactly):
1. **Introduction** - Brief personalised greeting and overview
2. **Your Recruiter Profile** - Analysis of their current position
3. **Your Revenue Opportunity** - Explain current vs potential revenue, what would need to change
4. **Your Transition Pathway** - Specific steps based on their category
5. **Barriers You May Face** - Address their specific barriers with solutions
6. **How Retaind.ai Supports Your Growth** - Platform features relevant to their situation
7. **Recommended Next Steps** - 3-5 actionable steps
8. **Recommended Reading** - Suggest relevant resources from: Retained Objection Handling Framework, Retained Sales Scripts, Pricing Strategy Guidance, Pricing Negotiation Guidance, Retained Proposal Templates
9. **Call To Action** - Encourage registration for free Retaind recruiter account

TONE: Professional, supportive, insightful. Educate, diagnose, encourage, provide actionable guidance. Do NOT criticise their current model. Highlight opportunities for improvement. Do not overpromise or imply guaranteed earnings. Frame projections as estimates and scenarios.

Format the report in clean markdown with clear headings. Keep it concise but thorough - approximately 800-1200 words.`;

  const response = await client().complete({
    prompt,
    maxTokens: 3000,
    temperature: 0.7,
  });

  return response.text || "Report generation failed. Please try again.";
}

export async function generateInhouseReport(
  responses: QuestionResponse[],
  scores: InhouseScores,
  userName: string
): Promise<string> {
  const responseMap = new Map<string, string>();
  responses.forEach(r => responseMap.set(r.questionId, r.responseValue));

  const prompt = `You are a senior hiring strategy consultant for Retaind.ai. Generate a personalised In-House Hiring Readiness Report for ${userName}.

RESPONDENT PROFILE:
- Role: ${responseMap.get("q1")}
- Company size: ${responseMap.get("q2")}
- Hires per year: ${responseMap.get("q3")}
- Types of roles hired: ${responseMap.get("q4")}
- Role definition clarity (1-10): ${responseMap.get("q5")}
- Stakeholder alignment: ${responseMap.get("q6")}
- Role definition process: ${responseMap.get("q7")}
- Job advert effectiveness (1-10): ${responseMap.get("q8")}
- Advert writing style: ${responseMap.get("q9")}
- Employer brand strength (1-10): ${responseMap.get("q10")}
- Sourcing channels: ${responseMap.get("q11")}
- Sourcing confidence (1-10): ${responseMap.get("q12")}
- Sourcing model: ${responseMap.get("q13")}
- Behavioural factors defined: ${responseMap.get("q14")}
- Assessment structure (1-10): ${responseMap.get("q15")}
- Assessment tools used: ${responseMap.get("q16")}
- Evaluation consistency (1-10): ${responseMap.get("q17")}
- Interview structure: ${responseMap.get("q18")}
- Evidence validation: ${responseMap.get("q19")}
- Final decision approach: ${responseMap.get("q20")}
- Common hiring problems: ${responseMap.get("q21")}
- Improvement priority (1-10): ${responseMap.get("q22")}
- Top improvement area: ${responseMap.get("q23")}

SCORES (out of 20 each):
- Role Definition: ${scores.roleDefinitionScore}/20
- Candidate Attraction: ${scores.candidateAttractionScore}/20
- Sourcing Strength: ${scores.sourcingStrengthScore}/20
- Candidate Evaluation: ${scores.candidateEvaluationScore}/20
- Decision Quality: ${scores.decisionQualityScore}/20
- Total: ${scores.totalScore}/100
- Category: ${scores.category}
- Top Weaknesses: ${scores.topWeaknesses.join(", ")}

KNOWLEDGE BASE - THE RECRUITMENT FAILURE MAP:
The 10 lifecycle failure points are:
1. Requirement Capture - vague role definitions lead to misaligned candidates
2. Job Advert Writing - administrative adverts fail to attract quality candidates
3. Employer Branding - weak employer brand means candidates choose competitors
4. Passive Talent Sourcing - relying only on active job seekers misses 70% of talent
5. Job Advertising Strategy - single-channel approaches limit candidate pools
6. Employer Value Communication - failing to sell the opportunity loses top candidates
7. Behavioural Benchmarking - without benchmarks, assessment has no foundation
8. Candidate Assessment - CV-and-interview-only approaches miss critical fit factors
9. Interview Strategy - unstructured interviews produce inconsistent, biased evaluations
10. Evidence-Led Hiring Decisions - gut-feel decisions lead to mis-hires and early attrition

RETAIND.AI PLATFORM FEATURES:
- Team Behavioural Benchmarking - define success factors before recruiting
- Job Specification to Advert Generator - AI-powered advert creation
- Campaign Brochure Builder - professional employer brand materials
- Candidate Behavioural Questionnaire - structured pre-interview assessment
- Spider Chart Visual Comparison - compare candidates against benchmarks
- AI-Assisted Interview Analysis - evidence-based interview evaluation
- Evidence-Based Shortlisting - data-driven candidate ranking

REPORT STRUCTURE (follow this exactly):
1. **Introduction** - Brief personalised greeting and overview of their hiring readiness
2. **Your Hiring Profile** - Analysis of their current hiring maturity across the 5 dimensions
3. **The Recruitment Failure Map - Your Risk Areas** - Map their weaknesses to the 10 failure points
4. **Top 5 Structural Weakness Areas** - Detailed breakdown with specific improvement recommendations
5. **Hiring Improvement Opportunity** - Explain how improving role benchmarking, candidate assessment, and interview structure can improve: candidate alignment, shortlist quality, decision confidence, retention probability
6. **How Retaind.ai Supports Your Hiring** - Platform features relevant to their specific weaknesses
7. **Recommended Next Steps** - 3-5 actionable steps
8. **Call To Action** - Register today and get a 50% discount code on your 1st campaign

TONE: Professional, consultative, diagnostic. This should feel like a consulting-grade hiring diagnostic, not a marketing quiz. Educate, diagnose, and provide actionable guidance. Do not overpromise.

Include this disclaimer at the end: "These insights are strategic estimates based on your responses and typical hiring process weaknesses. Actual outcomes will vary depending on implementation quality and organisational context."

Format the report in clean markdown with clear headings. Keep it concise but thorough - approximately 800-1200 words.`;

  const response = await client().complete({
    prompt,
    maxTokens: 3000,
    temperature: 0.7,
  });

  return response.text || "Report generation failed. Please try again.";
}

export function generateInhouseFallbackReport(name: string, scores: InhouseScores): string {
  return `# Your In-House Hiring Readiness Report

## Introduction
Thank you, ${name}, for completing the Retaind In-House Hiring Readiness Assessment.

## Your Hiring Profile
Based on your responses, your hiring maturity has been categorised as **${scores.category}** with a total readiness score of **${scores.totalScore}/100**.

**Score Breakdown:**
- Role Definition: ${scores.roleDefinitionScore}/20
- Candidate Attraction: ${scores.candidateAttractionScore}/20
- Sourcing Strength: ${scores.sourcingStrengthScore}/20
- Candidate Evaluation: ${scores.candidateEvaluationScore}/20
- Decision Quality: ${scores.decisionQualityScore}/20

## Top Structural Weakness Areas
Your assessment has identified the following areas for improvement: ${scores.topWeaknesses.join(", ")}.

## Hiring Improvement Opportunity
By improving your role benchmarking, candidate assessment, and interview structure, you can expect improvements in:
- **Candidate alignment** - better matches between candidates and role requirements
- **Shortlist quality** - stronger, more relevant candidate shortlists
- **Decision confidence** - data-driven hiring decisions that reduce uncertainty
- **Retention probability** - better hires who stay longer and perform better

## Recommended Next Steps
1. Register for your free Retaind account to access hiring diagnostic tools
2. Use the Team Behavioural Benchmarking tool to define success factors for your next hire
3. Trial the Candidate Behavioural Questionnaire on your next recruitment campaign
4. Review your interview process and implement structured evaluation scorecards

## Call To Action
Register today and get a 50% discount code on your 1st campaign. Access the full suite of tools to transform your hiring process.

*These insights are strategic estimates based on your responses and typical hiring process weaknesses. Actual outcomes will vary depending on implementation quality and organisational context.*`;
}

export function generateFallbackReport(name: string, scores: AgencyScores, revenue: Revenue): string {
  return `# Your Recruiter Readiness Strategy Report

## Introduction
Thank you, ${name}, for completing the Retaind Recruiter Readiness Assessment.

## Your Recruiter Profile
Based on your responses, you have been categorised as a **${scores.category}** with a total readiness score of **${scores.totalScore}/100**.

**Score Breakdown:**
- Experience: ${scores.experienceScore}/20
- Commercial Position: ${scores.commercialScore}/20
- Growth Ambition: ${scores.ambitionScore}/20
- Retained Readiness: ${scores.readinessScore}/20
- Transition Barriers: ${scores.barrierScore}/20

## Your Revenue Opportunity
Based on your responses, your estimated current annual revenue is approximately **£${revenue.currentRevenueEstimate?.toLocaleString()}**.

If you introduced retained campaigns alongside your current model, your revenue could potentially reach **£${revenue.hybridRevenueEstimate?.toLocaleString()}**.

If you fully scaled toward a retained search model, the opportunity could reach **£${revenue.scaledRevenueEstimate?.toLocaleString()}** per year.

## Recommended Next Steps
1. Register for your free Retaind recruiter account
2. Access the Retaind recruiter playbook and training resources
3. Start with one retained campaign to build experience and confidence
4. Use Retaind's sales and marketing assets to position yourself as a retained search specialist

## Call To Action
Register for your free Retaind Recruiter account to access the full suite of tools, training, and support to help you transition to retained recruitment. You pay nothing until you win your first retainer campaign.

*These projections are illustrative estimates based on your responses and typical retained recruitment models. Actual results will vary depending on sector, fees, client conversion, and campaign delivery.*`;
}
