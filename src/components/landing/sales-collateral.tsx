"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionBadge } from "@/components/landing/section";
import { Button } from "@/components/ui/button";
import type { Audience } from "@/components/landing/types";

const pitchSlides = [
  "/assets/slide-01-Dgf1gO2D_1770377956305.png",
  "/assets/slide-02-0NoTvoI__1770377964205.png",
  "/assets/slide-03-DIDIfwar_1770377968920.png",
  "/assets/slide-04-DTz0hrNg_1770377974683.png",
  "/assets/slide-05-DdNF7ut1_1770377984235.png",
  "/assets/slide-06-DKE0pVIg_1770377995355.png",
];

export function SalesCollateral({ selectedAudience }: { selectedAudience: Audience }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const show = selectedAudience === "agency" || selectedAudience === null;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="sales-collateral"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section className="bg-muted">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionBadge>Sales Collateral</SectionBadge>
                <h2 className="text-4xl font-bold mb-6" data-testid="text-sales-collateral-title">
                  Pitch with Authority & Confidence
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Supporting sales collateral is designed to support an evidence-based pitch, following a tried and tested presentation framework and sales psychology and structure that converts meetings with prospective clients into paying customers.
                </p>
              </div>
              <div className="relative" data-testid="carousel-sales-collateral">
                <div className="overflow-hidden rounded-md shadow-xl border border-border">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {pitchSlides.map((slide, idx) => (
                      <img
                        key={idx}
                        src={slide}
                        alt={`Sales pitch slide ${idx + 1}`}
                        className="w-full flex-shrink-0"
                        data-testid={`img-slide-${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? pitchSlides.length - 1 : prev - 1))}
                  data-testid="button-slide-prev"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                  onClick={() => setCurrentSlide((prev) => (prev === pitchSlides.length - 1 ? 0 : prev + 1))}
                  data-testid="button-slide-next"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="flex justify-center gap-2 mt-4">
                  {pitchSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? "bg-foreground scale-125"
                          : "bg-muted-foreground/40"
                      }`}
                      data-testid={`button-dot-${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
