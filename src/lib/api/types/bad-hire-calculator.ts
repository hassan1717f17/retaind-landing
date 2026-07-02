import { z } from "zod";

export const calculatorInputsSchema = z.object({
  totalHires: z.union([z.number(), z.literal("")]),
  totalLeavers: z.union([z.number(), z.literal("")]),
  firstYearLeavers: z.union([z.number(), z.literal("")]),
  avgSalary: z.union([z.number(), z.literal("")]),
  agencyFee: z.union([z.number(), z.literal("")]),
});
export type CalculatorInputs = z.infer<typeof calculatorInputsSchema>;

export const calculatorResultsSchema = z.object({
  attritionRate: z.number(),
  perceivedCosts: z.number(),
  badHireCostAdditional: z.number(),
  actualCosts: z.number(),
  costOfBadLeavers: z.number(),
  potentialSavings: z.number(),
  hiddenCostMultiple: z.number(),
  targetFyLeavers: z.number(),
  alreadyAtTarget: z.boolean(),
});
export type CalculatorResults = z.infer<typeof calculatorResultsSchema>;

export type CalculatorDefaults = CalculatorInputs;
