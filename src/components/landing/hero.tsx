"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Audience } from "./types";

interface HeroProps {
  selectedAudience: Audience;
  onSelectAudience: (a: Audience) => void;
}

export function Hero({ selectedAudience, onSelectAudience }: HeroProps) {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(/assets/image_1770373559578.png)` }}
        data-testid="img-hero-background"
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 1. Primary Headline (WHY-Led) */}
          <h1
            className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-[1.12rem]"
            data-testid="text-hero-title"
          >
            Hiring the wrong person is expensive.
            <br />
            <span className="text-foreground">
              Hiring the right person changes everything.
            </span>
          </h1>

          {/* 2. Sub-Headline (Outcome-Focused) — post-it image */}
          <div
            className="flex justify-center mb-[1.96rem] max-w-5xl mx-auto"
            data-testid="img-hero-postit"
          >
            <img
              src="/assets/image_1773080881842.png"
              alt="Reduce mis-hire risk by 80%, Improve early ROI &amp; performance, Hire the best talent"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          {/* Supporting Value Statement */}
          <p
            className="text-base md:text-lg text-foreground/80 max-w-4xl mx-auto mb-8 leading-relaxed"
            data-testid="text-hero-value"
          >
            Built around proven hiring-for-retention methodology,{" "}
            <span className="text-foreground font-semibold">ret</span>
            <span className="text-foreground font-extrabold">AI</span>
            <span className="text-foreground font-semibold">nd.ai</span>{" "}
            combines purpose-built AI agents,
            <br className="hidden md:inline" />
            behavioural evaluation, and structured workflows to turn a complex
            assessment process
            <br className="hidden md:inline" />
            into a clear, repeatable hiring advantage that any recruiter can
            easily adopt.
          </p>

          {/* 3. Audience Segmentation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
            {/* Agency Card */}
            <Card className="p-8 text-left" data-testid="card-hero-agency">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-bold">Agency Recruiters</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Win more retained campaigns. Deliver stronger shortlists. Build
                long-term client trust.
              </p>
              <Button
                size="lg"
                variant="default"
                className="w-full rounded-full"
                onClick={() => {
                  onSelectAudience("agency");
                  scrollToFeatures();
                }}
                data-testid="button-hero-agency"
              >
                For Agency Recruiters
              </Button>
            </Card>

            {/* In-House Card */}
            <Card className="p-8 text-left" data-testid="card-hero-inhouse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-bold">In-House Recruitment Teams</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Make better hiring decisions with evidence, not instinct - and
                reduce the risk of costly mis-hires.
              </p>
              <Button
                size="lg"
                variant="default"
                className="w-full rounded-full"
                onClick={() => {
                  onSelectAudience("inhouse");
                  scrollToFeatures();
                }}
                data-testid="button-hero-inhouse"
              >
                For In-House Teams
              </Button>
            </Card>
          </div>

          {/* 5. Adoption & Risk-Reduction Statement */}
          <div
            className="text-sm text-muted-foreground/70 max-w-2xl mx-auto mb-16"
            data-testid="text-hero-plugin"
          >
            <p className="mb-1">No system changes required.</p>
            <p>
              Works autonomously or seamlessly alongside your existing CRM or
              ATS as a smart plug-in.
            </p>
          </div>

          {/* Recruiting For Retention */}
          <p
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center mb-16"
            data-testid="text-recruiting-retention"
          >
            Recruiting For Retention
          </p>
        </motion.div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-border/50 bg-background"
          data-testid="video-placeholder"
        >
          <div className="relative">
            <img
              src="/assets/download_1770376003675.png"
              alt="End-to-end recruitment workflow"
              className="w-full h-auto object-cover"
              data-testid="img-hero-dashboard"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full bg-background/90 shadow-lg flex items-center justify-center"
                data-testid="button-play-video"
              >
                {/* Play triangle — monochrome (foreground glyph, not red) */}
                <div className="w-0 h-0 border-l-[20px] border-l-foreground border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second Audience Segmentation beneath video */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto mt-12 mb-4">
          <Button
            size="lg"
            variant={selectedAudience === "agency" ? "default" : "outline"}
            onClick={() => {
              onSelectAudience("agency");
              scrollToFeatures();
            }}
            className="rounded-full gap-2"
            data-testid="button-audience-agency"
          >
            <Briefcase className="w-5 h-5" />
            Agency Recruiter
          </Button>
          <Button
            size="lg"
            variant={selectedAudience === "inhouse" ? "default" : "outline"}
            onClick={() => {
              onSelectAudience("inhouse");
              scrollToFeatures();
            }}
            className="rounded-full gap-2"
            data-testid="button-audience-inhouse"
          >
            <Building2 className="w-5 h-5" />
            In-House Team
          </Button>
        </div>
      </div>
    </section>
  );
}
