export interface Question {
  id: string;
  section: string;
  question: string;
  type: "single" | "multi" | "scale" | "scenario";
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  conditional?: { questionId: string; values: string[] };
}

export const agencyQuestions: Question[] = [
  {
    id: "q1",
    section: "Recruiter Background",
    question: "How long have you been working in recruitment?",
    type: "single",
    options: [
      "Less than 1 year",
      "1–3 years",
      "3–7 years",
      "7–15 years",
      "15+ years",
    ],
  },
  {
    id: "q2",
    section: "Recruiter Background",
    question: "Which sector do you primarily recruit within?",
    type: "single",
    options: [
      "Technology Services / SaaS / Cyber",
      "Professional Business Services (Legal / Finance etc)",
      "Sales / Marketing / Digital / Events / Commercial Growth",
      "Engineering / Manufacturing",
      "Retail / Hospitality / Travel / Leisure",
      "Supply Chain & Logistics / Transport",
      "Healthcare / Life Sciences",
      "People Services / Staffing / HR / Consulting / Training / Leadership / Security",
      "Multi-sector",
      "Other",
    ],
  },
  {
    id: "q3",
    section: "Recruiter Background",
    question: "What is your role within your recruitment business?",
    type: "single",
    options: [
      "Agency owner / founder",
      "Director / leadership team",
      "Billing manager / team leader",
      "Recruiter / consultant",
      "Solo recruiter / independent",
    ],
  },
  {
    id: "q4",
    section: "Recruiter Background",
    question: "How many recruiters work within your business?",
    type: "single",
    options: [
      "Just me",
      "2–5 recruiters",
      "6–15 recruiters",
      "16–50 recruiters",
      "50+",
    ],
    conditional: {
      questionId: "q3",
      values: ["Agency owner / founder", "Director / leadership team"],
    },
  },
  {
    id: "q5",
    section: "Commercial Performance",
    question: "What is the typical salary range of the roles you recruit for?",
    type: "single",
    options: [
      "£20k–£40k",
      "£40k–£70k",
      "£70k–£120k",
      "£120k–£200k",
      "£200k+",
    ],
  },
  {
    id: "q6",
    section: "Commercial Performance",
    question: "What is your typical recruitment fee as a percentage of salary?",
    type: "single",
    options: ["10–15%", "15–20%", "20–25%", "25%+"],
  },
  {
    id: "q7",
    section: "Commercial Performance",
    question:
      "What percentage of your current assignments are exclusive (sole agency)?",
    type: "single",
    options: ["0–25%", "26–50%", "51–75%", "76–100%"],
  },
  {
    id: "q8",
    section: "Commercial Performance",
    question:
      "What is your typical campaign-to-placement success rate?",
    type: "single",
    options: [
      "Less than 20%",
      "20–30%",
      "30–50%",
      "More than 50%",
    ],
  },
  {
    id: "q9",
    section: "Commercial Performance",
    question:
      "Approximately how much personal billing revenue did you generate in the last 12 months?",
    type: "single",
    options: [
      "Under £100k",
      "£100k–£250k",
      "£250k–£500k",
      "£500k+",
    ],
  },
  {
    id: "q10",
    section: "Growth Ambition",
    question: "What is your primary growth goal for the next 12 months?",
    type: "single",
    options: [
      "Maintain current revenue",
      "Grow moderately",
      "Significantly grow my revenue",
      "Transition fully to retained",
    ],
  },
  {
    id: "q11",
    section: "Growth Ambition",
    question: "How many active assignments do you typically manage at any one time?",
    type: "single",
    options: ["1–5", "5–10", "10–20", "20+"],
  },
  {
    id: "q12",
    section: "Growth Ambition",
    question:
      "How much time and effort are you willing to invest in transitioning toward retained recruitment?",
    type: "single",
    options: [
      "Minimal – I want easy wins",
      "Moderate time",
      "Significant time and effort",
    ],
  },
  {
    id: "q13",
    section: "Retained Readiness",
    question:
      "On a scale of 1–10, how confident are you in your ability to sell retained recruitment to a client?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: "Not confident", max: "Very confident" },
  },
  {
    id: "q14",
    section: "Retained Readiness",
    question: "Have you ever won a retained recruitment assignment?",
    type: "single",
    options: [
      "No, never",
      "I've tried but haven't won one yet",
      "Yes, occasionally",
      "Yes, regularly",
    ],
  },
  {
    id: "q15",
    section: "Retained Readiness",
    question:
      "On a scale of 1–10, how confident are you in pricing and structuring a retained recruitment proposal?",
    type: "scale",
    scaleMin: 1,
    scaleMax: 10,
    scaleLabels: { min: "Not confident", max: "Very confident" },
  },
  {
    id: "q16",
    section: "Retained Readiness",
    question:
      "Do you currently use a structured search methodology when delivering recruitment campaigns?",
    type: "single",
    options: [
      "No, I work ad-hoc",
      "Somewhat structured",
      "Yes, I use a structured methodology",
    ],
  },
  {
    id: "q17",
    section: "Barriers & Scenarios",
    question:
      "What are the biggest barriers preventing you from winning retained recruitment work? (Select all that apply)",
    type: "multi",
    options: [
      "Clients won't pay retainers",
      "I don't know how to price retained work",
      "I lack the confidence to pitch retained",
      "I don't have a structured methodology",
      "My sector doesn't suit retained recruitment",
      "I don't know where to start",
      "Competition from other agencies",
      "None – I'm ready to start",
    ],
  },
  {
    id: "q18",
    section: "Barriers & Scenarios",
    question:
      "A client says: \"We always use 3 agencies on contingency – why should we work exclusively with you?\" How would you respond?",
    type: "scenario",
    options: [
      "I'd explain our exclusive retained search methodology reduces hiring risk and delivers better quality candidates",
      "I'd offer to work on a hybrid model – reduced fee contingency with an exclusive retained option",
      "I'd offer to match or beat their current agency fees to win the work",
      "I'd accept the contingency brief and compete with the other agencies",
    ],
  },
  {
    id: "q19",
    section: "Barriers & Scenarios",
    question:
      "A client asks: \"What happens if the candidate you place leaves within 3 months?\" What do you offer?",
    type: "scenario",
    options: [
      "A replacement guarantee – we'll replace the candidate at no additional search cost",
      "A 6-12 month replacement guarantee with retained payment structure",
      "A partial rebate on our fee",
      "A reduced fee for the replacement search",
    ],
  },
  {
    id: "q20",
    section: "Barriers & Scenarios",
    question:
      "You're pitching for a senior hire worth £120k salary. The client has never used retained before. What fee structure would you propose?",
    type: "scenario",
    options: [
      "A structured retainer: ⅓ upfront commitment, ⅓ on shortlist, ⅓ on completion with replacement guarantee",
      "A milestone-based approach: smaller retainer upfront with progress-linked payments",
      "Standard contingency fee but with exclusive access for 4 weeks",
      "Whatever the client is comfortable with – flexibility is key",
    ],
  },
];
