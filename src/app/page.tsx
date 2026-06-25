"use client";

import { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
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
    </main>
  );
}
