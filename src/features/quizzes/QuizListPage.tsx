"use client";

import { motion } from "framer-motion";
import { DatabaseZap } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Card, CardBody } from "@/components/ui/Card";
import type { QuizListItem } from "@/services/quizService";
import { QuizCard } from "@/features/quizzes/QuizCard";

export function QuizListPage({ quizzes }: { quizzes: QuizListItem[] }) {
  return (
    <Container className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mb-8 space-y-2"
      >
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white">All quizzes</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400">
          Every card is loaded from MongoDB and rendered dynamically. Add a new quiz document, refresh, and it appears
          here.
        </p>
      </motion.div>

      {quizzes.length === 0 ? (
        <Card className="border border-white/10 bg-black/40 backdrop-blur-md">
          <CardBody className="py-12 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-purple-500/20 text-purple-400">
              <DatabaseZap className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold text-white">No quizzes found.</p>
            <p className="mt-1 text-sm text-zinc-400">If this is your first run, verify MongoDB is configured.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {quizzes.map((quiz, idx) => (
            <QuizCard key={quiz.id} quiz={quiz} index={idx} />
          ))}
        </div>
      )}
    </Container>
  );
}

