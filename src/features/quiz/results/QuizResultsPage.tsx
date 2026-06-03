"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Eye, RefreshCw, ShieldCheck, ShieldX } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { PublicQuiz } from "@/validators/quiz";

type StoredResult = {
  score: number;
  percentage: number;
  passed: boolean;
  totalQuestions?: number;
  submittedAt?: number;
  tabSwitchCount?: number;
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
      <div className="text-xs font-semibold text-zinc-400">{label}</div>
      <div className="mt-1 font-sans text-2xl font-bold tracking-tight text-white">{value}</div>
    </div>
  );
}

export function QuizResultsPage({ quiz }: { quiz: PublicQuiz }) {
  const reduceMotion = useReducedMotion();
  const [result, setResult] = React.useState<StoredResult | null>(null);

  React.useEffect(() => {
    const raw = sessionStorage.getItem(`bluequiz:result:${quiz.id}`);
    if (!raw) return;
    try {
      setResult(JSON.parse(raw) as StoredResult);
    } catch {
      setResult(null);
    }
  }, [quiz.id]);

  if (!result) {
    return (
      <Container className="py-10">
        <Card className="border border-white/10 bg-black/40 backdrop-blur-md">
          <CardHeader className="pb-0">
            <Badge className="w-fit bg-white/10 text-white border-white/20">Results</Badge>
            <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-white">No results yet</h1>
          </CardHeader>
          <CardBody className="pt-6">
            <p className="text-sm leading-7 text-zinc-400">
              Start the quiz to generate results. When you submit, your score is stored locally so this page can render
              instantly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/quiz/${quiz.id}/play`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
                  Take the quiz
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={`/quiz/${quiz.id}`} className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 rounded-full border-none">
                  Back to overview
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Container>
    );
  }

  const total = result.totalQuestions ?? quiz.questions.length;
  const correct = result.score;
  const wrong = Math.max(0, total - correct);
  const passed = result.passed;

  return (
    <Container className="py-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
          <div
            className={cn(
              "pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl",
              passed ? "bg-purple-500/20" : "bg-red-500/10"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full blur-3xl",
              passed ? "bg-blue-500/20" : "bg-rose-500/10"
            )}
          />

          <CardHeader className="relative pb-0">
            <Badge className="w-fit bg-white/10 text-white border-white/20">Results</Badge>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {passed ? "You passed" : "Not this time"}
                </h1>
                <p className="text-sm text-zinc-400">
                  Passing score: {quiz.passingScore}% · Total questions: {total}
                </p>
              </div>

              <motion.div
                initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1",
                  passed
                    ? "bg-purple-500/10 text-purple-400 ring-purple-500/30"
                    : "bg-red-500/10 text-red-400 ring-red-500/30"
                )}
                aria-label={passed ? "Passed" : "Failed"}
              >
                {passed ? <ShieldCheck className="h-6 w-6" /> : <ShieldX className="h-6 w-6" />}
              </motion.div>
            </div>
          </CardHeader>

          <CardBody className="relative pt-8">
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Score" value={`${correct}/${total}`} />
              <Stat label="Percentage" value={`${result.percentage}%`} />
              <Stat label="Status" value={passed ? "Passed" : "Failed"} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <div className="text-xs font-semibold text-zinc-400">Correct</div>
                <div className="mt-1 text-sm font-semibold text-white">{correct}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <div className="text-xs font-semibold text-zinc-400">Wrong</div>
                <div className="mt-1 text-sm font-semibold text-white">{wrong}</div>
              </div>
            </div>

            {/* Cheating Detection Logs */}
            {(result.tabSwitchCount ?? 0) > 0 && (
              <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">Integrity Warning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/30">
                    <Eye className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Tab switches detected: <span className="text-amber-400">{result.tabSwitchCount ?? 0}</span>
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      You left the quiz tab {result.tabSwitchCount ?? 0} time{(result.tabSwitchCount ?? 0) > 1 ? "s" : ""} during the session. This activity has been logged.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/quiz/${quiz.id}/play`}
                className="w-full sm:w-auto"
                onClick={() => sessionStorage.removeItem(`bluequiz:result:${quiz.id}`)}
              >
                <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border-none">
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Retry
                </Button>
              </Link>
              <Link href="/quizzes" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors border-none">
                  Explore more quizzes
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </Container>
  );
}

