"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import { DemoVideoFrame } from "@/components/landing/product-demo";
import type { Audience } from "@/components/landing/types";

const AGENCY_DEMO_SRC =
  "https://player.vimeo.com/video/1206377853?title=0&byline=0&portrait=0";

export function AgencyDemo({ selectedAudience }: { selectedAudience: Audience }) {
  const show = selectedAudience === "agency";

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="agency-demo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section className="bg-muted/40">
            <SectionHeader>
              <SectionBadge>Agency Demo</SectionBadge>
              <h2 className="text-4xl font-bold mb-6" data-testid="text-agency-demo-title">
                See how agencies win with Retaind
              </h2>
              <p className="text-lg text-muted-foreground">
                A walkthrough built for agency recruiters — win more retained campaigns,
                deliver evidence-based shortlists, and build long-term client trust.
              </p>
            </SectionHeader>

            <div className="max-w-5xl mx-auto">
              <DemoVideoFrame
                src={AGENCY_DEMO_SRC}
                title="Retaind agency demo"
                testId="agency-demo-video"
              />
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
