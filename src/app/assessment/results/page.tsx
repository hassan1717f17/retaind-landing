"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Download,
  Award,
  TrendingUp,
  Target,
  ArrowLeft,
} from "lucide-react";
import type { AssessmentResult } from "@/lib/client-api";
import { MarkdownReport } from "@/features/assessment/markdown-report";

function formatCurrency(value: number): string {
  if (value >= 1000000) return `£${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `£${(value / 1000).toFixed(0)}k`;
  return `£${value}`;
}

function ScoreGauge({ score, maxScore = 100 }: { score: number; maxScore?: number }) {
  const percentage = (score / maxScore) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference * 0.75;

  // Monochrome: use foreground for all score levels
  const strokeColor = "currentColor";

  return (
    <div className="relative w-52 h-52 mx-auto" data-testid="score-gauge">
      <svg viewBox="0 0 200 200" className="transform -rotate-135 text-foreground">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference * 0.75 }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          data-testid="text-total-score"
        >
          {score}
        </motion.span>
        <span className="text-sm text-muted-foreground">out of {maxScore}</span>
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const icons: Record<string, typeof Award> = {
    "Early Stage Recruiter": Target,
    "Growth Recruiter": TrendingUp,
    "Retained Ready Recruiter": Award,
    "Retained Leader": Award,
  };
  const Icon = icons[category] ?? TrendingUp;

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-foreground"
      data-testid="badge-category"
    >
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-lg">{category}</span>
    </div>
  );
}

function RevenueCalculator({
  revenue,
}: {
  revenue: AssessmentResult["revenue"];
}) {
  const [campaigns, setCampaigns] = useState(18);
  const [avgFee, setAvgFee] = useState(15000);

  // Interactive "what-if" projection driven by the sliders below — independent
  // of the scenario comparison chart.
  const projectedRevenue = campaigns * avgFee;

  // Scenario comparison — all three bars are server-computed estimates derived
  // from the user's answers. (The "Scaled Retained" bar must use the server's
  // scaledRevenueEstimate, NOT the slider's projectedRevenue.)
  const chartData = [
    { name: "Current Model", value: revenue.currentRevenueEstimate },
    { name: "Hybrid Retained", value: revenue.hybridRevenueEstimate },
    { name: "Scaled Retained", value: revenue.scaledRevenueEstimate },
  ];

  // Monochrome shades using opacity on foreground
  const barColors = [
    "var(--muted-foreground)",
    "var(--foreground)",
    "var(--foreground)",
  ];

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        Based on your answers, here is a realistic view of what your retained
        recruitment model could look like.
      </p>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <YAxis
              tickFormatter={(v: number) => formatCurrency(v)}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              formatter={(value: number) => [
                `£${value.toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--foreground)",
              }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((_entry, index) => (
                <Cell key={index} fill={barColors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chartData.map((item, index) => (
          <Card
            key={item.name}
            className="p-4 text-center border-border"
            data-testid={`card-revenue-${item.name
              .replace(/\s/g, "-")
              .toLowerCase()}`}
          >
            <p className="text-sm text-muted-foreground mb-1">{item.name}</p>
            <p
              className="text-2xl font-bold text-foreground"
              style={{ opacity: index === 0 ? 0.6 : 1 }}
            >
              £{item.value.toLocaleString()}
            </p>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-xl p-6 space-y-6">
        <h4 className="font-semibold text-foreground">Adjust Your Projections</h4>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-muted-foreground">
              Retained campaigns per year
            </label>
            <span
              className="text-sm font-semibold text-foreground"
              data-testid="text-campaigns-value"
            >
              {campaigns}
            </span>
          </div>
          <Slider
            value={[campaigns]}
            onValueChange={(v) => setCampaigns(v[0])}
            min={1}
            max={50}
            step={1}
            className="w-full"
            data-testid="slider-campaigns"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1</span>
            <span>50</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-muted-foreground">
              Average retained fee
            </label>
            <span
              className="text-sm font-semibold text-foreground"
              data-testid="text-fee-value"
            >
              £{avgFee.toLocaleString()}
            </span>
          </div>
          <Slider
            value={[avgFee]}
            onValueChange={(v) => setAvgFee(v[0])}
            min={10000}
            max={40000}
            step={1000}
            className="w-full"
            data-testid="slider-fee"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>£10,000</span>
            <span>£40,000</span>
          </div>
        </div>

        <div className="text-center p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Projected retained revenue
          </p>
          <p
            className="text-3xl font-bold text-foreground"
            data-testid="text-projected-revenue"
          >
            £{projectedRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">per year</p>
        </div>
      </div>

      {revenue.ownerTeamRevenueEstimate && (
        <Card
          className="p-6 bg-foreground border-foreground"
          data-testid="card-owner-projection"
        >
          <h4 className="font-semibold text-lg text-background mb-2">
            What This Could Mean For Your Business
          </h4>
          <p className="text-background/70 mb-3">
            Based on your team size, if your recruiters each delivered retained
            campaigns at a similar level, potential annual agency revenue could
            reach:
          </p>
          <p className="text-3xl font-bold text-background">
            £{revenue.ownerTeamRevenueEstimate.toLocaleString()}
          </p>
          <p className="text-xs text-background/50 mt-2">
            Estimated based on your team size and average retained campaign fees
          </p>
        </Card>
      )}

      <p className="text-xs text-muted-foreground italic text-center px-4">
        These projections are illustrative estimates based on your responses and
        typical retained recruitment models. Actual results will vary depending on
        sector, fees, client conversion, and campaign delivery.
      </p>
    </div>
  );
}

export default function AssessmentResults() {
  const [data, setData] = useState<AssessmentResult | null>(null);
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentResults");
    if (stored) {
      try {
        setData(JSON.parse(stored) as AssessmentResult);
      } catch {
        router.push("/assessment");
      }
    } else {
      router.push("/assessment");
    }
  }, [router]);

  const handleDownload = useCallback(() => {
    if (!data) return;

    const { scores, revenue, report } = data;

    let textContent = `RETAIND RECRUITER READINESS ASSESSMENT REPORT\n`;
    textContent += `${"=".repeat(50)}\n\n`;
    textContent += `YOUR READINESS SCORE: ${scores.totalScore}/100\n`;
    textContent += `CATEGORY: ${scores.category}\n\n`;
    textContent += `SCORE BREAKDOWN:\n`;
    textContent += `  Experience: ${scores.experienceScore}/20\n`;
    textContent += `  Commercial Position: ${scores.commercialScore}/20\n`;
    textContent += `  Growth Ambition: ${scores.ambitionScore}/20\n`;
    textContent += `  Retained Readiness: ${scores.readinessScore}/20\n`;
    textContent += `  Transition Barriers: ${scores.barrierScore}/20\n\n`;
    textContent += `REVENUE OPPORTUNITY:\n`;
    textContent += `  Current Model: £${revenue.currentRevenueEstimate.toLocaleString()}\n`;
    textContent += `  Hybrid Retained: £${revenue.hybridRevenueEstimate.toLocaleString()}\n`;
    textContent += `  Scaled Retained: £${revenue.scaledRevenueEstimate.toLocaleString()}\n`;
    if (revenue.ownerTeamRevenueEstimate) {
      textContent += `  Agency Team Projection: £${revenue.ownerTeamRevenueEstimate.toLocaleString()}\n`;
    }
    textContent += `\n${"=".repeat(50)}\n\n`;
    textContent += `PERSONALISED STRATEGY REPORT\n`;
    textContent += `${"=".repeat(50)}\n\n`;
    textContent += report.replace(/[#*]/g, "");
    textContent += `\n\n${"=".repeat(50)}\n`;
    textContent += `These projections are illustrative estimates based on your responses and typical retained recruitment models.\n`;
    textContent += `Actual results will vary depending on sector, fees, client conversion, and campaign delivery.\n`;
    textContent += `\nGenerated by Retaind.ai - www.retaind.ai\n`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Retaind-Readiness-Report.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  const { scores, revenue, report } = data;

  const radarData = [
    { dimension: "Experience", score: scores.experienceScore, fullMark: 20 },
    { dimension: "Commercial", score: scores.commercialScore, fullMark: 20 },
    { dimension: "Ambition", score: scores.ambitionScore, fullMark: 20 },
    { dimension: "Readiness", score: scores.readinessScore, fullMark: 20 },
    { dimension: "Barriers", score: scores.barrierScore, fullMark: 20 },
  ];

  return (
    <div
      className="min-h-screen bg-muted"
      ref={reportRef}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
              data-testid="link-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Score Card */}
          <Card className="p-8 md:p-10 mb-8 text-center border-border shadow-lg bg-card">
            <h1
              className="text-3xl md:text-4xl font-bold text-foreground mb-2"
              data-testid="text-results-title"
            >
              Your Recruiter Readiness Score
            </h1>
            <p className="text-muted-foreground mb-6">
              Here&apos;s your personalised assessment based on your responses
            </p>

            <ScoreGauge score={scores.totalScore} />

            <div className="mt-4 mb-6">
              <CategoryBadge category={scores.category} />
            </div>

            <div className="flex justify-center gap-3">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="gap-2"
                data-testid="button-download"
              >
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </Card>

          {/* Radar Chart */}
          <Card className="p-8 md:p-10 mb-8 border-border shadow-lg bg-card">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              data-testid="text-dimensions-title"
            >
              Readiness Dimensions
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{
                      fontSize: 12,
                      fill: "var(--muted-foreground)",
                    }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 20]}
                    tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="var(--foreground)"
                    fill="var(--foreground)"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {radarData.map((d) => (
                <div
                  key={d.dimension}
                  className="text-center p-3 bg-muted rounded-lg"
                  data-testid={`text-dim-${d.dimension.toLowerCase()}`}
                >
                  <p className="text-xs text-muted-foreground">{d.dimension}</p>
                  <p className="text-lg font-bold text-foreground">
                    {d.score}
                    <span className="text-sm text-muted-foreground">/20</span>
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Calculator */}
          <Card className="p-8 md:p-10 mb-8 border-border shadow-lg bg-card">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              data-testid="text-revenue-title"
            >
              Your Revenue Opportunity
            </h2>
            <RevenueCalculator revenue={revenue} />
          </Card>

          {/* Recruitment Failure Map */}
          <Card className="p-8 md:p-10 mb-8 border-border shadow-lg bg-card">
            <h2
              className="text-2xl font-bold text-foreground mb-4"
              data-testid="text-failure-map-title"
            >
              The Recruitment Failure Map™
            </h2>
            <p className="text-muted-foreground mb-6">
              The 10 structural failure points in the recruitment lifecycle — and
              how evidence-led recruitment fixes them.
            </p>
            <div className="rounded-lg overflow-hidden border border-border">
              <img
                src="/assets/The_Recruitment_Failure_Map_1773251284558.png"
                alt="The Recruitment Failure Map - The 10 Structural Failure Points in the Recruitment Lifecycle"
                className="w-full h-auto"
                data-testid="img-agency-recruitment-failure-map"
              />
            </div>
          </Card>

          {/* Strategy Report */}
          <Card className="p-8 md:p-10 mb-8 border-border shadow-lg bg-card">
            <h2
              className="text-2xl font-bold text-foreground mb-6"
              data-testid="text-strategy-title"
            >
              Your Personalised Strategy Report
            </h2>
            <MarkdownReport content={report} />
          </Card>

          {/* CTA */}
          <Card className="p-8 md:p-10 mb-8 border-0 shadow-lg text-center bg-foreground">
            <h2
              className="text-2xl md:text-3xl font-bold mb-3 text-background"
              data-testid="text-cta-title"
            >
              Ready to Build Toward This Model?
            </h2>
            <p className="text-background/70 mb-6 max-w-lg mx-auto">
              Register for your free Retaind recruiter account and access the
              full suite of tools, training, and support. You pay nothing until
              you win your first retainer campaign.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
                disabled
                data-testid="button-register"
              >
                Coming Soon
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
