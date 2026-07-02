"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  ArrowRight,
  Clock,
  BarChart3,
  FileText,
  Shield,
  Target,
  Star,
  Award,
  Briefcase,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { FloatingBubble, AssessmentFooter } from "@/features/assessment/assessment-landing-shared";

export default function InHouseHiringPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex flex-col items-start" data-testid="link-inhouse-landing-logo">
              <span className="font-bold tracking-tight text-2xl text-foreground">Retaind</span>
              <span className="text-xs text-muted-foreground italic -mt-1">Recruiting for Retention</span>
            </Link>
            <div className="flex items-center gap-3">
              <BackButton />
              <Link href="/choose-assessment">
                <Button variant="ghost" className="text-sm" data-testid="link-inhouse-landing-paths">
                  All Assessments
                </Button>
              </Link>
              <Link href="/inhouse-assessment">
                <Button className="text-sm" data-testid="button-inhouse-landing-nav-cta">
                  Start Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-background/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-background/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-background/10 border border-background/20 rounded-full text-sm text-background mb-6"
                data-testid="badge-inhouse-landing"
              >
                <Building2 className="w-4 h-4" />
                In-House Hiring Assessment
              </span>

              <h1
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-background mb-6 leading-[1.1] tracking-tight"
                data-testid="text-inhouse-landing-headline"
              >
                How Strong Is Your
                <span className="block text-background/70"> Hiring Process?</span>
              </h1>

              <p
                className="text-lg text-background/70 mb-8 leading-relaxed max-w-lg"
                data-testid="text-inhouse-landing-subheadline"
              >
                Take our free Recruiting For Retention Assessment and uncover the structural
                weaknesses in your hiring lifecycle, plus receive a personalised improvement
                strategy.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/inhouse-assessment">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="text-base font-semibold px-8 shadow-xl"
                    data-testid="button-inhouse-landing-hero-cta"
                  >
                    Start Your Free Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-background/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  5 minutes to complete
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  Personalised strategy report
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  100% confidential
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden md:flex items-center justify-center"
            >
              <div className="relative w-[340px] h-[420px] md:w-[380px] md:h-[450px] lg:w-[420px] lg:h-[480px]">
                <FloatingBubble
                  src="/assets/image_1773319044470.png"
                  label="Process Diagnosis"
                  x="-8%"
                  y="8%"
                  delay={0.4}
                  size={80}
                />
                <FloatingBubble
                  src="/assets/image_1773319054191.png"
                  label="Risk Analysis"
                  x="78%"
                  y="2%"
                  delay={0.6}
                  size={80}
                />
                <FloatingBubble
                  src="/assets/image_1773319065370.png"
                  label="Strategy Report"
                  x="-10%"
                  y="65%"
                  delay={0.8}
                  size={80}
                />
                <FloatingBubble
                  src="/assets/image_1773319082532.png"
                  label="Quick Wins"
                  x="80%"
                  y="60%"
                  delay={1.0}
                  size={80}
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src="/assets/image_1773318851491.png"
                    alt="In-house hiring professional"
                    className="w-[320px] h-auto object-contain drop-shadow-2xl rounded-2xl"
                    data-testid="img-inhouse-hero-person"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              data-testid="text-inhouse-landing-what-headline"
            >
              What You&apos;ll Discover
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates five core dimensions of your hiring process and surfaces
              the areas with the greatest improvement opportunity.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Process Diagnosis",
                desc: "Identify structural gaps across role definition, sourcing, evaluation, and decision-making",
              },
              {
                icon: Target,
                title: "Risk Analysis",
                desc: "Uncover your top hiring risks — the areas most likely to cause mis-hires and turnover",
              },
              {
                icon: FileText,
                title: "Strategy Report",
                desc: "Receive an AI-generated personalised report with targeted improvement recommendations",
              },
              {
                icon: Zap,
                title: "Quick Wins",
                desc: "Get practical, immediate actions to improve your hiring accuracy and candidate quality",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-muted">
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              data-testid="text-inhouse-landing-how-headline"
            >
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Complete the Assessment",
                desc: "Answer questions across 7 key areas of your hiring lifecycle — from role definition to outcomes tracking.",
                icon: FileText,
              },
              {
                step: "02",
                title: "Get Your Scorecard",
                desc: "See your hiring maturity score across five dimensions with a visual radar chart showing strengths and gaps.",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "Read Your Strategy Report",
                desc: "Download a personalised AI-generated strategy report with specific, actionable hiring improvement recommendations.",
                icon: Star,
              },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="text-5xl font-bold text-foreground/10 mb-4">{step}</div>
                <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Icon className="w-7 h-7 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
              data-testid="text-inhouse-landing-cta-headline"
            >
              Ready to Strengthen Your
              <span className="font-extrabold"> Hiring Process?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Find out exactly where your hiring process breaks down and get a personalised roadmap
              to better hiring outcomes.
            </p>
            <Link href="/inhouse-assessment">
              <Button
                size="lg"
                className="text-base font-semibold px-10 shadow-lg"
                data-testid="button-inhouse-landing-bottom-cta"
              >
                Start Your Free Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-6">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                5 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Free &amp; confidential
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <AssessmentFooter />
    </div>
  );
}
