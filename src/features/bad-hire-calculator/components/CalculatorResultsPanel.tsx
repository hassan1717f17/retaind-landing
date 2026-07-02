import { CalculationMethodologyAccordion } from "./CalculationMethodologyAccordion";
import { EvidenceLedCTA } from "./EvidenceLedCTA";
import { ResultsCards } from "./ResultsCards";
import { ResultsEmptyState } from "./ResultsEmptyState";
import type {
  CalculatorInputs,
  CalculatorResults,
} from "@/lib/api/types/bad-hire-calculator";

interface CalculatorResultsPanelProps {
  calculated: boolean;
  inputs: CalculatorInputs;
  results: CalculatorResults;
  showBreakdown: boolean;
  onToggleBreakdown: () => void;
}

export function CalculatorResultsPanel({
  calculated,
  inputs,
  results,
  showBreakdown,
  onToggleBreakdown,
}: CalculatorResultsPanelProps) {
  if (!calculated) return <ResultsEmptyState />;

  return (
    <div className="space-y-4">
      <ResultsCards inputs={inputs} results={results} />
      <CalculationMethodologyAccordion
        inputs={inputs}
        results={results}
        showBreakdown={showBreakdown}
        onToggle={onToggleBreakdown}
      />
      <EvidenceLedCTA
        potentialSavings={results.potentialSavings}
        alreadyAtTarget={results.alreadyAtTarget}
      />
    </div>
  );
}
