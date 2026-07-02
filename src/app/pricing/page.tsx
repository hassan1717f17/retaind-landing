"use client";

import { useState } from "react";
import { Briefcase, Building2 } from "lucide-react";
import { BackButton } from "@/components/back-button";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";
import { cn } from "@/lib/utils";

type OrgType = "agency" | "inhouse";

const ORG_OPTIONS = [
  { key: "agency", label: "Agency Recruiter", Icon: Briefcase },
  { key: "inhouse", label: "In-House Team", Icon: Building2 },
] as const;

export default function PricingPage() {
  const [orgType, setOrgType] = useState<OrgType>("agency");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header band — back link + org-type toggle */}
      <section className="pt-10 pb-2">
        <div className="container mx-auto px-4">
          <BackButton />
        </div>
        <div className="container mx-auto px-4 mt-10 flex flex-col items-center gap-4">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Select your organisation type
          </p>
          <div
            className="inline-flex bg-background border border-border shadow-sm rounded-full p-1"
            data-testid="toggle-org-type"
            role="tablist"
          >
            {ORG_OPTIONS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setOrgType(key)}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all",
                  orgType === key
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                )}
                role="tab"
                aria-selected={orgType === key}
                data-testid={`button-org-${key}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing cards for the selected org type */}
      <Pricing selectedAudience={orgType} />

      <Footer selectedAudience={orgType} />
    </div>
  );
}
