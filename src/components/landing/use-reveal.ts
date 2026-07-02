"use client";

import { useRef } from "react";
import { gsap, useGSAP, REVEAL, NO_REDUCED_MOTION } from "@/lib/gsap";

/**
 * Standardised "fade + rise on scroll into view" for a section.
 * Attach the returned ref to a wrapper; mark animated children with
 * `data-reveal`. Honours reduced-motion (no-op) and cleans up on unmount.
 *
 * Uses IntersectionObserver rather than ScrollTrigger for the reveal: the
 * observer reacts to the element's *actual* visual intersection and
 * re-evaluates automatically when layout shifts (late-loading images,
 * audience-swap mounts/unmounts). ScrollTrigger.batch caches scroll
 * positions computed once at setup — when those go stale its onEnter never
 * fires for an element it treats as already-passed, leaving the content
 * stranded at opacity:0 ("only background shows"). IntersectionObserver
 * cannot strand an in-view element, which removes that class of bug.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-reveal]")
      );
      if (!targets.length) return;

      // Reduced-motion users: leave everything visible, no animation.
      if (!window.matchMedia(NO_REDUCED_MOTION).matches) return;

      gsap.set(targets, { opacity: 0, y: REVEAL.y });

      const revealed = new WeakSet<Element>();
      const observer = new IntersectionObserver(
        (entries, obs) => {
          // Reveal everything that crossed in this callback together so the
          // stagger still reads as a group.
          const batch = entries
            .filter((e) => e.isIntersecting && !revealed.has(e.target))
            .map((e) => e.target as HTMLElement);
          if (!batch.length) return;

          batch.forEach((el) => {
            revealed.add(el);
            obs.unobserve(el);
          });

          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            stagger: REVEAL.stagger,
            overwrite: true,
          });
        },
        // Fire once an element is ~15% up from the bottom edge — mirrors the
        // previous "top 85%" ScrollTrigger start.
        { rootMargin: "0px 0px -15% 0px", threshold: 0 }
      );

      targets.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    },
    { scope }
  );

  return scope;
}
