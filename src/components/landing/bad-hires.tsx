"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";
import { useCountUp } from "@/components/landing/use-count-up";

const badHireSlides = [
  {
    src: "/assets/bad-hires-dashboard.jpg",
    alt: "Retaind hiring intelligence dashboard — candidate vs benchmark",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop&q=80",
    alt: "Hiring analytics dashboard",
  },
];

function Stat({ count, suffix }: { count: number; suffix: string }) {
  const ref = useCountUp();
  return <span ref={ref} data-count-to={count} data-count-suffix={suffix}>{count}{suffix}</span>;
}

function StatInline() {
  const ref = useCountUp();
  return <span ref={ref} data-count-to={80} data-count-suffix="%">80%</span>;
}

export function BadHires({ selectedAudience }: { selectedAudience: Audience }) {
  const show = selectedAudience === "inhouse";
  const [slide, setSlide] = useState(0);
  const slideCount = badHireSlides.length;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="bad-hires"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section className="bg-background">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionBadge>The Problem</SectionBadge>
                <h2 className="text-4xl font-bold mb-6" data-testid="text-section-bad-hires-title">The Cost of Bad Hires</h2>
                <p className="text-lg text-muted-foreground mb-8" data-testid="text-section-bad-hires-desc">
                  <StatInline /> of employees who leave in their first year cite behavioral and cultural misalignment as the primary reason.
                </p>

                <div className="space-y-6 mb-8">
                  {[
                    { count: 3, suffix: "x", unit: "Salary", desc: "Average cost of a bad hire including recruitment, training, and lost productivity" },
                    { count: 6, suffix: "", unit: "Months", desc: "Time wasted before a poor hire typically leaves or is let go" },
                    { count: null, suffix: "", unit: "Team Impact", desc: "Morale and productivity suffer when cultural fit is wrong" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-muted border" data-testid={`card-bad-hire-item-${idx}`}>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-foreground" data-testid={`text-bad-hire-title-${idx}`}>
                          {item.count !== null ? <Stat count={item.count} suffix={item.suffix} /> : null}
                          {item.count !== null ? " " : ""}{item.unit}
                        </h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative overflow-hidden rounded-xl p-[1.5px] bg-emerald-950" data-testid="card-solution-callout">
                  {/* dark-green border with a shine that travels a full circular path */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-[-100%]"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, transparent 250deg, #059669 305deg, #6ee7b7 335deg, #059669 350deg, transparent 360deg)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative rounded-[10px] bg-secondary p-6 pr-52">
                    <h4 className="font-bold text-lg text-foreground mb-2" data-testid="text-solution-title">The Retaind Solution</h4>
                    <p className="text-muted-foreground text-sm" data-testid="text-solution-desc">
                      Behavioral benchmarking aligns stakeholders before you hire. Candidate assessments reveal fit and conflict areas before you commit.
                    </p>

                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                        transition={{
                          opacity: { duration: 0.4, delay: 0.3 },
                          scale: { duration: 0.4, delay: 0.3 },
                          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="/bad-hire-calculator"
                          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
                          data-testid="button-bad-hire-calculator-float"
                        >
                          <Calculator className="w-4 h-4" />
                          Calculate your cost
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative" data-testid="carousel-bad-hires">
                <div className="overflow-hidden rounded-2xl shadow-2xl border border-border">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${slide * 100}%)` }}
                  >
                    {badHireSlides.map((s, i) => (
                      <img
                        key={i}
                        src={s.src}
                        alt={s.alt}
                        className="w-full flex-shrink-0 aspect-video object-cover"
                        data-testid={`img-bad-hires-slide-${i}`}
                      />
                    ))}
                  </div>
                </div>
                {slideCount > 1 && (
                  <>
                    <button
                      onClick={() => setSlide((p) => (p === 0 ? slideCount - 1 : p - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background"
                      aria-label="Previous"
                      data-testid="button-bad-hires-prev"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSlide((p) => (p === slideCount - 1 ? 0 : p + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 shadow-md transition-colors hover:bg-background"
                      aria-label="Next"
                      data-testid="button-bad-hires-next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="mt-4 flex justify-center gap-2">
                      {badHireSlides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlide(i)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            i === slide ? "scale-125 bg-foreground" : "bg-muted-foreground/40"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                          data-testid={`button-bad-hires-dot-${i}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
