"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";
import { useCountUp } from "@/components/landing/use-count-up";

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

                <div className="p-6 rounded-xl bg-secondary border" data-testid="card-solution-callout">
                  <h4 className="font-bold text-lg text-foreground mb-2" data-testid="text-solution-title">The ret<span className="font-extrabold">AI</span>nd Solution</h4>
                  <p className="text-muted-foreground text-sm" data-testid="text-solution-desc">
                    Behavioral benchmarking aligns stakeholders before you hire. Candidate assessments reveal fit and conflict areas before you commit.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
                  alt="Hiring Analytics Dashboard"
                  className="rounded-2xl shadow-2xl border border-border"
                  data-testid="img-hiring-analytics"
                />
              </div>
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
