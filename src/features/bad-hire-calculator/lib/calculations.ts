import type {
  CalculatorInputs,
  CalculatorResults,
} from "@/lib/api/types/bad-hire-calculator";

export function fmtGBP(n: number): string {
  return (
    "£" +
    n.toLocaleString("en-GB", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export function validateInputs(inputs: CalculatorInputs): string[] {
  const errors: string[] = [];
  const hires = Number(inputs.totalHires) || 0;
  const leavers = Number(inputs.totalLeavers) || 0;
  const fyLeavers = Number(inputs.firstYearLeavers) || 0;
  const fee = Number(inputs.agencyFee) || 0;

  if (hires <= 0) errors.push("Total hires must be at least 1");
  if (leavers > hires && hires > 0)
    errors.push("Leavers cannot exceed total hires");
  if (fyLeavers > leavers && leavers >= 0)
    errors.push("First-year leavers cannot exceed total leavers");
  if (fee > 100) errors.push("Agency fee cannot exceed 100%");
  if (Number(inputs.avgSalary) <= 0 && inputs.totalHires !== "")
    errors.push("Average salary must be greater than 0");
  return errors;
}

export function calculateResults(inputs: CalculatorInputs): CalculatorResults {
  const hires = Number(inputs.totalHires) || 0;
  const leavers = Math.min(Number(inputs.totalLeavers) || 0, hires);
  const fyLeavers = Math.min(Number(inputs.firstYearLeavers) || 0, leavers);
  const salary = Number(inputs.avgSalary) || 0;
  const fee = Math.min(Number(inputs.agencyFee) || 0, 100) / 100;

  const attritionRate = hires > 0 ? (leavers / hires) * 100 : 0;
  const perceivedCosts = salary * fee * hires;
  const badHireCostAdditional = fyLeavers * salary * 2;
  const actualCosts = perceivedCosts + badHireCostAdditional;
  const costOfBadLeavers = fyLeavers * salary * 2;

  const targetFyLeavers = Math.round(hires * 0.05);
  const targetBadHireCost = targetFyLeavers * salary * 2;
  const potentialSavings = Math.max(
    0,
    actualCosts - (perceivedCosts + targetBadHireCost),
  );

  const hiddenCostMultiple =
    perceivedCosts > 0 ? actualCosts / perceivedCosts : 0;
  const alreadyAtTarget = fyLeavers <= targetFyLeavers;

  return {
    attritionRate,
    perceivedCosts,
    badHireCostAdditional,
    actualCosts,
    costOfBadLeavers,
    potentialSavings,
    hiddenCostMultiple,
    targetFyLeavers,
    alreadyAtTarget,
  };
}
