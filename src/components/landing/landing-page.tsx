"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { ScrollProgress } from "@/components/landing/scroll-progress";
import { Hero } from "@/components/landing/hero";
import { ProductDemo } from "@/components/landing/product-demo";
import { FreeAccess } from "@/components/landing/free-access";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { AssessmentCta } from "@/components/landing/assessment-cta";
import { Journey } from "@/components/landing/journey";
import { SalesMarketing } from "@/components/landing/sales-marketing";
import { AgencyDemo } from "@/components/landing/agency-demo";
import { BadHires } from "@/components/landing/bad-hires";
import { SalesCollateral } from "@/components/landing/sales-collateral";
import { AiMaterials } from "@/components/landing/ai-materials";
import { Benchmarking } from "@/components/landing/benchmarking";
import { VideoInterviews } from "@/components/landing/video-interviews";
import { FairAssessment } from "@/components/landing/fair-assessment";
import { Integrations } from "@/components/landing/integrations";
import { Faq } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";
import { gsap, ScrollTrigger, useGSAP, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";
import type { Audience } from "@/components/landing/types";

export function LandingPage() {
  const [selectedAudience, setSelectedAudience] = useState<Audience>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const gatedRef = useRef<HTMLDivElement>(null);
  // Set when the user *chooses* an audience (cards / org toggle) so the effect
  // below scrolls to the first section — but not when a nav link just ensures
  // an audience exists so its own anchor scroll can run.
  const pendingScrollRef = useRef(false);

  const chooseAudience = useCallback((a: Audience) => {
    pendingScrollRef.current = true;
    setSelectedAudience(a);
  }, []);

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

  // After an explicit audience choice, once the gated block has mounted and
  // laid out, smooth-scroll to the first section so the choice has an obvious
  // effect. Deferred by two frames so #features is measured at its final
  // position (not its pre-mount position).
  useEffect(() => {
    if (!selectedAudience || !pendingScrollRef.current) return;
    pendingScrollRef.current = false;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => {
        document
          .getElementById("features")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [selectedAudience]);

  return (
    <main className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Page scroll-progress indicator */}
      <ScrollProgress />

      {/* Navbar — always visible */}
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedAudience={selectedAudience}
        onSelectAudience={chooseAudience}
        onEnsureAudience={setSelectedAudience}
      />

      {/* Hero — always visible */}
      <Hero
        selectedAudience={selectedAudience}
        onSelectAudience={chooseAudience}
      />

      {/* Product demo — always visible so every visitor sees the app in action */}
      <ProductDemo />

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

          {/* Agency product demo — self-gates: agency only */}
          <AgencyDemo selectedAudience={selectedAudience} />

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

          {/* FAQ — adapts questions by audience, always visible when selected */}
          <Faq selectedAudience={selectedAudience} />
        </div>
      )}

      {/* Footer — always visible */}
      <Footer selectedAudience={selectedAudience} />
    </main>
  );
}
