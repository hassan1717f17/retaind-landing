import { BackButton } from "@/components/back-button";
import { BadHireCalculatorIsland } from "@/features/bad-hire-calculator/components";
import type { CalculatorDefaults } from "@/lib/api/types/bad-hire-calculator";

// Frontend-only: seed the calculator with sensible starting numbers.
const CALCULATOR_DEFAULTS: CalculatorDefaults = {
  totalHires: 20,
  totalLeavers: 6,
  firstYearLeavers: 4,
  avgSalary: 50000,
  agencyFee: 20,
};

export default function BadHireCalculatorPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
        <BackButton className="mb-8" />
        <BadHireCalculatorIsland defaults={CALCULATOR_DEFAULTS} />
      </div>
    </div>
  );
}
