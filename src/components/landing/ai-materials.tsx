"use client";

import { Check } from "lucide-react";
import { Section } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function AiMaterials({ selectedAudience }: { selectedAudience: Audience }) {
  return (
    <Section className="bg-foreground text-background">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img
            src="/assets/Campaign_brochure_1770200143314-CNwVs677_1770377594220.jpg"
            alt="Campaign Materials"
            className="rounded-md shadow-[8px_12px_24px_rgba(0,0,0,0.4)] border border-background/20 transform -rotate-3 transition-transform"
          />
        </div>
        <div className="order-1 lg:order-2">
          <div className="inline-block px-3 py-1 rounded-full bg-background/10 text-background/80 text-sm font-semibold mb-4 tracking-wide uppercase">
            Content Generation
          </div>
          <h2 className="text-4xl font-bold mb-6 text-background">AI-Generated Campaign Materials</h2>
          <p className="text-lg text-background/80 mb-8">
            Transform job descriptions into compelling recruitment campaigns in seconds using our advanced language models.
          </p>

          <div className="space-y-6">
            {[
              { title: "Compelling Job Adverts", desc: "Our AI job advert generator tool uses academic research and behavioural science to generate compelling job opportunity adverts" },
              { title: "Professional Brochures", desc: "Include company culture, testimonials, and case studies" },
              { title: "Employee Testimonials", desc: "Use authentic insights from existing team members to describe day-to-day roles and company culture" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-background">{item.title}</h4>
                  <p className="text-background/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
