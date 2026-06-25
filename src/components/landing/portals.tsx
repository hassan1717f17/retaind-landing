"use client";

import { Target, FileBarChart, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";

const portals = [
  {
    title: "Recruiter Portal",
    desc: "Manage campaigns, source candidates, and track placements",
    icon: <Target className="w-8 h-8 text-foreground" />,
  },
  {
    title: "Client Portal",
    desc: "Define benchmarks, review candidates, and track progress",
    icon: <FileBarChart className="w-8 h-8 text-foreground" />,
  },
  {
    title: "Candidate Portal",
    desc: "Complete assessments and video interviews",
    icon: <Video className="w-8 h-8 text-foreground" />,
  },
];

export function Portals() {
  return (
    <Section className="bg-background">
      <SectionHeader>
        <SectionBadge>Access</SectionBadge>
        <h2 className="text-4xl mb-6">Access Your Portal</h2>
        <p className="text-lg text-muted-foreground">
          Select your portal to access your personalized dashboard
        </p>
      </SectionHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portals.map((portal, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl bg-card border border-border shadow-lg hover-elevate text-center"
            data-testid={`card-portal-${idx}`}
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              {portal.icon}
            </div>
            <h3 className="text-xl font-bold mb-3" data-testid={`text-portal-title-${idx}`}>
              {portal.title}
            </h3>
            <p className="text-muted-foreground mb-8 text-sm">{portal.desc}</p>
            <Button className="w-full" variant="outline" data-testid={`button-portal-login-${idx}`}>
              Login
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
