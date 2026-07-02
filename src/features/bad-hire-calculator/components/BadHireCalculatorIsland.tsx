"use client";
import { AlertTriangle } from "lucide-react";
import { useCalculatorState } from "../hooks/useCalculatorState";
import { CalculatorInputsPanel } from "./CalculatorInputsPanel";
import { CalculatorResultsPanel } from "./CalculatorResultsPanel";
import type { CalculatorDefaults } from "@/lib/api/types/bad-hire-calculator";

interface BadHireCalculatorIslandProps {
  defaults: CalculatorDefaults;
}

export function BadHireCalculatorIsland({
  defaults,
}: BadHireCalculatorIslandProps) {
  const state = useCalculatorState(defaults);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">
          Cost of a Bad Hire Calculator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Uncover the true cost of recruitment — the numbers your business
          doesn&apos;t see
        </p>
      </div>

      <div className="bg-gradient-to-r from-destructive to-destructive/80 rounded-xl p-6 text-background">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-background/15 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold font-heading mb-2">
              Most businesses underestimate annual hiring costs by tens if not
              hundreds of thousands each year
            </h2>
            <p className="text-sm text-background/80 leading-relaxed max-w-2xl">
              The visible costs — agency fees, job ads, onboarding — are just
              the tip of the iceberg. Below the surface: lost productivity, team
              disruption, cultural damage, and the cost of re-hiring. Enter your
              numbers below to see the real picture.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <CalculatorInputsPanel
            inputs={state.inputs}
            validationErrors={state.validationErrors}
            isValid={state.isValid}
            calculated={state.calculated}
            onTotalHiresChange={state.setTotalHires}
            onTotalLeaversChange={state.setTotalLeavers}
            onFirstYearLeaversChange={state.setFirstYearLeavers}
            onAvgSalaryChange={state.setAvgSalary}
            onAgencyFeeChange={state.setAgencyFee}
            onCalculate={state.handleCalculate}
            onReset={state.handleReset}
          />
        </div>
        <div className="lg:col-span-3">
          <CalculatorResultsPanel
            calculated={state.calculated}
            inputs={state.inputs}
            results={state.results}
            showBreakdown={state.showBreakdown}
            onToggleBreakdown={() =>
              state.setShowBreakdown(!state.showBreakdown)
            }
          />
        </div>
      </div>
    </div>
  );
}
