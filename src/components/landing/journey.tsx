"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ClipboardCheck, Check } from "lucide-react";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function Journey({ selectedAudience }: { selectedAudience: Audience }) {
  return (
    <>
      {/* Three-Phase Journey - Agency Focus */}
      <AnimatePresence mode="wait">
        {(selectedAudience === "agency" || selectedAudience === null) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Section id="journey" className="bg-muted">
              <SectionHeader>
                <SectionBadge>Process</SectionBadge>
                <h2 className="text-4xl md:text-5xl mb-6">Three-Phase Journey</h2>
                <p className="text-lg text-muted-foreground">
                  A complete workflow from first contact to final placement
                </p>
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border z-0" />

                {[
                  {
                    step: "01",
                    title: "Lead Generation",
                    desc: "Generate qualified leads with intelligent marketing automation across Email and LinkedIn.",
                    points: ["Client prospecting", "Business case presentation", "Retained placement pitch", "Generate proposals that close deals"]
                  },
                  {
                    step: "02",
                    title: "Campaign Creation",
                    desc: "Upload job-spec and let our AI Agent generate compelling job adverts that attract top talent.",
                    points: ["Compelling copy creation", "Campaign brochure design", "Job advert posting", "Talent attraction"]
                  },
                  {
                    step: "03",
                    title: "Applicant Assessment",
                    desc: "Automate benchmarking, interviews, and reporting with AI-powered insights and intelligent video profiling.",
                    points: ["Automated benchmarking", "AI-powered interviews", "Intelligent video profiling", "Detailed reporting, assessment and analysis"]
                  }
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    className="relative z-10 bg-card p-8 rounded-2xl shadow-sm border border-border hover-elevate"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    data-testid={`card-phase-${idx}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mb-6 shadow-lg">
                      {phase.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                    <p className="text-muted-foreground mb-6 min-h-[5rem]">{phase.desc}</p>
                    <ul className="space-y-3">
                      {phase.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-3 text-sm font-medium text-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-House Journey */}
      <AnimatePresence mode="wait">
        {selectedAudience === "inhouse" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Section id="journey" className="bg-muted">
              <SectionHeader>
                <SectionBadge>Process</SectionBadge>
                <h2 className="text-4xl md:text-5xl mb-6">Two-Stage Hiring Process</h2>
                <p className="text-lg text-muted-foreground">
                  Streamlined workflow focused on finding and assessing the right talent
                </p>
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  {
                    step: "01",
                    title: "Campaign Creation",
                    desc: "Upload job specs and let our AI Agent generate compelling adverts. Create branded campaign brochures, post to multiple job boards, and establish behavioral benchmarks with stakeholder alignment.",
                    icon: <FileText className="w-8 h-8" />,
                    features: ["AI job advert generation", "Multi-platform job posting", "Campaign brochure creation", "Behavioral benchmarking"]
                  },
                  {
                    step: "02",
                    title: "Applicant Assessments",
                    desc: "Candidates complete behavioral questionnaires matched against your benchmarks. AI-powered video interviews with competency-based questions and automated analysis for shortlisting.",
                    icon: <ClipboardCheck className="w-8 h-8" />,
                    features: ["Candidate questionnaires", "Fit scoring & risk indicators", "AI video interviews", "Automated shortlisting"]
                  }
                ].map((phase, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-card p-8 rounded-2xl shadow-sm border border-border hover-elevate"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    data-testid={`card-inhouse-phase-${idx}`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        {phase.icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-muted-foreground mb-1">Stage {phase.step}</div>
                        <h3 className="text-xl font-bold" data-testid={`text-inhouse-phase-title-${idx}`}>{phase.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{phase.desc}</p>
                    <ul className="space-y-2">
                      {phase.features.map((feature, fidx) => (
                        <li key={fidx} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-foreground" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </Section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
