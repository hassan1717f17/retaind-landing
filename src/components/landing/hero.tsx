"use client";

import { useRef } from "react";
import { ArrowRight, Briefcase, Building2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, DUR, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";
import type { Audience } from "./types";

interface HeroProps {
  selectedAudience: Audience;
  onSelectAudience: (a: Audience) => void;
}

const HEADLINE_LINES = [
  "Hiring the wrong person is expensive.",
  "Hiring the right person changes everything.",
];

export function Hero({ selectedAudience, onSelectAudience }: HeroProps) {
  const root = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(NO_REDUCED_MOTION, () => {
        const eyebrow = q('[data-hero="eyebrow"]');
        const words = q("[data-hero-word]");
        const rest = q('[data-hero="rest"]');
        const video = q('[data-hero="video"]');

        gsap.set(eyebrow, { opacity: 0, y: 12 });
        gsap.set(words, { opacity: 0, yPercent: 45 });
        gsap.set([rest, video], { opacity: 0, y: 30 });

        const tl = gsap.timeline({ defaults: { ease: EASE.out } });
        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.4 })
          .to(words, { opacity: 1, yPercent: 0, duration: 0.5, stagger: 0.035 }, "-=0.1")
          .to(rest, { opacity: 1, y: 0, duration: DUR.base }, "-=0.2")
          .to(video, { opacity: 1, y: 0, duration: DUR.slow }, "-=0.3");

        // Parallax: background drifts slower than scroll for depth.
        const bg = q('[data-hero="bg"]');
        gsap.to(bg, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // Signature moment: "Recruiting For Retention" expands as it scrolls in.
        const recruiting = q('[data-testid="text-recruiting-retention"]');
        gsap.fromTo(
          recruiting,
          { scale: 0.92, letterSpacing: "0em", opacity: 0.55 },
          {
            scale: 1,
            letterSpacing: "0.015em",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: recruiting,
              start: "top 90%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(/assets/image_1770373559578.png)` }}
        data-testid="img-hero-background"
        data-hero="bg"
      />
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Eyebrow */}
        <div
          className="flex justify-center mb-6"
          data-hero="eyebrow"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Hiring Intelligence
          </span>
        </div>

        {/* 1. Primary Headline (WHY-Led) — word-stagger reveal */}
        <h1
          className="text-4xl md:text-6xl font-bold text-foreground leading-[1.08] mb-[1.12rem]"
          data-testid="text-hero-title"
        >
          {HEADLINE_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => (
                <span
                  key={`${li}-${wi}`}
                  data-hero-word
                  className="inline-block will-change-transform"
                >
                  {word}&nbsp;
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div data-hero="rest">
          {/* Supporting Value Statement */}
          <p
            className="text-base md:text-lg text-foreground/80 max-w-4xl mx-auto mb-8 leading-relaxed"
            data-testid="text-hero-value"
          >
            Built around proven hiring-for-retention methodology,{" "}
            <span className="text-foreground font-semibold">Retaind</span>{" "}
            combines purpose-built AI agents,
            <br className="hidden md:inline" />
            behavioural evaluation, and structured workflows to turn a complex
            assessment process
            <br className="hidden md:inline" />
            into a clear, repeatable hiring advantage that any recruiter can
            easily adopt.
          </p>

          {/* Recruiting For Retention — title now sits on top of the video */}
          <p
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-center mb-10"
            data-testid="text-recruiting-retention"
          >
            Recruiting For Retention
          </p>
        </div>

        {/* Video Placeholder — moved up into the former image slot */}
        <div
          className="relative max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-border/50 bg-background"
          data-testid="video-placeholder"
          data-hero="video"
        >
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src="https://player.vimeo.com/video/1203546113?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Retained product overview"
              data-testid="hero-vimeo-player"
            />
          </div>
        </div>

        {/* Adoption & Risk-Reduction Statement — image sub-text, now below the video */}
        <div
          className="text-sm text-muted-foreground/70 max-w-2xl mx-auto mt-8"
          data-testid="text-hero-plugin"
        >
          <p className="mb-1">No system changes required.</p>
          <p>
            Works autonomously or seamlessly alongside your existing CRM or
            ATS as a smart plug-in.
          </p>
        </div>

        {/* Prompt that invites a choice */}
        <div className="max-w-4xl mx-auto mt-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Get started
          </p>
          <h3 className="mt-2 text-2xl md:text-3xl font-bold">
            Which best describes you?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Pick one to unlock a walkthrough tailored to how you hire.
          </p>
        </div>

        {/* Audience Segmentation Cards beneath video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8 mb-4">
          {/* Agency Card */}
          <motion.div
            animate={
              reduceMotion || selectedAudience === "agency"
                ? { y: 0 }
                : { y: [0, -8, 0] }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="will-change-transform"
          >
          <Card
            data-audience="agency"
            role="button"
            tabIndex={0}
            onClick={() => onSelectAudience("agency")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectAudience("agency");
              }
            }}
            className={cn(
              "group relative cursor-pointer overflow-hidden p-8 text-left shadow-lg transition-all duration-300",
              "hover:-translate-y-1.5 hover:shadow-2xl hover:border-audience",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-audience focus-visible:ring-offset-2",
              selectedAudience === "agency"
                ? "border-audience ring-2 ring-audience shadow-2xl -translate-y-1.5"
                : "border-border"
            )}
            data-testid="card-hero-agency"
          >
            {/* accent bar that sweeps in on hover / select */}
            <span
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-audience transition-transform duration-300",
                selectedAudience === "agency"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              )}
            />
            {/* soft corner glow */}
            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-audience/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-audience-soft text-audience flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Agency Recruiters</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Win more retained campaigns. Deliver stronger shortlists. Build
              long-term client trust.
            </p>
            <span
              className="flex w-full items-center justify-center gap-2 rounded-full bg-audience px-6 py-3 font-semibold text-audience-foreground shadow-lg shadow-audience/30 transition-transform duration-300 group-hover:scale-[1.02]"
              data-testid="button-hero-agency"
            >
              For Agency Recruiters
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Card>
          </motion.div>

          {/* In-House Card */}
          <motion.div
            animate={
              reduceMotion || selectedAudience === "inhouse"
                ? { y: 0 }
                : { y: [0, -8, 0] }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.9,
            }}
            className="will-change-transform"
          >
          <Card
            data-audience="inhouse"
            role="button"
            tabIndex={0}
            onClick={() => onSelectAudience("inhouse")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectAudience("inhouse");
              }
            }}
            className={cn(
              "group relative cursor-pointer overflow-hidden p-8 text-left shadow-lg transition-all duration-300",
              "hover:-translate-y-1.5 hover:shadow-2xl hover:border-audience",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-audience focus-visible:ring-offset-2",
              selectedAudience === "inhouse"
                ? "border-audience ring-2 ring-audience shadow-2xl -translate-y-1.5"
                : "border-border"
            )}
            data-testid="card-hero-inhouse"
          >
            {/* accent bar that sweeps in on hover / select */}
            <span
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-1 origin-left bg-audience transition-transform duration-300",
                selectedAudience === "inhouse"
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              )}
            />
            {/* soft corner glow */}
            <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-audience/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-audience-soft text-audience flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">In-House Recruitment Teams</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Make better hiring decisions with evidence, not instinct - and
              reduce the risk of costly mis-hires.
            </p>
            <span
              className="flex w-full items-center justify-center gap-2 rounded-full bg-audience px-6 py-3 font-semibold text-audience-foreground shadow-lg shadow-audience/30 transition-transform duration-300 group-hover:scale-[1.02]"
              data-testid="button-hero-inhouse"
            >
              For In-House Teams
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
