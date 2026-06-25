"use client";
import { Section } from "@/components/landing/section";
import type { Audience } from "@/components/landing/types";

export function FreeAccess({ selectedAudience }: { selectedAudience: Audience }) {
  if (selectedAudience !== "agency") return null;

  return (
    <Section className="bg-background !py-8 md:!py-12">
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-2"
          data-testid="text-free-access-headline"
        >
          GET FREE ACCESS
        </h2>
        <p
          className="text-lg md:text-xl text-muted-foreground"
          data-testid="text-free-access-subheader"
        >
          To all the tools you need to win retained business
        </p>
      </div>
      <div className="flex justify-center">
        <div
          className="relative transform rotate-2 max-w-md"
          data-testid="postit-note"
        >
          <div
            className="bg-muted border px-10 py-8 shadow-lg relative"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)",
            }}
          >
            <p
              className="text-2xl md:text-3xl text-foreground leading-snug"
              style={{
                fontFamily: "'Caveat', 'Segoe Script', 'Comic Sans MS', cursive",
                fontWeight: 700,
                transform: "rotate(-1deg)",
              }}
            >
              Pay NOTHING, until you win your first retainer !!!
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
