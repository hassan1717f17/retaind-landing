"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Building2,
  ArrowRight,
  Clock,
  FileBarChart,
  Lightbulb,
  CheckCircle2,
  Target,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChooseAssessmentPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <img
                src="/assets/Retaind_Logo_with_strapline_1769251859256.png"
                alt="Retaind.ai"
                className="h-8 cursor-pointer"
                data-testid="img-pathway-logo"
              />
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-sm" data-testid="link-pathway-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-muted/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-muted/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block px-4 py-1.5 bg-muted text-foreground rounded-full text-sm font-medium mb-6"
              data-testid="badge-pathway-label"
            >
              Assessment Pathway
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight"
              data-testid="text-pathway-headline"
            >
              Choose Your
              <span className="font-extrabold"> Assessment Path</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-pathway-subheadline"
            >
              Whether you&apos;re building retained recruitment revenue as an agency recruiter or
              improving hiring quality as an in-house team, Retaind.ai will guide you to the right
              next step.
            </p>
            <p
              className="text-base text-muted-foreground max-w-xl mx-auto mb-8"
              data-testid="text-pathway-supporting"
            >
              Select the assessment that best matches your role to receive a tailored strategy
              report, practical recommendations, and the most relevant Retaind.ai pathway.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <span className="text-sm text-muted-foreground font-medium">
              What best describes you today?
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedRole("agency");
                  document.getElementById("pathway-cards")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRole === "agency"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background text-foreground border border-border hover:border-foreground/50"
                }`}
                data-testid="button-select-agency"
              >
                Agency Recruiter
              </button>
              <button
                onClick={() => {
                  setSelectedRole("inhouse");
                  document.getElementById("pathway-cards")?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedRole === "inhouse"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-background text-foreground border border-border hover:border-foreground/50"
                }`}
                data-testid="button-select-inhouse"
              >
                In-House Hiring Team
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Clock className="w-4 h-4" />
            <span>Estimated completion time: 2–5 minutes</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground/50 mx-auto animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Pathway Cards */}
      <section id="pathway-cards" className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Agency Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/agency-recruiter"
                className={`group block relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden h-full ${
                  selectedRole === "agency"
                    ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                    : hoveredCard === "agency"
                    ? "border-primary/70 shadow-xl shadow-primary/10 -translate-y-1"
                    : "border-border shadow-sm hover:shadow-lg"
                }`}
                data-testid="card-agency-path"
                onMouseEnter={() => setHoveredCard("agency")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        hoveredCard === "agency" || selectedRole === "agency"
                          ? "bg-primary shadow-lg"
                          : "bg-muted"
                      }`}
                    >
                      <TrendingUp
                        className={`w-7 h-7 transition-colors ${
                          hoveredCard === "agency" || selectedRole === "agency"
                            ? "text-primary-foreground"
                            : "text-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-foreground"
                        data-testid="text-agency-card-title"
                      >
                        I&apos;m an Agency Recruiter
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        For recruiters, agency owners, and search firms
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-muted-foreground mb-6 leading-relaxed"
                    data-testid="text-agency-card-description"
                  >
                    Discover how ready you are to transition from contingency to structured retained
                    recruitment, increase your fees, improve client positioning, and unlock
                    higher-value search campaigns.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Measure your retained recruitment readiness",
                      "Identify growth barriers and commercial opportunities",
                      "See your revenue potential through retained campaigns",
                      "Get a personalised recruiter strategy brief",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span
                    className="flex items-center justify-center w-full h-12 rounded-md text-base font-semibold transition-all duration-300 text-primary-foreground bg-primary"
                    data-testid="button-start-agency-assessment"
                  >
                    Start Agency Recruiter Assessment
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Best for agency recruiters, solo recruiters, team leaders, and agency owners
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* In-House Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/in-house-hiring"
                className={`group block relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden h-full ${
                  selectedRole === "inhouse"
                    ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                    : hoveredCard === "inhouse"
                    ? "border-primary/70 shadow-xl shadow-primary/10 -translate-y-1"
                    : "border-border shadow-sm hover:shadow-lg"
                }`}
                data-testid="card-inhouse-path"
                onMouseEnter={() => setHoveredCard("inhouse")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 left-0 right-0 h-2 bg-primary" />

                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        hoveredCard === "inhouse" || selectedRole === "inhouse"
                          ? "bg-primary shadow-lg"
                          : "bg-muted"
                      }`}
                    >
                      <Building2
                        className={`w-7 h-7 transition-colors ${
                          hoveredCard === "inhouse" || selectedRole === "inhouse"
                            ? "text-primary-foreground"
                            : "text-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold text-foreground"
                        data-testid="text-inhouse-card-title"
                      >
                        I&apos;m an In-House Hiring Leader
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        For internal recruiters, HR leaders, hiring managers, and founders
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-muted-foreground mb-6 leading-relaxed"
                    data-testid="text-inhouse-card-description"
                  >
                    Assess the strength of your hiring process, identify structural weaknesses
                    across the recruitment lifecycle, and discover how to improve hiring accuracy,
                    shortlist quality, and decision confidence.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Diagnose weak points in your hiring lifecycle",
                      "Identify your top structural hiring risks",
                      "See your hiring improvement opportunity",
                      "Get a personalised hiring strategy brief",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span
                    className="flex items-center justify-center w-full h-12 rounded-md text-base font-semibold transition-all duration-300 text-primary-foreground bg-primary"
                    data-testid="button-start-inhouse-assessment"
                  >
                    Start In-House Hiring Assessment
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Best for talent acquisition teams, HR leaders, hiring managers, and
                    growth-stage businesses
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Two Challenges Section */}
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
              data-testid="text-why-headline"
            >
              Two Different Hiring Challenges.
              <span className="font-extrabold"> One Smarter System.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Agency Recruiters</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Need stronger positioning, better campaign structure, and tools to win and deliver
                retained recruitment. The agency assessment measures commercial readiness,
                positioning strength, and revenue growth potential.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">In-House Hiring Teams</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Need better role definition, stronger candidate attraction, more structured
                evaluation, and greater confidence in hiring decisions. The in-house assessment
                diagnoses process gaps across the full hiring lifecycle.
              </p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto"
          >
            Retaind.ai supports both journeys with structured workflows, behavioural benchmarking,
            evidence-led assessment, and smarter hiring tools.
          </motion.p>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="py-10 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileBarChart, label: "Tailored assessment results" },
              { icon: Lightbulb, label: "Strategy-led recommendations" },
              { icon: Target, label: "Built for real-world teams" },
              { icon: Zap, label: "Takes just a few minutes" },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-2 py-4"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-foreground" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-bold text-foreground mb-4"
              data-testid="text-help-headline"
            >
              Not Sure Which Path Fits You?
            </h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              Choose the path that reflects the role you currently play most often.
            </p>
            <div className="bg-muted rounded-xl p-6 text-left max-w-xl mx-auto mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  If you are an{" "}
                  <strong className="text-foreground">agency recruiter</strong> selling and
                  delivering recruitment services to clients, choose the{" "}
                  <strong className="text-foreground">Agency Recruiter Assessment</strong>.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  If you are responsible for{" "}
                  <strong className="text-foreground">hiring within your own organisation</strong>,
                  choose the{" "}
                  <strong className="text-foreground">In-House Hiring Assessment</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/agency-recruiter">
                <Button
                  size="lg"
                  className="px-8 text-base"
                  data-testid="button-bottom-agency-cta"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Agency Assessment
                </Button>
              </Link>
              <Link href="/in-house-hiring">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-base"
                  data-testid="button-bottom-inhouse-cta"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  In-House Assessment
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Need help choosing?{" "}
              <a
                href="mailto:support@retaind.ai"
                className="text-foreground underline"
                data-testid="link-help-contact"
              >
                Contact us
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-center">
        <div className="max-w-7xl mx-auto px-4">
          <img
            src="/assets/Retaind_Logo_with_strapline_1769251859256.png"
            alt="Retaind.ai"
            className="h-6 mx-auto mb-4 brightness-200"
          />
          <div className="flex items-center justify-center gap-6 text-sm text-background/50">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-background transition-colors">
              Terms
            </Link>
            <a href="mailto:support@retaind.ai" className="hover:text-background transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-background/30 mt-4">
            © {new Date().getFullYear()} Retaind.ai Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
