import type { AgencyScores, Revenue, InhouseScores, QuestionResponse } from "@/lib/ai/openai";

export function calculateScores(responses: QuestionResponse[]): AgencyScores {
  const responseMap = new Map<string, string>();
  responses.forEach(r => responseMap.set(r.questionId, r.responseValue));

  let experienceScore = 0;
  let commercialScore = 0;
  let ambitionScore = 0;
  let readinessScore = 0;
  let barrierScore = 0;

  const experienceYears = responseMap.get("q1") || "";
  if (experienceYears === "15+ years") experienceScore += 5;
  else if (experienceYears === "7–15 years") experienceScore += 4;
  else if (experienceYears === "3–7 years") experienceScore += 3;
  else if (experienceYears === "1–3 years") experienceScore += 2;
  else experienceScore += 1;

  const sector = responseMap.get("q2") || "";
  if (["Technology Services / SaaS / Cyber", "Professional Business Services (Legal / Finance etc)", "Engineering / Manufacturing"].includes(sector)) experienceScore += 5;
  else if (["Sales / Marketing / Digital / Events / Commercial Growth", "Healthcare / Life Sciences"].includes(sector)) experienceScore += 4;
  else if (["People Services / Staffing / HR / Consulting / Training / Leadership / Security", "Supply Chain & Logistics / Transport"].includes(sector)) experienceScore += 3;
  else experienceScore += 2;

  const role = responseMap.get("q3") || "";
  if (role === "Agency owner / founder") experienceScore += 5;
  else if (role === "Director / leadership team") experienceScore += 4;
  else if (role === "Billing manager / team leader") experienceScore += 3;
  else if (role === "Solo recruiter / independent") experienceScore += 3;
  else experienceScore += 2;

  const teamSize = responseMap.get("q4") || "";
  const isOwnerDirector = role === "Agency owner / founder" || role === "Director / leadership team";
  if (isOwnerDirector && teamSize) {
    if (teamSize === "50+") experienceScore += 5;
    else if (teamSize === "16–50 recruiters") experienceScore += 4;
    else if (teamSize === "6–15 recruiters") experienceScore += 3;
    else if (teamSize === "2–5 recruiters") experienceScore += 2;
    else experienceScore += 1;
  } else {
    experienceScore += 3;
  }

  experienceScore = Math.min(experienceScore, 20);

  const salaryRange = responseMap.get("q5") || "";
  if (salaryRange === "£200k+") commercialScore += 5;
  else if (salaryRange === "£120k–£200k") commercialScore += 4;
  else if (salaryRange === "£70k–£120k") commercialScore += 4;
  else if (salaryRange === "£40k–£70k") commercialScore += 3;
  else commercialScore += 2;

  const feePercentage = responseMap.get("q6") || "";
  if (feePercentage === "25%+" || feePercentage === "20–25%") commercialScore += 5;
  else if (feePercentage === "15–20%") commercialScore += 3;
  else commercialScore += 2;

  const exclusivePercent = responseMap.get("q7") || "";
  if (exclusivePercent === "76–100%") commercialScore += 5;
  else if (exclusivePercent === "51–75%") commercialScore += 4;
  else if (exclusivePercent === "26–50%") commercialScore += 3;
  else commercialScore += 1;

  const successRate = responseMap.get("q8") || "";
  if (successRate === "More than 50%") commercialScore += 5;
  else if (successRate === "30–50%") commercialScore += 4;
  else if (successRate === "20–30%") commercialScore += 3;
  else commercialScore += 1;

  commercialScore = Math.min(commercialScore, 20);

  const revenueStr = responseMap.get("q9") || "";
  if (revenueStr === "£500k+") ambitionScore += 5;
  else if (revenueStr === "£250k–£500k") ambitionScore += 4;
  else if (revenueStr === "£100k–£250k") ambitionScore += 3;
  else ambitionScore += 2;

  const growthGoal = responseMap.get("q10") || "";
  if (growthGoal === "Significantly grow my revenue") ambitionScore += 5;
  else if (growthGoal === "Transition fully to retained") ambitionScore += 5;
  else if (growthGoal === "Grow moderately") ambitionScore += 3;
  else ambitionScore += 1;

  const activeAssignments = responseMap.get("q11") || "";
  if (activeAssignments === "20+") ambitionScore += 5;
  else if (activeAssignments === "10–20") ambitionScore += 4;
  else if (activeAssignments === "5–10") ambitionScore += 3;
  else ambitionScore += 2;

  const timeInvestment = responseMap.get("q12") || "";
  if (timeInvestment === "Significant time and effort") ambitionScore += 5;
  else if (timeInvestment === "Moderate time") ambitionScore += 3;
  else ambitionScore += 1;

  ambitionScore = Math.min(ambitionScore, 20);

  const retainedConfidence = Math.max(1, Math.min(10, parseInt(responseMap.get("q13") || "5") || 5));
  readinessScore += Math.round((retainedConfidence / 10) * 5);

  const retainedExperience = responseMap.get("q14") || "";
  if (retainedExperience === "Yes, regularly") readinessScore += 5;
  else if (retainedExperience === "Yes, occasionally") readinessScore += 4;
  else if (retainedExperience === "I've tried but haven't won one yet") readinessScore += 2;
  else readinessScore += 1;

  const pricingConfidence = Math.max(1, Math.min(10, parseInt(responseMap.get("q15") || "5") || 5));
  readinessScore += Math.round((pricingConfidence / 10) * 5);

  const methodology = responseMap.get("q16") || "";
  if (methodology === "Yes, I use a structured methodology") readinessScore += 5;
  else if (methodology === "Somewhat structured") readinessScore += 3;
  else readinessScore += 1;

  readinessScore = Math.min(readinessScore, 20);

  const barriers = responseMap.get("q17") || "";
  const barrierList = barriers.split(",").map(b => b.trim()).filter(Boolean);
  const hasNoneBarrier = barrierList.some(b => b.includes("None"));
  if (hasNoneBarrier || barrierList.length === 0) barrierScore += 8;
  else if (barrierList.length === 1) barrierScore += 6;
  else if (barrierList.length === 2) barrierScore += 4;
  else if (barrierList.length === 3) barrierScore += 3;
  else barrierScore += 1;

  const scenario1 = responseMap.get("q18") || "";
  if (scenario1.includes("retained") || scenario1.includes("exclusive")) barrierScore += 4;
  else if (scenario1.includes("hybrid")) barrierScore += 3;
  else barrierScore += 1;

  const scenario2 = responseMap.get("q19") || "";
  if (scenario2.includes("replacement") || scenario2.includes("guarantee")) barrierScore += 4;
  else if (scenario2.includes("reduced") || scenario2.includes("discount")) barrierScore += 2;
  else barrierScore += 1;

  const scenario3 = responseMap.get("q20") || "";
  if (scenario3.includes("retainer") || scenario3.includes("commitment")) barrierScore += 4;
  else if (scenario3.includes("milestone")) barrierScore += 3;
  else barrierScore += 1;

  barrierScore = Math.min(barrierScore, 20);

  const totalScore = experienceScore + commercialScore + ambitionScore + readinessScore + barrierScore;

  let category: string;
  if (totalScore >= 81) category = "Retained Leader";
  else if (totalScore >= 61) category = "Retained Ready Recruiter";
  else if (totalScore >= 36) category = "Growth Recruiter";
  else category = "Early Stage Recruiter";

  return {
    experienceScore,
    commercialScore,
    ambitionScore,
    readinessScore,
    barrierScore,
    totalScore,
    category,
  };
}

export function calculateRevenue(responses: QuestionResponse[], scores: AgencyScores): Revenue {
  const responseMap = new Map<string, string>();
  responses.forEach(r => responseMap.set(r.questionId, r.responseValue));

  const salaryRange = responseMap.get("q5") || "£40k–£70k";
  let avgSalary = 55000;
  if (salaryRange === "£20k–£40k") avgSalary = 35000;
  else if (salaryRange === "£40k–£70k") avgSalary = 55000;
  else if (salaryRange === "£70k–£120k") avgSalary = 90000;
  else if (salaryRange === "£120k–£200k") avgSalary = 150000;
  else if (salaryRange === "£200k+") avgSalary = 225000;

  const feePercentage = responseMap.get("q6") || "15–20%";
  let feePercent = 0.175;
  if (feePercentage === "10–15%") feePercent = 0.125;
  else if (feePercentage === "15–20%") feePercent = 0.175;
  else if (feePercentage === "20–25%") feePercent = 0.225;
  else if (feePercentage === "25%+") feePercent = 0.275;

  const avgContingencyFee = avgSalary * feePercent;

  const successRate = responseMap.get("q8") || "20–30%";
  let placementsPerYear = 12;
  if (successRate === "Less than 20%") placementsPerYear = 8;
  else if (successRate === "20–30%") placementsPerYear = 12;
  else if (successRate === "30–50%") placementsPerYear = 16;
  else if (successRate === "More than 50%") placementsPerYear = 20;

  const revenueStr = responseMap.get("q9") || "";
  let currentRevenue = placementsPerYear * avgContingencyFee;
  if (revenueStr === "Under £100k") currentRevenue = Math.min(currentRevenue, 90000);
  else if (revenueStr === "£100k–£250k") currentRevenue = Math.max(currentRevenue, 120000);
  else if (revenueStr === "£250k–£500k") currentRevenue = Math.max(currentRevenue, 300000);
  else if (revenueStr === "£500k+") currentRevenue = Math.max(currentRevenue, 550000);

  const retainedFeePercent = 0.225;
  const avgRetainedFee = avgSalary * retainedFeePercent;

  let hybridCampaigns = 8;
  if (scores.totalScore >= 61) hybridCampaigns = 10;
  if (scores.totalScore >= 81) hybridCampaigns = 12;

  const hybridRevenue = currentRevenue * 0.6 + hybridCampaigns * avgRetainedFee;

  let scaledCampaigns = 15;
  if (scores.totalScore >= 61) scaledCampaigns = 18;
  if (scores.totalScore >= 81) scaledCampaigns = 22;

  const scaledRevenue = scaledCampaigns * avgRetainedFee;

  const role = responseMap.get("q3") || "";
  let ownerTeamRevenueEstimate: number | null = null;
  if (role === "Agency owner / founder" || role === "Director / leadership team") {
    const teamSizeStr = responseMap.get("q4") || "Just me";
    let numRecruiters = 1;
    if (teamSizeStr === "2–5 recruiters") numRecruiters = 4;
    else if (teamSizeStr === "6–15 recruiters") numRecruiters = 10;
    else if (teamSizeStr === "16–50 recruiters") numRecruiters = 25;
    else if (teamSizeStr === "50+") numRecruiters = 50;

    ownerTeamRevenueEstimate = Math.round(numRecruiters * 10 * avgRetainedFee);
  }

  return {
    currentRevenueEstimate: Math.round(currentRevenue),
    hybridRevenueEstimate: Math.round(hybridRevenue),
    scaledRevenueEstimate: Math.round(scaledRevenue),
    ownerTeamRevenueEstimate,
    avgRetainedFee: Math.round(avgRetainedFee),
  };
}

export function calculateInhouseScores(responses: QuestionResponse[]): InhouseScores {
  const responseMap = new Map<string, string>();
  responses.forEach(r => responseMap.set(r.questionId, r.responseValue));

  let roleDefinitionScore = 0;
  let candidateAttractionScore = 0;
  let sourcingStrengthScore = 0;
  let candidateEvaluationScore = 0;
  let decisionQualityScore = 0;

  const q5 = parseInt(responseMap.get("q5") || "5") || 5;
  roleDefinitionScore += Math.round((Math.min(10, Math.max(1, q5)) / 10) * 8);

  const q6 = responseMap.get("q6") || "";
  if (q6 === "Almost always") roleDefinitionScore += 6;
  else if (q6 === "Often") roleDefinitionScore += 4;
  else if (q6 === "Sometimes") roleDefinitionScore += 2;
  else roleDefinitionScore += 1;

  const q7 = responseMap.get("q7") || "";
  const q7values = q7.split(",").map(v => v.trim()).filter(Boolean);
  const q7best = ["We define behavioural success factors and outcomes before recruiting", "Multiple stakeholders align requirements before recruitment begins"];
  const q7good = ["We create a job specification that clearly defines critical and desirable criteria based mostly on skills and experience", "HR / TA refines the brief"];
  if (q7values.some(v => q7best.includes(v))) roleDefinitionScore += 6;
  else if (q7values.some(v => q7good.includes(v))) roleDefinitionScore += 4;
  else roleDefinitionScore += 2;

  roleDefinitionScore = Math.min(roleDefinitionScore, 20);

  const q8 = parseInt(responseMap.get("q8") || "5") || 5;
  candidateAttractionScore += Math.round((Math.min(10, Math.max(1, q8)) / 10) * 7);

  const q9 = responseMap.get("q9") || "";
  const q9values = q9.split(",").map(v => v.trim()).filter(Boolean);
  const q9best = ["Highly tailored role marketing campaigns", "Culture and growth story focused adverts"];
  const q9good = ["Opportunity-focused adverts designed to attract candidates"];
  if (q9values.some(v => q9best.includes(v))) candidateAttractionScore += 7;
  else if (q9values.some(v => q9good.includes(v))) candidateAttractionScore += 5;
  else candidateAttractionScore += 2;

  const q10 = parseInt(responseMap.get("q10") || "5") || 5;
  candidateAttractionScore += Math.round((Math.min(10, Math.max(1, q10)) / 10) * 6);

  candidateAttractionScore = Math.min(candidateAttractionScore, 20);

  const q11 = responseMap.get("q11") || "";
  const q11values = q11.split(",").map(v => v.trim()).filter(Boolean);
  const q11best = ["Multi-channel campaigns", "Passive candidate outreach"];
  const q11good = ["LinkedIn", "Referrals"];
  if (q11values.some(v => q11best.includes(v))) sourcingStrengthScore += 7;
  else if (q11values.some(v => q11good.includes(v))) sourcingStrengthScore += 5;
  else sourcingStrengthScore += 2;

  const q12 = parseInt(responseMap.get("q12") || "5") || 5;
  sourcingStrengthScore += Math.round((Math.min(10, Math.max(1, q12)) / 10) * 7);

  const q13 = responseMap.get("q13") || "";
  if (q13 === "Targeted multi-channel campaign sourcing") sourcingStrengthScore += 6;
  else if (q13 === "Combination of inbound and outreach") sourcingStrengthScore += 4;
  else if (q13 === "Limited sourcing channels") sourcingStrengthScore += 2;
  else sourcingStrengthScore += 1;

  sourcingStrengthScore = Math.min(sourcingStrengthScore, 20);

  const q14 = responseMap.get("q14") || "";
  if (q14 === "Always") candidateEvaluationScore += 5;
  else if (q14 === "Often") candidateEvaluationScore += 4;
  else if (q14 === "Occasionally") candidateEvaluationScore += 2;
  else candidateEvaluationScore += 1;

  const q15 = parseInt(responseMap.get("q15") || "5") || 5;
  candidateEvaluationScore += Math.round((Math.min(10, Math.max(1, q15)) / 10) * 5);

  const q16 = responseMap.get("q16") || "";
  const q16values = q16.split(",").map(v => v.trim()).filter(Boolean);
  const q16best = ["Behavioural benchmarks & questionnaires", "Final Fit & Risk analysis", "Visual candidate comparison / score reports"];
  const q16good = ["Structured interview scorecards", "Behavioural or competency-based interview framework", "Psychometric / assessment tools"];
  const bestCount = q16values.filter(v => q16best.includes(v)).length;
  const goodCount = q16values.filter(v => q16good.includes(v)).length;
  if (bestCount >= 2) candidateEvaluationScore += 5;
  else if (bestCount >= 1 || goodCount >= 2) candidateEvaluationScore += 4;
  else if (goodCount >= 1) candidateEvaluationScore += 3;
  else candidateEvaluationScore += 1;

  const q17 = parseInt(responseMap.get("q17") || "5") || 5;
  candidateEvaluationScore += Math.round((Math.min(10, Math.max(1, q17)) / 10) * 5);

  candidateEvaluationScore = Math.min(candidateEvaluationScore, 20);

  const q18 = responseMap.get("q18") || "";
  if (q18 === "Fully structured and aligned to the benchmark and early assessment outputs") decisionQualityScore += 7;
  else if (q18 === "Mostly structured and consistent") decisionQualityScore += 5;
  else if (q18 === "Partly structured but inconsistent") decisionQualityScore += 3;
  else decisionQualityScore += 1;

  const q19 = responseMap.get("q19") || "";
  if (q19 === "Almost always") decisionQualityScore += 7;
  else if (q19 === "Often") decisionQualityScore += 5;
  else if (q19 === "Occasionally") decisionQualityScore += 2;
  else decisionQualityScore += 1;

  const q20 = responseMap.get("q20") || "";
  if (q20 === "Always structured and evidence-led") decisionQualityScore += 6;
  else if (q20 === "Evidence informed but still partly subjective") decisionQualityScore += 4;
  else if (q20 === "Shared discussion with limited structure") decisionQualityScore += 2;
  else decisionQualityScore += 1;

  decisionQualityScore = Math.min(decisionQualityScore, 20);

  const totalScore = roleDefinitionScore + candidateAttractionScore + sourcingStrengthScore + candidateEvaluationScore + decisionQualityScore;

  let category: string;
  if (totalScore >= 81) category = "Hiring Leader";
  else if (totalScore >= 61) category = "Structured Hiring";
  else if (totalScore >= 36) category = "Developing Process";
  else category = "Early Stage Hiring";

  const dimensionScores = [
    { name: "Role Definition", score: roleDefinitionScore },
    { name: "Candidate Attraction", score: candidateAttractionScore },
    { name: "Sourcing Strength", score: sourcingStrengthScore },
    { name: "Candidate Evaluation", score: candidateEvaluationScore },
    { name: "Decision Quality", score: decisionQualityScore },
  ];
  dimensionScores.sort((a, b) => a.score - b.score);
  const weakThreshold = 14;
  const topWeaknesses = dimensionScores
    .filter(d => d.score < weakThreshold)
    .slice(0, 5)
    .map(d => d.name);

  return {
    roleDefinitionScore,
    candidateAttractionScore,
    sourcingStrengthScore,
    candidateEvaluationScore,
    decisionQualityScore,
    totalScore,
    category,
    topWeaknesses,
  };
}
