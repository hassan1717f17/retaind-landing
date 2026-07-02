"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { BackButton } from "@/components/back-button";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CONTACT_EMAIL = "info@retaind.ai";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Frontend-only: compose a pre-filled email in the visitor's mail client.
  // No backend/API — swap this for a POST when the endpoint is ready.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Website enquiry${name ? ` from ${name}` : ""}`;
    const body = `${message}\n\n— ${name || "A visitor"}${email ? `\n${email}` : ""}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app…");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
        <BackButton href="/" className="mb-8" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Intro + direct contact */}
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-muted text-muted-foreground text-sm font-semibold tracking-wide uppercase">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Get in touch
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Questions about Retaind, a demo, or how evidence-led hiring fits your
              team? Send us a message and we&apos;ll get back to you.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              data-testid="link-contact-email"
            >
              <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-foreground" />
              </span>
              <span className="text-left">
                <span className="block text-xs text-muted-foreground">Email us</span>
                <span className="block font-semibold text-foreground">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>
          </div>

          {/* Message form */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  data-testid="input-contact-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  data-testid="input-contact-email"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  required
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  data-testid="input-contact-message"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full gap-2"
                data-testid="button-contact-submit"
              >
                <Send className="w-4 h-4" />
                Send message
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                This opens your email app pre-filled to {CONTACT_EMAIL}.
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer selectedAudience={null} />
    </div>
  );
}
