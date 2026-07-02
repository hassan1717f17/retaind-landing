"use client";

import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import { useReveal } from "@/components/landing/use-reveal";
import type { Audience } from "@/components/landing/types";

const PRODUCT_DEMO_SRC =
  "https://player.vimeo.com/video/1206376141?title=0&byline=0&portrait=0";
const AGENCY_DEMO_SRC =
  "https://player.vimeo.com/video/1206377853?title=0&byline=0&portrait=0";

function VideoFrame({
  src,
  title,
  label,
  testId,
}: {
  src: string;
  title: string;
  label?: string;
  testId: string;
}) {
  return (
    <div data-reveal>
      {label && (
        <p className="text-sm font-semibold text-muted-foreground mb-3 text-center">
          {label}
        </p>
      )}
      <div
        className="relative rounded-xl shadow-2xl overflow-hidden border border-border/50 bg-background"
        data-testid={testId}
      >
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={src}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductDemo({ selectedAudience }: { selectedAudience: Audience }) {
  const scope = useReveal<HTMLDivElement>();
  const showAgencyDemo = selectedAudience === "agency";

  return (
    <div ref={scope}>
      <Section className="bg-muted/40">
        <SectionHeader>
          <SectionBadge>Product Demo</SectionBadge>
          <h2 className="text-4xl font-bold mb-6" data-reveal data-testid="text-product-demo-title">
            See Retaind in action
          </h2>
          <p className="text-lg text-muted-foreground" data-reveal>
            {showAgencyDemo
              ? "A tour of the platform, plus a walkthrough built for agency recruiters."
              : "A quick walkthrough of the platform — from role brief to evidence-based, behaviourally-benchmarked shortlist."}
          </p>
        </SectionHeader>

        {showAgencyDemo ? (
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <VideoFrame
              src={PRODUCT_DEMO_SRC}
              title="Retaind product demo"
              label="Platform demo"
              testId="product-demo-video"
            />
            <VideoFrame
              src={AGENCY_DEMO_SRC}
              title="Retaind agency demo"
              label="For agency recruiters"
              testId="agency-demo-video"
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <VideoFrame
              src={PRODUCT_DEMO_SRC}
              title="Retaind product demo"
              testId="product-demo-video"
            />
          </div>
        )}
      </Section>
    </div>
  );
}
