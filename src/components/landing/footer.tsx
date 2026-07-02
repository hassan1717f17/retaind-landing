"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/lib/client-api";
import type { Audience } from "@/components/landing/types";

interface Props {
  selectedAudience: Audience;
}

export function Footer({ selectedAudience }: Props) {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to subscribe";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <footer className="bg-foreground text-background pt-24 pb-12">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">
            {selectedAudience === "inhouse"
              ? "Ready to Hire for Retention?"
              : "Ready to Transform Your Recruitment?"}
          </h2>
          <p className="text-lg text-background/70 mb-8">
            Free registration &amp; Set-Up.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full" data-testid="button-start-trial-footer">
            Secure My Free Account
          </Button>
          <p className="mt-6 text-sm text-background/70">
            {selectedAudience === "inhouse"
              ? "Trusted by leading enterprises to improve their hiring outcomes"
              : "Join hundreds of recruiters already registered."}
          </p>
        </div>

        <div className="border-t border-background/20 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-heading font-bold text-2xl tracking-tight">
            <span className="text-background">Retaind</span>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm">
            <Input
              placeholder="Subscribe to newsletter"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isPending}
              data-testid="button-newsletter-subscribe"
            >
              {isPending ? "..." : "Subscribe"}
            </Button>
          </form>

          <div className="flex gap-8 text-sm text-background/70">
            <Link href="/privacy" className="transition-colors" data-testid="link-footer-privacy">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors" data-testid="link-footer-terms">
              Terms
            </Link>
            <a href="#" className="transition-colors" data-testid="link-footer-contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
