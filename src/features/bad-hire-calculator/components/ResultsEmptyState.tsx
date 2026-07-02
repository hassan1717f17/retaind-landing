import { BarChart3 } from "lucide-react";

export function ResultsEmptyState() {
  return (
    <div className="bg-muted rounded-xl border border-border p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
      <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center mb-4">
        <BarChart3 className="w-8 h-8 text-muted-foreground/30" />
      </div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-2">
        Your results will appear here
      </h3>
      <p className="text-xs text-muted-foreground/70 max-w-sm leading-relaxed">
        Enter your hiring data on the left and click &ldquo;Calculate True
        Cost&rdquo; to reveal the real financial impact of your recruitment
        decisions.
      </p>
    </div>
  );
}
