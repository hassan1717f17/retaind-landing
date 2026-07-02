"use client";

import { Section } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";
import { useReveal } from "@/components/landing/use-reveal";

export function FairAssessment({ selectedAudience }: { selectedAudience: Audience }) {
  const scope = useReveal();
  return (
    <Section className="bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center" ref={scope}>
        <div data-reveal className="inline-block px-3 py-1 rounded-full bg-background/10 text-background/80 text-sm font-semibold mb-4 tracking-wide uppercase">
          Fair &amp; Unbiased
        </div>
        <p data-reveal className="text-xl leading-relaxed text-background/80 mb-6" data-testid="text-fair-assessment-1">
          The <span className="text-background">Retaind</span> platform does not inform recruiters who to hire or not to hire. We simply use established assessments and psychology to identify positive correlations and potential areas of conflict within each candidate, for the recruiter to examine further.
        </p>
        <p data-reveal className="text-xl leading-relaxed text-background/80" data-testid="text-fair-assessment-2">
          All candidates are assessed using exactly the same methodology and process, so that a fairer, non-bias evaluation is applied to each and every applicant.
        </p>
      </div>
    </Section>
  );
}
