"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

interface Props {
  selectedAudience: Audience;
}

type AgencyTab = "retaind" | "marketing";
type BillingPeriod = "monthly" | "annual";

const agencyRetaindPlans = [
  {
    name: "PAYG Model",
    price: "£295",
    period: "per campaign",
    features: [
      "Free account set up",
      "Access to sales & Marketing Assets",
      "AI Job Advert Generation",
      "Multi-Platform Posting tool",
      "Client Behavioural Benchmarking Tool",
      "Candidate Questionnaires & Assessment",
      "Fit Scoring & Analysis",
      "AI Video Interviews",
      "Access to online training and coaching",
    ],
    subscription: false,
  },
  {
    name: "Annual Subscription",
    monthlyPrice: "£295",
    annualPrice: "£2,995",
    monthlyPeriod: "p/m",
    annualPeriod: "p/a",
    subscription: true,
    features: [
      "White label service",
      "All PAYG features included",
      "Up to 12 campaign Credits p/a",
      "£295 PAYG for additional credits",
      "CRM/ATS Integration",
      "Access to Training and coaching workshops",
      "1 X Free LinkedIn Automation tool (worth £99 p/m)",
    ],
  },
  {
    name: "Annual Team Subscription",
    monthlyPrice: "£995",
    annualPrice: "£9,995",
    monthlyPeriod: "p/m",
    annualPeriod: "p/a",
    subscription: true,
    features: [
      "White label service",
      "All PAYG features included",
      "Up to 60 retaind campaigns p/a",
      "£200 PAYG for additional credits",
      "CRM/ATS Integration",
      "Access to Training and coaching workshops",
      "3 X Free LinkedIn Automation tool licenses (worth £297 p/m)",
      "Dedicated Account Manager",
    ],
  },
];

const agencyMarketingPlans = [
  {
    name: "LinkedIn Only",
    price: "£250",
    period: "per campaign",
    highlight: undefined as string | undefined,
    features: [
      "LinkedIn Marketing Automations",
      "Targeted Connection building & Nurturing campaigns",
      "Content creation & Posting Tool",
      "Full set-up and DFY management",
    ],
  },
  {
    name: "Email Only",
    price: "£495",
    period: "p/m",
    highlight: undefined as string | undefined,
    features: [
      "Email delivery set up and DFY Management",
      "Campaign and asset creation",
      "Data acquisition and ICP targeting",
      "Lead Nurturing",
      "Access to Training and coaching",
    ],
  },
  {
    name: "Multi-Channel",
    price: "£695",
    period: "p/m",
    highlight: undefined as string | undefined,
    features: [
      "All LinkedIn and Email features",
      "Multi-Channel Marketing and Tracking",
      "Run segmented marketing campaigns",
    ],
  },
];

const inhousePlans = [
  {
    name: "PAYG Model",
    price: "£295",
    period: "per campaign",
    subscription: false,
    features: [
      "AI Job Advert Generation",
      "Multi-Platform Posting",
      "Behavioral Benchmarking",
      "Candidate Questionnaires",
      "Fit Scoring & Analysis",
      "AI Video Interviews",
      "Email Support",
    ],
  },
  {
    name: "Annual Subscription",
    monthlyPrice: "£295",
    annualPrice: "£2,995",
    monthlyPeriod: "p/m",
    annualPeriod: "p/a",
    subscription: true,
    features: [
      "White label service",
      "All PAYG features included",
      "Up to 12 campaign Credits p/a",
      "£295 PAYG for additional credits",
      "CRM/ATS Integration",
      "Access to Training and coaching workshops",
    ],
  },
  {
    name: "Annual Team Subscription",
    monthlyPrice: "£995",
    annualPrice: "£9,995",
    monthlyPeriod: "p/m",
    annualPeriod: "p/a",
    subscription: true,
    features: [
      "White label service",
      "All PAYG features included",
      "Up to 60 retaind campaigns p/a",
      "£200 PAYG for additional credits",
      "CRM/ATS Integration",
      "Access to Training and coaching workshops",
      "Dedicated Account Manager",
    ],
  },
];

export function Pricing({ selectedAudience }: Props) {
  const [agencyPricingTab, setAgencyPricingTab] = useState<AgencyTab>("retaind");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  return (
    <AnimatePresence mode="wait">
      {(selectedAudience === "agency" || selectedAudience === null) && (
        <motion.div
          key="agency-pricing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section id="pricing" className="bg-foreground text-background">
            <SectionHeader className="text-background">
              <SectionBadge>Pricing</SectionBadge>
              <h2 className="text-4xl mb-6 text-background">Flexible Pricing Options</h2>
              <p className="text-lg text-background/70">
                Choose the services that fit your recruitment needs
              </p>
            </SectionHeader>

            {/* Pricing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex bg-background/10 rounded-full p-1" data-testid="toggle-pricing-type">
                <button
                  onClick={() => setAgencyPricingTab("retaind")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    agencyPricingTab === "retaind"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-background"
                  }`}
                  data-testid="button-pricing-retaind"
                >
                  Retaind
                </button>
                <button
                  onClick={() => setAgencyPricingTab("marketing")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    agencyPricingTab === "marketing"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-background"
                  }`}
                  data-testid="button-pricing-marketing"
                >
                  Marketing Options
                </button>
              </div>
            </div>

            {/* Retaind Pricing */}
            {agencyPricingTab === "retaind" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {agencyRetaindPlans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-8 rounded-2xl border ${
                      plan.subscription
                        ? "bg-secondary text-card-foreground ring-2 ring-primary transform scale-105"
                        : "bg-card text-card-foreground"
                    }`}
                    data-testid={`card-pricing-retaind-${idx}`}
                  >
                    {plan.subscription && (
                      <div className="flex justify-center mb-4 -mt-2">
                        <div className="inline-flex bg-background/10 rounded-full p-0.5" data-testid="toggle-billing-agency">
                          <button
                            onClick={() => setBillingPeriod("monthly")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              billingPeriod === "monthly"
                                ? "bg-background text-foreground shadow"
                                : "text-background/70"
                            }`}
                            data-testid="button-billing-monthly"
                          >
                            Monthly
                          </button>
                          <button
                            onClick={() => setBillingPeriod("annual")}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                              billingPeriod === "annual"
                                ? "bg-background text-foreground shadow"
                                : "text-background/70"
                            }`}
                            data-testid="button-billing-annual"
                          >
                            Annual
                          </button>
                        </div>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold">
                        {plan.subscription
                          ? billingPeriod === "annual"
                            ? plan.annualPrice
                            : plan.monthlyPrice
                          : plan.price}
                      </span>
                      <span className="text-background/70">
                        /{plan.subscription
                          ? billingPeriod === "annual"
                            ? plan.annualPeriod
                            : plan.monthlyPeriod
                          : plan.period}{" "}
                        + VAT
                      </span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 mt-1 shrink-0 text-foreground opacity-70" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.subscription ? "secondary" : "ghost"}
                      className="w-full"
                      data-testid={`button-pricing-retaind-${idx}`}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Marketing Pricing */}
            {agencyPricingTab === "marketing" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {agencyMarketingPlans.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative p-8 rounded-2xl border ${
                      plan.highlight
                        ? "bg-secondary text-card-foreground ring-2 ring-primary transform scale-105"
                        : "bg-card text-card-foreground"
                    }`}
                    data-testid={`card-pricing-marketing-${idx}`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-foreground px-4 py-1 rounded-full text-xs font-bold tracking-wide">
                        {plan.highlight}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-background/70">/{plan.period} + VAT</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <Check className="w-4 h-4 mt-1 shrink-0 text-foreground opacity-70" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.highlight ? "secondary" : "ghost"}
                      className="w-full"
                      data-testid={`button-pricing-marketing-${idx}`}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            <p className="text-center text-background/60 italic mt-12" data-testid="text-custom-packages-agency">
              Need something different? Contact us for custom packages
            </p>
          </Section>
        </motion.div>
      )}

      {selectedAudience === "inhouse" && (
        <motion.div
          key="inhouse-pricing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Section id="pricing" className="bg-foreground text-background">
            <SectionHeader className="text-background">
              <SectionBadge>Pricing</SectionBadge>
              <h2 className="text-4xl mb-6 text-background">Simple, Transparent Pricing</h2>
              <p className="text-lg text-background/70">
                Pay only for the campaigns you run. No hidden fees.
              </p>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {inhousePlans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative p-8 rounded-2xl border ${
                    plan.subscription
                      ? "bg-secondary text-card-foreground ring-2 ring-primary transform scale-105"
                      : "bg-card text-card-foreground"
                  }`}
                >
                  {plan.subscription && (
                    <div className="flex justify-center mb-4 -mt-2">
                      <div className="inline-flex bg-background/10 rounded-full p-0.5" data-testid="toggle-billing-inhouse">
                        <button
                          onClick={() => setBillingPeriod("monthly")}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            billingPeriod === "monthly"
                              ? "bg-background text-foreground shadow"
                              : "text-background/70"
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBillingPeriod("annual")}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            billingPeriod === "annual"
                              ? "bg-background text-foreground shadow"
                              : "text-background/70"
                          }`}
                        >
                          Annual
                        </button>
                      </div>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold">
                      {plan.subscription
                        ? billingPeriod === "annual"
                          ? plan.annualPrice
                          : plan.monthlyPrice
                        : plan.price}
                    </span>
                    <span className="text-background/70">
                      /{plan.subscription
                        ? billingPeriod === "annual"
                          ? plan.annualPeriod
                          : plan.monthlyPeriod
                        : plan.period}{" "}
                      + VAT
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-1 shrink-0 text-foreground opacity-70" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.subscription ? "secondary" : "ghost"}
                    className="w-full"
                    data-testid={`button-pricing-inhouse-${idx}`}
                  >
                    Get Started
                  </Button>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-background/60 italic mt-12" data-testid="text-custom-packages-inhouse">
              Need something different? Contact us for custom packages
            </p>
          </Section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
