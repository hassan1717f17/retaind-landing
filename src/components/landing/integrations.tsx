"use client";

import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function Integrations({ selectedAudience }: { selectedAudience: Audience }) {
  return (
    <Section className="bg-background">
      <SectionHeader>
        <SectionBadge>Ecosystem</SectionBadge>
        <h2 className="text-4xl mb-6">Seamless CRM &amp; ATS Integration</h2>
        <p className="text-lg text-muted-foreground">
          Connect with your existing systems in minutes. No complex setup required.
        </p>
      </SectionHeader>

      <div className="flex flex-wrap justify-center gap-8 mb-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        {["Bullhorn", "Salesforce", "HubSpot", "Greenhouse", "Workday", "SAP", "Oracle", "Zoho"].map((name) => (
          <div key={name} className="px-6 py-3 rounded-lg border border-border bg-muted font-bold text-muted-foreground text-lg">
            {name}
          </div>
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80"
          alt="Integration Dashboard"
          className="rounded-2xl shadow-2xl border border-border"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 absolute -bottom-16 md:-bottom-12 left-4 right-4 md:left-12 md:right-12">
          {[
            { title: "Quick Setup", desc: "Connect in under 5 minutes with OAuth" },
            { title: "Real-time Sync", desc: "Bidirectional data flow keeps everything current" },
            { title: "Secure API", desc: "Enterprise-grade security with full encryption" },
          ].map((item, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl shadow-xl border border-border text-center">
              <h4 className="font-bold text-lg mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-20" />

      <p
        className="text-center text-muted-foreground italic mt-8 max-w-2xl mx-auto"
        data-testid="text-integration-strapline"
      >
        <span className="text-foreground">ret</span>
        <span className="text-foreground font-extrabold">AI</span>
        <span className="text-foreground">nd</span> is designed to operate autonomously. However, integrations to CRM and ATS systems are available to users under subscription.
      </p>
    </Section>
  );
}
