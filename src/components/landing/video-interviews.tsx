"use client";

import { Section, SectionBadge } from "@/components/landing/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Audience } from "@/components/landing/types";
import { useReveal } from "@/components/landing/use-reveal";

export function VideoInterviews({ selectedAudience }: { selectedAudience: Audience }) {
  const scope = useReveal();
  return (
    <Section className="bg-muted">
      <div className="grid lg:grid-cols-2 gap-16 items-center" ref={scope}>
        <div data-reveal className="order-2 lg:order-1 relative">
          <div className="absolute inset-0 bg-foreground rounded-3xl transform -rotate-2 scale-95 opacity-10" />
          <img
            src="/assets/Robot_avatar_and_interviewee_1769676085920.jpg"
            alt="AI Avatar Interview"
            className="relative rounded-2xl shadow-2xl border border-border"
          />
        </div>
        <div data-reveal className="order-1 lg:order-2">
          <SectionBadge>Interviewing</SectionBadge>
          <h2 className="text-4xl font-bold mb-6">AI-Powered Video Interviews</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose how you deliver your competency-based interviews with either text, in-person video calls, or AI avatars. Let our AI Psychometric Agent analyse responses automatically, and generate comprehensive assessment reports.
          </p>

          <div className="grid gap-6">
            {[
              { title: "AI-Generated Questions", desc: "System creates behavioural and competency-based questions directly aligned to identified benchmark correlations and potential areas of conflict." },
              { title: "Avatar Delivery", desc: "Professional AI avatars deliver questions naturally, creating a consistent interview experience." },
              { title: "Automated Analysis", desc: "AI assesses responses, extracts insights, and generates detailed reports for recruiters." }
            ].map((item, idx) => (
              <Card key={idx} className="border-none shadow-sm hover-elevate" data-testid={`card-interview-feature-${idx}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg" data-testid={`text-interview-title-${idx}`}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
