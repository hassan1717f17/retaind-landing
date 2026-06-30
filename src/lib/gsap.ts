import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins exactly once for the whole app. Registering useGSAP with
// gsap silences its "missing plugin" warning and enables its internal context.
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media query gating all motion. Reduced-motion users get a no-op. */
export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/** Durations (seconds) — mirror the CSS --motion-* tokens roughly. */
export const DUR = { fast: 0.25, base: 0.6, slow: 0.9 } as const;

export const EASE = { out: "power2.out", inOut: "power2.inOut" } as const;

/** Shared defaults for the standard "fade + rise" reveal. */
export const REVEAL = {
  y: 24,
  duration: DUR.base,
  ease: EASE.out,
  stagger: 0.12,
} as const;

export { gsap, ScrollTrigger, useGSAP };
