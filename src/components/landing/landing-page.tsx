"use client";

import { useRef, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { Hero } from "@/components/landing/hero";
import { FreeAccess } from "@/components/landing/free-access";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { AssessmentCta } from "@/components/landing/assessment-cta";
import { Journey } from "@/components/landing/journey";
import { SalesMarketing } from "@/components/landing/sales-marketing";
import { BadHires } from "@/components/landing/bad-hires";
import { SalesCollateral } from "@/components/landing/sales-collateral";
import { AiMaterials } from "@/components/landing/ai-materials";
import { Benchmarking } from "@/components/landing/benchmarking";
import { VideoInterviews } from "@/components/landing/video-interviews";
import { FairAssessment } from "@/components/landing/fair-assessment";
import { Integrations } from "@/components/landing/integrations";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { Portals } from "@/components/landing/portals";
import { Footer } from "@/components/landing/footer";
import { gsap, ScrollTrigger, useGSAP, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";
import type { Audience } from "@/components/landing/types";

export function LandingPage() {
  const [selectedAudience, setSelectedAudience] = useState<Audience>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const gatedRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!selectedAudience || !gatedRef.current) return;

      // Soft entrance so the newly-mounted block eases in rather than snapping.
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from(gatedRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.55,
          ease: EASE.out,
        });
      });

      // Newly-mounted (or swapped) sections changed document height/positions;
      // recompute all triggers on the next frame after layout settles.
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(id);
    },
    { dependencies: [selectedAudience] }
  );

  return (
    <main className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Page scroll-progress indicator */}
      <ScrollProgress />

      {/* Navbar — always visible */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedAudience={selectedAudience}
        onSelectAudience={setSelectedAudience}
      />

      {/* Hero — always visible */}
      <Hero
        selectedAudience={selectedAudience}
        onSelectAudience={setSelectedAudience}
      />

      {/* Scroll anchor for "features" nav links */}
      <div id="features" />

      {/* Free Access post-it — self-gates: only renders for agency */}
      <FreeAccess selectedAudience={selectedAudience} />

      {/* Mid-block: entire section only visible once an audience is selected */}
      {selectedAudience && (
        <div ref={gatedRef}>
          {/* Features grid — adapts content by audience, no self-gating */}
          <FeaturesGrid selectedAudience={selectedAudience} />

          {/* Assessment CTA — self-gates: agency variant or inhouse variant */}
          <AssessmentCta selectedAudience={selectedAudience} />

          {/* Journey — self-gates: three-phase for agency, two-stage for inhouse */}
          <Journey selectedAudience={selectedAudience} />

          {/* Sales & Marketing Engine — self-gates: agency only */}
          <SalesMarketing selectedAudience={selectedAudience} />

          {/* Cost of Bad Hires — self-gates: inhouse only */}
          <BadHires selectedAudience={selectedAudience} />

          {/* Sales Collateral carousel — self-gates: agency only */}
          <SalesCollateral selectedAudience={selectedAudience} />

          {/* AI-Generated Campaign Materials — always visible when audience selected */}
          <AiMaterials selectedAudience={selectedAudience} />

          {/* Behavioral Benchmarking — always visible when audience selected */}
          <Benchmarking selectedAudience={selectedAudience} />

          {/* AI-Powered Video Interviews — always visible when audience selected */}
          <VideoInterviews selectedAudience={selectedAudience} />

          {/* Fair & Unbiased Assessment — always visible when audience selected */}
          <FairAssessment selectedAudience={selectedAudience} />

          {/* CRM & ATS Integrations — always visible when audience selected */}
          <Integrations selectedAudience={selectedAudience} />

          {/* Pricing — self-gates: agency pricing or inhouse pricing */}
          <Pricing selectedAudience={selectedAudience} />

          {/* FAQ — adapts questions by audience, always visible when selected */}
          <Faq selectedAudience={selectedAudience} />

          {/* Portals — always visible when audience selected */}
          <Portals />
        </div>
      )}

      {/* Footer — always visible */}
      <Footer selectedAudience={selectedAudience} />
    </main>
  );
}
