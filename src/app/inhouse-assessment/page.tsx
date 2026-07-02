"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { APP_URL } from "@/lib/app-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { submitInhouseAssessment, ApiError } from "@/lib/client-api";
import { getVisitor } from "@/lib/fingerprint";
import { toast } from "sonner";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Loader2,
  ClipboardCheck,
  Lock,
} from "lucide-react";
import { inhouseQuestions, inhouseSectionNames } from "@/features/assessment/inhouse-questions";

export default function InHouseAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadInfo, setLeadInfo] = useState({ name: "", company: "", email: "", jobTitle: "" });
  const [isPending, setIsPending] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const router = useRouter();

  const totalSteps = inhouseQuestions.length + 1;
  const isLeadCapture = currentStep === inhouseQuestions.length;
  const currentQuestion = !isLeadCapture ? inhouseQuestions[currentStep] : null;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const setAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const toggleMultiAnswer = useCallback((questionId: string, value: string, maxSelections?: number) => {
    setAnswers((prev) => {
      const current = prev[questionId] ?? "";
      const values = current ? current.split(",") : [];
      const idx = values.indexOf(value);
      if (idx >= 0) {
        values.splice(idx, 1);
      } else {
        if (maxSelections && values.length >= maxSelections) {
          return prev;
        }
        values.push(value);
      }
      return { ...prev, [questionId]: values.join(",") };
    });
  }, []);

  const canProceed = () => {
    if (isLeadCapture) {
      return (
        leadInfo.name.trim() &&
        leadInfo.company.trim() &&
        leadInfo.email.trim() &&
        leadInfo.email.includes("@")
      );
    }
    if (!currentQuestion) return false;
    return !!answers[currentQuestion.id];
  };

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      const responses = Object.entries(answers).map(([questionId, responseValue]) => ({
        questionId,
        responseValue,
      }));
      const visitor = await getVisitor();
      const result = await submitInhouseAssessment({
        user: leadInfo,
        responses,
        visitorId: visitor?.visitorId,
      });
      sessionStorage.setItem("inhouseAssessmentResults", JSON.stringify(result));
      router.push("/inhouse-assessment/results");
    } catch (err) {
      if (err instanceof ApiError && err.code === "ALREADY_SUBMITTED") {
        setBlocked(true);
        return;
      }
      toast.error("Something went wrong. Please try again.");
      setIsPending(false);
    }
  };

  const handleNext = () => {
    if (isLeadCapture) {
      void handleSubmit();
      return;
    }
    if (currentStep < inhouseQuestions.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const getSectionNumber = () => {
    if (!currentQuestion) return "";
    const idx = inhouseSectionNames.indexOf(currentQuestion.section);
    return idx >= 0 ? `Section ${idx + 1} of ${inhouseSectionNames.length}` : "";
  };

  if (blocked) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center space-y-4" data-testid="card-already-submitted">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            You&apos;ve already generated a report
          </h1>
          <p className="text-muted-foreground">
            It looks like you&apos;ve already used this assessment on this device.
            Sign up for a free Retaind account to access your reports and more.
          </p>
          <Button asChild className="w-full" data-testid="button-blocked-signup">
            <a href={APP_URL}>Get Started</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <BackButton className="mb-6" />
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
            data-testid="text-inhouse-assessment-title"
          >
            In-House Hiring Readiness Assessment
          </h1>
          <p className="text-muted-foreground mb-1">The Recruiting For Retention Assessment Tool</p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>Estimated completion: 3–5 minutes</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              {isLeadCapture ? "Final Step" : `Question ${currentStep + 1} of ${inhouseQuestions.length}`}
            </span>
            <span className="text-sm text-muted-foreground">
              {isLeadCapture ? "Enter your details" : getSectionNumber()}
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-inhouse-assessment" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="p-8 md:p-10 shadow-lg border-border bg-card">
              {isLeadCapture ? (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h2
                        className="text-xl font-semibold text-foreground"
                        data-testid="text-inhouse-lead-capture-title"
                      >
                        Almost there!
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Enter your details to generate your personalised hiring readiness report
                      </p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        className="mt-1"
                        data-testid="input-inhouse-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium">Company Name *</Label>
                      <Input
                        id="company"
                        value={leadInfo.company}
                        onChange={(e) => setLeadInfo((p) => ({ ...p, company: e.target.value }))}
                        placeholder="Your company name"
                        className="mt-1"
                        data-testid="input-inhouse-company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={leadInfo.jobTitle}
                        onChange={(e) => setLeadInfo((p) => ({ ...p, jobTitle: e.target.value }))}
                        placeholder="Your job title"
                        className="mt-1"
                        data-testid="input-inhouse-job-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="mt-1"
                        data-testid="input-inhouse-email"
                      />
                    </div>
                  </div>
                </div>
              ) : currentQuestion ? (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                    {currentQuestion.section}
                  </p>
                  <h2
                    className="text-xl md:text-2xl font-semibold text-foreground mb-8"
                    data-testid={`text-inhouse-question-${currentQuestion.id}`}
                  >
                    {currentQuestion.question}
                  </h2>

                  {currentQuestion.type === "single" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setAnswer(currentQuestion.id, option)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            answers[currentQuestion.id] === option
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground/50 hover:bg-muted"
                          }`}
                          data-testid={`option-${currentQuestion.id}-${option.substring(0, 20).replace(/\s/g, "-").toLowerCase()}`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                answers[currentQuestion.id] === option
                                  ? "border-background bg-background"
                                  : "border-border"
                              }`}
                            >
                              {answers[currentQuestion.id] === option && (
                                <CheckCircle2 className="w-4 h-4 text-foreground" />
                              )}
                            </div>
                            <span className="text-sm font-medium">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === "multi" && currentQuestion.options && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        Select up to {currentQuestion.maxSelections ?? "all that apply"}
                      </p>
                      {currentQuestion.options.map((option) => {
                        const selected = (answers[currentQuestion.id] ?? "").split(",").includes(option);
                        return (
                          <button
                            key={option}
                            onClick={() => toggleMultiAnswer(currentQuestion.id, option, currentQuestion.maxSelections)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                              selected
                                ? "border-foreground bg-foreground text-background"
                                : "border-border hover:border-foreground/50 hover:bg-muted"
                            }`}
                            data-testid={`option-multi-${currentQuestion.id}-${option.substring(0, 20).replace(/\s/g, "-").toLowerCase()}`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                  selected
                                    ? "border-background bg-background"
                                    : "border-border"
                                }`}
                              >
                                {selected && <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />}
                              </div>
                              <span className="text-sm font-medium">{option}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {currentQuestion.type === "scale" && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{currentQuestion.scaleLabels?.min}</span>
                        <span>{currentQuestion.scaleLabels?.max}</span>
                      </div>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {Array.from(
                          {
                            length:
                              (currentQuestion.scaleMax ?? 10) -
                              (currentQuestion.scaleMin ?? 1) +
                              1,
                          },
                          (_, i) => i + (currentQuestion.scaleMin ?? 1)
                        ).map((num) => (
                          <button
                            key={num}
                            onClick={() => setAnswer(currentQuestion.id, String(num))}
                            className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                              answers[currentQuestion.id] === String(num)
                                ? "border-foreground bg-foreground text-background"
                                : "border-border hover:border-foreground/50 hover:bg-muted"
                            }`}
                            data-testid={`scale-${currentQuestion.id}-${num}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      {answers[currentQuestion.id] && (
                        <p className="text-center text-sm text-muted-foreground">
                          You selected:{" "}
                          <strong className="text-foreground">
                            {answers[currentQuestion.id]}
                          </strong>{" "}
                          out of {currentQuestion.scaleMax}
                        </p>
                      )}
                      {currentQuestion.scaleGuide && (
                        <div className="mt-4 space-y-2">
                          {currentQuestion.scaleGuide.map((guide) => (
                            <div key={guide.range} className="flex gap-3 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                              <span className="font-semibold text-foreground shrink-0 w-10">{guide.range}</span>
                              <span>{guide.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
            data-testid="button-inhouse-back"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed() || isPending}
            className="gap-2"
            data-testid="button-inhouse-next"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Report...
              </>
            ) : isLeadCapture ? (
              <>
                Generate My Report
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {isPending && (
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Our AI is generating your personalised hiring readiness report. This typically takes 10–15 seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
