"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, REVEAL, NO_REDUCED_MOTION } from "@/lib/gsap";

/**
 * Standardised "fade + rise on scroll into view" for a section.
 * Attach the returned ref to a wrapper; mark animated children with
 * `data-reveal`. Honours reduced-motion (no-op) and cleans up on unmount.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const targets = q("[data-reveal]");
      if (!targets.length) return;

      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.set(targets, { opacity: 0, y: REVEAL.y });
        ScrollTrigger.batch(targets, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: REVEAL.duration,
              ease: REVEAL.ease,
              stagger: REVEAL.stagger,
              overwrite: true,
            }),
        });
      });
    },
    { scope }
  );

  return scope;
}
