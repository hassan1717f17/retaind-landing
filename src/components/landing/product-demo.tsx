"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Section, SectionHeader, SectionBadge } from "@/components/landing/section";
import { useReveal } from "@/components/landing/use-reveal";

const PRODUCT_DEMO_SRC =
  "https://player.vimeo.com/video/1203458165?title=0&byline=0&portrait=0";
const PRODUCT_DEMO_POSTER = "/assets/product-demo-poster.jpg";

/**
 * Shared framed 16:9 Vimeo embed. With a `poster`, shows a click-to-play
 * thumbnail first and only loads the (autoplaying) iframe on click.
 */
export function DemoVideoFrame({
  src,
  title,
  testId,
  poster,
}: {
  src: string;
  title: string;
  testId: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const iframeSrc = playing
    ? `${src}${src.includes("?") ? "&" : "?"}autoplay=1`
    : src;

  return (
    <div
      className="relative rounded-xl shadow-2xl overflow-hidden border border-border/50 bg-background"
      data-testid={testId}
    >
      <div className="relative w-full aspect-video bg-black">
        {poster && !playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`Play ${title}`}
            data-testid={`${testId}-play`}
          >
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/15" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-background/90 shadow-xl transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 md:h-8 md:w-8 fill-foreground text-foreground" />
              </span>
            </span>
          </button>
        ) : (
          <iframe
            src={iframeSrc}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}
      </div>
    </div>
  );
}

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

        <div data-reveal className="max-w-5xl mx-auto">
          <DemoVideoFrame
            src={PRODUCT_DEMO_SRC}
            title="Retaind product demo"
            testId="product-demo-video"
            poster={PRODUCT_DEMO_POSTER}
          />
        </div>
      </Section>
    </div>
  );
}
