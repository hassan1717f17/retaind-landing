"use client";

import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CalculatorBanner() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div
          className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 py-12 md:px-14 md:py-14 shadow-2xl"
          data-testid="banner-bad-hire-calculator"
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full bg-background/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-background/5 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-background/80 mb-5">
                <Calculator className="w-3.5 h-3.5" />
                Free tool
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                What is a bad hire really costing you?
              </h2>
              <p className="text-base md:text-lg text-background/70 max-w-2xl leading-relaxed">
                Most businesses underestimate their hiring costs by tens — if not
                hundreds — of thousands each year. Use our free calculator to uncover
                the true cost and see what evidence-led hiring could save you.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full text-base font-semibold px-8 shadow-lg gap-2"
                data-testid="button-banner-calculator"
              >
                <Link href="/bad-hire-calculator">
                  Calculate the cost
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
