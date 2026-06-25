"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import { agencyFaqs, inhouseFaqs } from "@/components/landing/faq-data";
import type { Audience } from "@/components/landing/types";

interface Props {
  selectedAudience: Audience;
}

export function Faq({ selectedAudience }: Props) {
  const [faqExpanded, setFaqExpanded] = useState(false);

  return (
    <Section className="bg-muted">
      <SectionHeader>
        <SectionBadge>FAQ</SectionBadge>
        <h2 className="text-4xl mb-6">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground">
          {selectedAudience === "agency"
            ? "Common questions from recruitment agencies considering Retaind.ai"
            : "Common questions from hiring managers and in-house teams"}
        </p>
      </SectionHeader>

      <div className="max-w-3xl mx-auto">
        {selectedAudience === "agency" ? (
          <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq-agency">
            {(faqExpanded ? agencyFaqs : agencyFaqs.slice(0, 3)).map((faq, idx) => (
              <AccordionItem key={idx} value={`q${idx + 1}`}>
                <AccordionTrigger data-testid={`faq-agency-q${idx + 1}`}>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq-inhouse">
            {(faqExpanded ? inhouseFaqs : inhouseFaqs.slice(0, 3)).map((faq, idx) => (
              <AccordionItem key={idx} value={`q${idx + 1}`}>
                <AccordionTrigger data-testid={`faq-inhouse-q${idx + 1}`}>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setFaqExpanded(!faqExpanded)}
            data-testid="button-faq-toggle"
          >
            {faqExpanded ? "Show Less" : "Show More Questions"}
            <ChevronRight
              className={`w-4 h-4 ml-2 transition-transform ${faqExpanded ? "rotate-90" : ""}`}
            />
          </Button>
        </div>
      </div>
    </Section>
  );
}
