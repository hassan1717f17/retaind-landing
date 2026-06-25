"use client";
import { motion } from "framer-motion";
import { ClipboardCheck, ChevronRight, Clock, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function AssessmentCta({ selectedAudience }: { selectedAudience: Audience }) {
  return (
    <>
      {selectedAudience === "agency" && (
        <Section className="bg-foreground text-background">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 border border-background/20 text-sm font-medium text-background/70 mb-6">
                <ClipboardCheck className="w-4 h-4" />
                Recruiter Readiness Assessment Scorecard
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-assessment-headline">
                Are You Ready To Scale With Retaind
              </h2>
              <p className="text-xl md:text-2xl font-semibold text-background/70 mb-4" data-testid="text-assessment-subheader">
                Take your free 5 minute Assessment here
              </p>
              <p className="text-lg text-background/60 mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="text-assessment-description">
                Take our 5 minute assessment and generate a personalised readiness and strategy report and recommendations
              </p>
              <Link href="/agency-recruiter">
                <Button
                  size="lg"
                  className="rounded-full gap-2 bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                  data-testid="button-assessment-cta"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  Start Your Free Assessment
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-background/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  5 minutes to complete
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Personalised strategy report
                </span>
              </div>
            </motion.div>
          </div>
        </Section>
      )}

      {selectedAudience === "inhouse" && (
        <Section className="bg-foreground text-background">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background/10 border border-background/20 text-sm font-medium text-background/70 mb-6">
                <ClipboardCheck className="w-4 h-4" />
                Recruiting For Retention Assessment Tool
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-inhouse-assessment-headline">
                Are You Ready To Recruit For Retention?
              </h2>
              <p className="text-xl md:text-2xl font-semibold text-background/70 mb-4" data-testid="text-inhouse-assessment-subheader">
                Take your free 5 minute Assessment here
              </p>
              <p className="text-lg text-background/60 mb-10 max-w-2xl mx-auto leading-relaxed" data-testid="text-inhouse-assessment-description">
                Take our 5 minute assessment and generate a personalised readiness and strategy report and recommendations
              </p>
              <Link href="/in-house-hiring">
                <Button
                  size="lg"
                  className="rounded-full gap-2 bg-background text-foreground hover:bg-background/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
                  data-testid="button-inhouse-assessment-cta"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  Start Your Free Assessment
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-background/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  5 minutes to complete
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Personalised strategy report
                </span>
              </div>
            </motion.div>
          </div>
        </Section>
      )}
    </>
  );
}
