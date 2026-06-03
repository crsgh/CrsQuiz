"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ListChecks } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { QuizListItem } from "@/services/quizService";

export function QuizCard({ quiz, index }: { quiz: QuizListItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.035 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Link href={`/quiz/${quiz.id}`} className="block h-full group">
        <Card className="h-full border border-white/10 hover:border-white/20 transition-all shadow-lg group-hover:shadow-purple-500/10 bg-black/40 backdrop-blur-md">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-sans text-xl font-semibold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                {quiz.title}
              </h3>
              <Badge className="shrink-0 bg-white/10 text-white border-white/20">Pass {quiz.passingScore}%</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{quiz.description}</p>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-3">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400">
                <ListChecks className="h-4 w-4 text-purple-400" aria-hidden="true" />
                {quiz.questionsCount} questions
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-semibold text-purple-400 transition",
                  "group-hover:translate-x-0.5"
                )}
              >
                Open <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  );
}
