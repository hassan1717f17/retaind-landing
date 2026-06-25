"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, FileBarChart, Globe } from "lucide-react";
import { Section, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function SalesMarketing({ selectedAudience }: { selectedAudience: Audience }) {
  const show = selectedAudience === "agency" || selectedAudience === null;

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="sales-marketing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section className="bg-background">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionBadge>Automation</SectionBadge>
                <h2 className="text-4xl font-bold mb-6" data-testid="text-section-marketing-title">Sales & Marketing Engine</h2>
                <p className="text-lg text-muted-foreground mb-8" data-testid="text-section-marketing-desc">
                  Deliver powerful marketing campaigns across email and LinkedIn. Present with precision and influence, and close retained deals with confidence.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "Email Campaigns", desc: "Deliver email marketing campaigns with personalised ICP Targeted content and A/B testing, to generate inbound enquiries from your ideal audience.", icon: <Mail className="w-5 h-5 text-foreground" /> },
                    { title: "LinkedIn Campaigns", desc: "Deliver LinkedIn marketing campaigns with personalised ICP Targeted content and A/B testing, to grow your ICP network and to generate inbound enquiries.", icon: <Linkedin className="w-5 h-5 text-foreground" /> },
                    { title: "Video", desc: "Use our video content to increase engagement and to improve marketing conversion.", icon: <FileBarChart className="w-5 h-5 text-foreground" /> },
                    { title: "Proposals", desc: "Generate proposals that ensure your demonstrations convert into paying customers.", icon: <Globe className="w-5 h-5 text-foreground" /> },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl hover-elevate" data-testid={`card-marketing-item-${idx}`}>
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-lg" data-testid={`text-marketing-title-${idx}`}>{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-muted rounded-3xl transform rotate-3 scale-95 opacity-50" />
                <img
                  src="/assets/Email_campaign_management_dashboard_1770377471614.jpg"
                  alt="Campaign management dashboard"
                  className="relative rounded-2xl shadow-2xl border border-border"
                  data-testid="img-marketing-dashboard"
                />
              </div>
            </div>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
