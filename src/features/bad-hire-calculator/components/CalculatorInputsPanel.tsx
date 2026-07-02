import {
  AlertTriangle,
  Calculator,
  Percent,
  PoundSterling,
  RefreshCw,
  TrendingDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CalculatorInputs } from "@/lib/api/types/bad-hire-calculator";

interface CalculatorInputsPanelProps {
  inputs: CalculatorInputs;
  validationErrors: string[];
  isValid: boolean;
  calculated: boolean;
  onTotalHiresChange: (v: number | "") => void;
  onTotalLeaversChange: (v: number | "") => void;
  onFirstYearLeaversChange: (v: number | "") => void;
  onAvgSalaryChange: (v: number | "") => void;
  onAgencyFeeChange: (v: number | "") => void;
  onCalculate: () => void;
  onReset: () => void;
}

export function CalculatorInputsPanel({
  inputs,
  validationErrors,
  isValid,
  calculated,
  onTotalHiresChange,
  onTotalLeaversChange,
  onFirstYearLeaversChange,
  onAvgSalaryChange,
  onAgencyFeeChange,
  onCalculate,
  onReset,
}: CalculatorInputsPanelProps) {
  const leaversError =
    Number(inputs.totalLeavers) > Number(inputs.totalHires) &&
    Number(inputs.totalHires) > 0;
  const fyLeaversError =
    Number(inputs.firstYearLeavers) > Number(inputs.totalLeavers) &&
    Number(inputs.totalLeavers) >= 0;

  const inputBase =
    "w-full px-3 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring";

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">1</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Your Hiring Data
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="total-hires"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5"
            >
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              Total hires in the last 12 months
            </label>
            <input
              id="total-hires"
              type="number"
              value={inputs.totalHires}
              onChange={(e) =>
                onTotalHiresChange(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Number(e.target.value)),
                )
              }
              className={cn(inputBase, "border-border")}
              placeholder="e.g. 20"
              min={0}
            />
          </div>
          <div>
            <label
              htmlFor="total-leavers"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5"
            >
              <TrendingDown className="w-3.5 h-3.5 text-muted-foreground" />
              Total leavers in the last 12 months
            </label>
            <input
              id="total-leavers"
              type="number"
              value={inputs.totalLeavers}
              onChange={(e) =>
                onTotalLeaversChange(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Number(e.target.value)),
                )
              }
              className={cn(
                inputBase,
                leaversError
                  ? "border-destructive bg-accent-destructive-bg"
                  : "border-border",
              )}
              placeholder="e.g. 6"
              min={0}
            />
            {leaversError && (
              <p className="text-[10px] text-destructive mt-1 font-medium">
                Cannot exceed total hires
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="first-year-leavers"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
              Of those, how many left within their first 12 months?
            </label>
            <input
              id="first-year-leavers"
              type="number"
              value={inputs.firstYearLeavers}
              onChange={(e) =>
                onFirstYearLeaversChange(
                  e.target.value === ""
                    ? ""
                    : Math.max(0, Number(e.target.value)),
                )
              }
              className={cn(
                inputBase,
                fyLeaversError
                  ? "border-destructive bg-accent-destructive-bg"
                  : "border-border",
              )}
              placeholder="e.g. 4"
              min={0}
            />
            {fyLeaversError ? (
              <p className="text-[10px] text-destructive mt-1 font-medium">
                Cannot exceed total leavers
              </p>
            ) : (
              <p className="text-[10px] text-muted-foreground mt-1">
                These are the hires most likely to represent a bad hiring
                decision
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">2</span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Salary &amp; Fee Assumptions
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="avg-salary"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5"
            >
              <PoundSterling className="w-3.5 h-3.5 text-muted-foreground" />
              Average salary per hire
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                £
              </span>
              <input
                id="avg-salary"
                type="number"
                value={inputs.avgSalary}
                onChange={(e) =>
                  onAvgSalaryChange(
                    e.target.value === ""
                      ? ""
                      : Math.max(0, Number(e.target.value)),
                  )
                }
                className={cn(inputBase, "pl-7 border-border")}
                placeholder="50000"
                min={0}
                step={5000}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="agency-fee"
              className="flex items-center gap-1.5 text-xs font-medium text-foreground mb-1.5"
            >
              <Percent className="w-3.5 h-3.5 text-muted-foreground" />
              Average agency recruitment fee
            </label>
            <div className="relative">
              <input
                id="agency-fee"
                type="number"
                value={inputs.agencyFee}
                onChange={(e) =>
                  onAgencyFeeChange(
                    e.target.value === ""
                      ? ""
                      : Math.min(100, Math.max(0, Number(e.target.value))),
                  )
                }
                className={cn(inputBase, "pr-8 border-border")}
                placeholder="20"
                min={0}
                max={100}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="bg-accent-destructive-bg border border-destructive/30 rounded-lg p-3 space-y-1">
          {validationErrors.map((err, i) => (
            <p
              key={i}
              className="text-[11px] text-destructive flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3 h-3 shrink-0" /> {err}
            </p>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Button
          variant="default"
          className="flex-1"
          onClick={onCalculate}
          disabled={!isValid}
        >
          <Calculator className="w-4 h-4" /> Calculate True Cost
        </Button>
        {calculated && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="px-3"
            aria-label="Reset calculator"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
