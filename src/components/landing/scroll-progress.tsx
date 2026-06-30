"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, NO_REDUCED_MOTION } from "@/lib/gsap";

/**
 * Thin page-scroll progress bar pinned to the very top of the viewport
 * (above the fixed navbar). Scrubs its scaleX with overall scroll position.
 * Reduced-motion: stays empty/no-op (purely decorative, aria-hidden).
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      });
    },
    { scope: bar }
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div ref={bar} className="h-full w-full bg-foreground/80" />
    </div>
  );
}
