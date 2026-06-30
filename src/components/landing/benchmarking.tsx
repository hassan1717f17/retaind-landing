"use client";

import { Section, SectionBadge } from "@/components/landing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Audience } from "@/components/landing/types";
import { useReveal } from "@/components/landing/use-reveal";

export function Benchmarking({ selectedAudience }: { selectedAudience: Audience }) {
  const scope = useReveal();
  return (
    <Section className="bg-background">
      <div className="grid lg:grid-cols-2 gap-16 items-center" ref={scope}>
        <div data-reveal>
          <SectionBadge>Analytics</SectionBadge>
          <h2 className="text-4xl font-bold mb-6">Behavioral Benchmarking</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Establish precise cultural and behavioral benchmarks to assess candidate compatibility with scientific accuracy.
          </p>

          <Accordion type="single" collapsible className="w-full" defaultValue="item-1" data-testid="accordion-benchmarking">
            <AccordionItem value="item-1" data-testid="accordion-item-benchmark-1">
              <AccordionTrigger className="text-lg font-bold" data-testid="button-accordion-benchmark-1">Client Benchmark Questionnaire</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Employers collaborate to complete a comprehensive benchmarking assessment, defining ideal candidate traits, values, and behaviours.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" data-testid="accordion-item-benchmark-2">
              <AccordionTrigger className="text-lg font-bold" data-testid="button-accordion-benchmark-2">Candidate Assessment</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Candidates complete matching questionnaires, creating detailed compatibility profiles that compare directly to the benchmark.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" data-testid="accordion-item-benchmark-3">
              <AccordionTrigger className="text-lg font-bold" data-testid="button-accordion-benchmark-3">Visual Correlation Analysis</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Spider diagrams and charts instantly reveal strengths and potential conflict areas, removing gut-feel from the hiring decision.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div data-reveal className="bg-muted p-8 rounded-3xl border border-border">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/68e4c3ad71d0e1de264e09fd_1760089062873_11a311aa.jpg"
            alt="Behavioral Assessment"
            className="rounded-xl shadow-lg w-full"
          />
          <p className="text-center text-sm text-muted-foreground mt-4 italic">
            Simple behavioural and cultural assessment and analysis
          </p>
        </div>
      </div>
    </Section>
  );
}
