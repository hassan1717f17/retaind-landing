import {
  AlertTriangle,
  DollarSign,
  PoundSterling,
  Shield,
  TrendingDown,
} from "lucide-react";
import { fmtGBP } from "../lib/calculations";
import type {
  CalculatorInputs,
  CalculatorResults,
} from "@/lib/api/types/bad-hire-calculator";

interface ResultsCardsProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function ResultsCards({ inputs, results }: ResultsCardsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-accent-warning-solid" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Attrition Rate
            </span>
          </div>
          <p className="text-2xl font-bold text-accent-warning-fg">
            {results.attritionRate.toFixed(1)}%
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {results.attritionRate > 15
              ? "Above industry average — significant risk"
              : results.attritionRate > 10
                ? "Moderate — room for improvement"
                : "Healthy retention rate"}
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Perceived Costs
            </span>
          </div>
          <p className="text-2xl font-bold text-primary">
            {fmtGBP(results.perceivedCosts)}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">
            What you think recruitment costs
          </p>
        </div>
      </div>

      <div className="bg-accent-destructive-bg rounded-xl border-2 border-destructive/30 p-5 relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <span className="text-[9px] font-bold bg-destructive text-background px-2 py-0.5 rounded-full uppercase tracking-wider">
            Hidden Cost
          </span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-[10px] font-semibold text-accent-destructive-fg uppercase tracking-wider">
            Actual Recruiting Costs
          </span>
        </div>
        <p className="text-3xl font-bold text-destructive mb-1">
          {fmtGBP(results.actualCosts)}
        </p>
        <p className="text-xs text-accent-destructive-fg font-medium mb-3">
          That&apos;s {results.hiddenCostMultiple.toFixed(1)}× what you thought
          you were spending
        </p>
        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1 bg-background/60 rounded px-2 py-1">
            <span className="text-muted-foreground">Agency fees:</span>
            <span className="font-semibold text-foreground">
              {fmtGBP(results.perceivedCosts)}
            </span>
          </div>
          <span className="text-accent-destructive-fg">+</span>
          <div className="flex items-center gap-1 bg-background/60 rounded px-2 py-1">
            <span className="text-accent-destructive-fg">Bad hire costs:</span>
            <span className="font-semibold text-destructive">
              {fmtGBP(results.badHireCostAdditional)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-4 h-4 text-destructive" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Total Cost of Bad Leavers
          </span>
        </div>
        <p className="text-2xl font-bold text-destructive">
          {fmtGBP(results.costOfBadLeavers)}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          This includes lost productivity, re-hiring, onboarding, team
          disruption, and reputational damage — calculated at 2× annual salary
          per first-year leaver.
        </p>
      </div>

      {results.alreadyAtTarget ? (
        <div className="bg-primary/5 rounded-xl border-2 border-primary/20 p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
              First-Year Leaver Rate
            </span>
          </div>
          <p className="text-2xl font-bold text-primary mb-1">
            Already at or below 5% target
          </p>
          <p className="text-xs text-primary/70 leading-relaxed">
            Your first-year leaver rate is already at or better than the 5%
            benchmark. You&apos;re performing well — focus on maintaining this
            through continued evidence-led hiring practices.
          </p>
        </div>
      ) : (
        <div className="bg-accent-success-bg rounded-xl border-2 border-accent-success-solid/30 p-5">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-accent-success-solid" />
            <span className="text-[10px] font-semibold text-accent-success-fg uppercase tracking-wider">
              Potential Annual Savings
            </span>
          </div>
          <p className="text-3xl font-bold text-accent-success-fg mb-1">
            {fmtGBP(results.potentialSavings)}
          </p>
          <p className="text-xs text-accent-success-fg leading-relaxed">
            By reducing first-year leavers to just 5% (from{" "}
            {Number(inputs.firstYearLeavers)} to {results.targetFyLeavers}{" "}
            people), your business could save{" "}
            <strong>{fmtGBP(results.potentialSavings)}</strong> per year through
            evidence-led hiring.
          </p>
        </div>
      )}
    </div>
  );
}
