import { Calculator, ChevronDown, ChevronUp, Info } from "lucide-react";
import { fmtGBP } from "../lib/calculations";
import type {
  CalculatorInputs,
  CalculatorResults,
} from "@/lib/api/types/bad-hire-calculator";

interface CalculationMethodologyAccordionProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
  showBreakdown: boolean;
  onToggle: () => void;
}

export function CalculationMethodologyAccordion({
  inputs,
  results,
  showBreakdown,
  onToggle,
}: CalculationMethodologyAccordionProps) {
  return (
    <>
      <button
        onClick={onToggle}
        aria-expanded={showBreakdown}
        aria-controls="calc-breakdown"
        className="w-full flex items-center justify-between px-4 py-3 bg-muted rounded-xl border border-border text-xs font-medium text-muted-foreground hover:bg-muted/70 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5" />
          How are these numbers calculated?
        </span>
        {showBreakdown ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {showBreakdown && (
        <div
          id="calc-breakdown"
          className="bg-card rounded-xl border border-border p-5 space-y-4"
        >
          <h4 className="text-xs font-semibold text-foreground flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5 text-primary" />
            Calculation Methodology
          </h4>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="bg-muted rounded-lg p-3">
              <p className="font-semibold text-foreground mb-1">
                Attrition Rate
              </p>
              <p className="font-mono text-[11px] text-primary">
                (Total Leavers ÷ Total Hires) × 100 = (
                {Number(inputs.totalLeavers)} ÷ {Number(inputs.totalHires)}) ×
                100 = {results.attritionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="font-semibold text-foreground mb-1">
                Perceived Recruitment Costs
              </p>
              <p className="font-mono text-[11px] text-primary">
                Avg Salary × Fee % × Total Hires ={" "}
                {fmtGBP(Number(inputs.avgSalary))} × {Number(inputs.agencyFee)}%
                × {Number(inputs.totalHires)} ={" "}
                {fmtGBP(results.perceivedCosts)}
              </p>
            </div>
            <div className="bg-accent-destructive-bg rounded-lg p-3">
              <p className="font-semibold text-accent-destructive-fg mb-1">
                Bad Hire Cost (Additional)
              </p>
              <p className="font-mono text-[11px] text-destructive">
                1st Year Leavers × Avg Salary × 2 ={" "}
                {Number(inputs.firstYearLeavers)} ×{" "}
                {fmtGBP(Number(inputs.avgSalary))} × 2 ={" "}
                {fmtGBP(results.badHireCostAdditional)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Based on 2× salary for productivity loss, re-hiring, and
                disruption
              </p>
            </div>
            <div className="bg-accent-destructive-bg rounded-lg p-3">
              <p className="font-semibold text-accent-destructive-fg mb-1">
                Total Cost of Bad Leavers
              </p>
              <p className="font-mono text-[11px] text-destructive">
                1st Year Leavers × Avg Salary × 2 ={" "}
                {Number(inputs.firstYearLeavers)} ×{" "}
                {fmtGBP(Number(inputs.avgSalary))} × 2 ={" "}
                {fmtGBP(results.costOfBadLeavers)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                Total cost including productivity loss, re-hiring, onboarding,
                and disruption at 2× salary
              </p>
            </div>
            <div className="bg-accent-success-bg rounded-lg p-3">
              <p className="font-semibold text-accent-success-fg mb-1">
                Potential Savings (5% target)
              </p>
              <p className="font-mono text-[11px] text-accent-success-solid">
                Current actual cost − Target actual cost ={" "}
                {fmtGBP(results.actualCosts)} −{" "}
                {fmtGBP(results.actualCosts - results.potentialSavings)} ={" "}
                {fmtGBP(results.potentialSavings)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">
                If first-year leavers dropped from{" "}
                {Number(inputs.firstYearLeavers)} to {results.targetFyLeavers}{" "}
                (5% of hires)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
