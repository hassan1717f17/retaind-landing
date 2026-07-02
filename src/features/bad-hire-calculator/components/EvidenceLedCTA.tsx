import { ArrowRight, Target } from "lucide-react";
import { fmtGBP } from "../lib/calculations";

interface EvidenceLedCTAProps {
  potentialSavings: number;
  alreadyAtTarget: boolean;
}

export function EvidenceLedCTA({
  potentialSavings,
  alreadyAtTarget,
}: EvidenceLedCTAProps) {
  return (
    <div className="bg-foreground rounded-xl p-5 text-background">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
          <Target className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">
            How evidence-led hiring changes these numbers
          </p>
          <p className="text-xs text-background/60 leading-relaxed mb-3">
            Contingency recruitment has a first-year failure rate of{" "}
            <strong>&gt;25%</strong>. Evidence-led, retained hiring brings this
            below <strong>10%</strong> — through behavioural assessment,
            structured evaluation, and data-backed shortlisting.
          </p>
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-lg font-bold text-destructive">&gt;25%</p>
              <p className="text-[10px] text-background/50">
                Contingency failure rate
              </p>
            </div>
            <div className="flex items-center">
              <ArrowRight className="w-4 h-4 text-background/30" />
            </div>
            <div>
              <p className="text-lg font-bold text-accent-success-solid">
                &lt;10%
              </p>
              <p className="text-[10px] text-background/50">
                Evidence-led failure rate
              </p>
            </div>
            <div className="flex items-center">
              <ArrowRight className="w-4 h-4 text-background/30" />
            </div>
            <div>
              <p className="text-lg font-bold text-primary">
                {alreadyAtTarget ? "On Target" : fmtGBP(potentialSavings)}
              </p>
              <p className="text-[10px] text-background/50">
                {alreadyAtTarget
                  ? "Already performing well"
                  : "Your potential saving"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
