"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, NO_REDUCED_MOTION } from "@/lib/gsap";

export function formatStat(
  value: number,
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string }
): string {
  return `${prefix}${Math.round(value)}${suffix}`;
}

/**
 * Counts a number from 0 to its target when scrolled into view.
 * Attach to a <span data-count-to="80" data-count-prefix="£" data-count-suffix="%">.
 * Reduced-motion: the final value is written immediately.
 */
export function useCountUp() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const target = Number(el.dataset.countTo ?? "0");
      const prefix = el.dataset.countPrefix ?? "";
      const suffix = el.dataset.countSuffix ?? "";

      const write = (v: number) => {
        el.textContent = formatStat(v, { prefix, suffix });
      };

      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const counter = { v: 0 };
        write(0);
        gsap.to(counter, {
          v: target,
          duration: 1.4,
          ease: EASE.out,
          onUpdate: () => write(counter.v),
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      // Reduced-motion branch (no matchMedia match): show final value.
      mm.add("(prefers-reduced-motion: reduce)", () => write(target));
    },
    { scope: ref }
  );

  return ref;
}
