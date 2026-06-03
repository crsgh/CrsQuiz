"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, Clock, Loader2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { QuestionRenderer } from "@/features/quiz/player/QuestionRenderer";
import type { PublicQuiz, Submission } from "@/validators/quiz";

type Answer = Submission["answers"][number];

const TIMER_SECONDS = 30;

function isAnswered(question: PublicQuiz["questions"][number], value: Answer | undefined) {
  if (!value) return false;
  if (question.type !== value.type) return false;
  if (value.type === "multiple_choice") return Number.isInteger(value.answerIndex);
  if (value.type === "true_false") return typeof value.answerBoolean === "boolean";
  return value.answerText.trim().length > 0;
}

export function QuizPlayer({ quiz }: { quiz: PublicQuiz }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answer[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [timeLeft, setTimeLeft] = React.useState(TIMER_SECONDS);
  const [tabSwitchCount, setTabSwitchCount] = React.useState(0);

  const total = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex]!;
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id);
  const canContinue = isAnswered(currentQuestion, currentAnswer);
  const progressPct = Math.round(((currentIndex + 1) / total) * 100);

  // Reset timer when question changes
  React.useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentIndex]);

  // Countdown timer
  React.useEffect(() => {
    if (submitting) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Time's up - auto advance
          if (currentIndex < total - 1) {
            setCurrentIndex((v) => v + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, submitting, total]);

  // Auto-submit on last question timeout
  React.useEffect(() => {
    if (timeLeft === 0 && currentIndex === total - 1 && !submitting) {
      submit();
    }
  }, [timeLeft, currentIndex, total]);

  // Cheating detection: visibility change (alt-tab)
  React.useEffect(() => {
    function handleVisibilityChange() {
      if (document.hidden) {
        setTabSwitchCount((prev) => prev + 1);
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  function upsertAnswer(next: Answer) {
    setAnswers((prev) => {
      const idx = prev.findIndex((a) => a.questionId === next.questionId);
      if (idx === -1) return [...prev, next];
      return prev.map((a) => (a.questionId === next.questionId ? next : a));
    });
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`/api/quizzes/${encodeURIComponent(quiz.id)}/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        throw new Error(payload?.error?.message ?? "Submission failed");
      }

      const result = (await response.json()) as { score: number; percentage: number; passed: boolean };

      sessionStorage.setItem(
        `bluequiz:result:${quiz.id}`,
        JSON.stringify({ ...result, totalQuestions: total, submittedAt: Date.now(), tabSwitchCount })
      );

      router.push(`/quiz/${quiz.id}/results`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const timerColor = timeLeft <= 5 ? "text-red-400" : timeLeft <= 10 ? "text-yellow-400" : "text-white";
  const timerBarColor = timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-yellow-500" : "bg-purple-500";

  return (
    <Container className="py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge className="w-fit bg-white/10 text-white border-white/20">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Quiz in progress
          </Badge>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">{quiz.title}</h1>
          <p className="text-sm text-zinc-400">
            Question {currentIndex + 1} of {total}
          </p>
        </div>

        <div className="w-full max-w-md space-y-3">
          {/* Timer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={cn("h-4 w-4", timerColor)} />
              <span className={cn("text-sm font-bold tabular-nums", timerColor)}>{timeLeft}s</span>
            </div>
            {tabSwitchCount > 0 && (
              <div className="flex items-center gap-1.5 text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{tabSwitchCount} tab switch{tabSwitchCount > 1 ? "es" : ""}</span>
              </div>
            )}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={cn("h-full rounded-full transition-colors", timerBarColor)}
              initial={false}
              animate={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
            <span>Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-purple-500"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <Card className="border border-white/10 bg-black/40 backdrop-blur-md">
        <CardHeader className="pb-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentQuestion.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="space-y-3"
            >
              <Badge className="w-fit bg-white/10 text-white border-white/20">{currentQuestion.type.replace("_", " ")}</Badge>
              <h2 className="font-sans text-2xl font-bold tracking-tight text-white">
                {currentQuestion.question}
              </h2>
            </motion.div>
          </AnimatePresence>
        </CardHeader>
        <CardBody className="pt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentQuestion.id}-body`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <QuestionRenderer question={currentQuestion} value={currentAnswer} onChange={upsertAnswer} />
            </motion.div>
          </AnimatePresence>

          {submitError ? (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {submitError}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((v) => Math.max(0, v - 1))}
              disabled={currentIndex === 0 || submitting}
              className={cn("w-full sm:w-auto bg-white/10 text-white border-none hover:bg-white/20 rounded-full transition-colors", currentIndex === 0 && "opacity-50")}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </Button>

            {currentIndex < total - 1 ? (
              <Button
                onClick={() => setCurrentIndex((v) => Math.min(total - 1, v + 1))}
                disabled={!canContinue || submitting}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full disabled:opacity-50 transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={!canContinue || submitting} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full disabled:opacity-50 transition-colors">
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Finish & see results
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            )}
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Your answers are stored locally until you submit. Scoring happens on the server.
          </p>
        </CardBody>
      </Card>
    </Container>
  );
}

