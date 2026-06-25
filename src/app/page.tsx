"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { FreeAccess } from "@/components/landing/free-access";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { AssessmentCta } from "@/components/landing/assessment-cta";
import { Journey } from "@/components/landing/journey";
import type { Audience } from "@/components/landing/types";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<Audience>(null);

  return (
    <main className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        selectedAudience={selectedAudience}
        onSelectAudience={setSelectedAudience}
      />
      <Hero
        selectedAudience={selectedAudience}
        onSelectAudience={setSelectedAudience}
      />
      <FreeAccess selectedAudience={selectedAudience} />
      <Journey selectedAudience={selectedAudience} />
      {selectedAudience && (
        <>
          <FeaturesGrid selectedAudience={selectedAudience} />
          <AssessmentCta selectedAudience={selectedAudience} />
        </>
      )}
    </main>
  );
}
