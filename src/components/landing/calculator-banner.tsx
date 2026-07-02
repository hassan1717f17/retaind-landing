"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrgType = "agency" | "inhouse";

const ORG_OPTIONS = [
  { key: "agency", label: "Agency Recruiter", Icon: Briefcase, href: "/assessment" },
  { key: "inhouse", label: "In-House Team", Icon: Building2, href: "/inhouse-assessment" },
] as const;

function EyebrowBadge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-background/80">
      {icon}
      {children}
    </span>
  );
}

export function CalculatorBanner() {
  const [slide, setSlide] = useState(0);
  const [org, setOrg] = useState<OrgType>("agency");
  const [paused, setPaused] = useState(false);
  const slideCount = 2;
  const assessmentHref =
    ORG_OPTIONS.find((o) => o.key === org)?.href ?? "/assessment";

  // Auto-advance on a loop; pause on hover so the slide-2 switch stays usable,
  // and skip entirely for reduced-motion users.
  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const id = setInterval(() => setSlide((p) => (p + 1) % slideCount), 7000);
    return () => clearInterval(id);
  }, [paused, slideCount]);

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* One fixed banner card; the two slides crossfade inside it */}
          <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-10 text-background shadow-2xl md:px-14 md:py-12">
            <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-background/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-background/5 blur-3xl" />

            <div className="relative grid">
              {/* Slide 1 — bad-hire calculator */}
              <div
                aria-hidden={slide !== 0}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-500",
                  slide === 0 ? "opacity-100" : "pointer-events-none opacity-0"
                )}
                data-testid="banner-slide-calculator"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                  <div className="flex-1">
                    <EyebrowBadge icon={<Calculator className="h-3.5 w-3.5" />}>
                      Free tool
                    </EyebrowBadge>
                    <h2 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                      What is a bad hire really costing you?
                    </h2>
                    <p className="max-w-2xl text-base leading-relaxed text-background/70 md:text-lg">
                      Most businesses underestimate their hiring costs by tens — if not
                      hundreds — of thousands each year. Use our free calculator to
                      uncover the true cost and see what evidence-led hiring could save you.
                    </p>
                  </div>
                  <div className="shrink-0">
                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="gap-2 rounded-full px-8 text-base font-semibold shadow-lg"
                      data-testid="button-banner-calculator"
                    >
                      <Link href="/bad-hire-calculator">
                        Calculate the cost
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Slide 2 — readiness assessment with org switch */}
              <div
                aria-hidden={slide !== 1}
                data-audience={org}
                className={cn(
                  "col-start-1 row-start-1 transition-opacity duration-500",
                  slide === 1 ? "opacity-100" : "pointer-events-none opacity-0"
                )}
                data-testid="banner-slide-assessment"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
                  <div className="flex-1">
                    <EyebrowBadge icon={<ClipboardCheck className="h-3.5 w-3.5" />}>
                      Free assessment
                    </EyebrowBadge>
                    <h2 className="mb-3 text-3xl font-bold leading-tight md:text-4xl">
                      How ready is your hiring?
                    </h2>
                    <p className="max-w-2xl text-base leading-relaxed text-background/70 md:text-lg">
                      Take our free readiness assessment for your role and get a
                      personalised, evidence-led report in minutes.
                    </p>
                  </div>

                  <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:min-w-[300px]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-background/50">
                      I&apos;m a…
                    </span>
                    <div
                      className="grid grid-cols-2 gap-1 rounded-full border border-background/10 bg-background/10 p-1"
                      role="tablist"
                      aria-label="Select your role"
                      data-testid="banner-org-switch"
                    >
                      {ORG_OPTIONS.map(({ key, label, Icon }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setOrg(key)}
                          role="tab"
                          aria-selected={org === key}
                          className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all",
                            org === key
                              ? "bg-audience text-audience-foreground shadow"
                              : "text-background/70 hover:text-background"
                          )}
                          data-testid={`banner-org-${key}`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {label}
                        </button>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="lg"
                      variant="secondary"
                      className="w-full gap-2 rounded-full text-base font-semibold shadow-lg"
                      data-testid="button-banner-assessment"
                    >
                      <Link href={assessmentHref}>
                        Start assessment
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls — below the banner so they never crowd the CTAs */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setSlide((p) => (p === 0 ? slideCount - 1 : p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
              aria-label="Previous slide"
              data-testid="banner-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: slideCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === slide ? "w-6 bg-foreground" : "w-2 bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                  data-testid={`banner-dot-${i}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSlide((p) => (p === slideCount - 1 ? 0 : p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
              aria-label="Next slide"
              data-testid="banner-next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
