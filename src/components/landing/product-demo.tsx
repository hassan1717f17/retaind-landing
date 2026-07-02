"use client";

import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import { useReveal } from "@/components/landing/use-reveal";

export function ProductDemo() {
  const scope = useReveal<HTMLDivElement>();

  return (
    <div ref={scope}>
      <Section className="bg-muted/40">
        <SectionHeader>
          <SectionBadge>Product Demo</SectionBadge>
          <h2 className="text-4xl font-bold mb-6" data-reveal data-testid="text-product-demo-title">
            See Retaind in action
          </h2>
          <p className="text-lg text-muted-foreground" data-reveal>
            A quick walkthrough of the platform — from role brief to evidence-based,
            behaviourally-benchmarked shortlist.
          </p>
        </SectionHeader>

        <div
          data-reveal
          className="relative max-w-5xl mx-auto rounded-xl shadow-2xl overflow-hidden border border-border/50 bg-background"
          data-testid="product-demo-video"
        >
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src="https://player.vimeo.com/video/1206376141?title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Retaind product demo"
              data-testid="product-demo-vimeo-player"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
