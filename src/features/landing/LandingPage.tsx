"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { QuizListItem } from "@/services/quizService";

export function LandingPage({ featured }: { featured: QuizListItem[] }) {
  return (
    <div className="pb-24 pt-16 sm:pt-24 min-h-screen">
      <Container>
        {/* Minimal Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center space-y-8"
        >
          <div className="space-y-6 relative z-10">
            <h1 className="font-sans text-5xl font-bold tracking-tighter text-white sm:text-7xl leading-tight">
              Data-driven quizzes,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">effortless execution.</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-zinc-400">
              A streamlined engine that turns JSON into interactive, validated, and score-tracked experiences. No hardcoded UI needed.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4 relative z-10">
            <Link href="/quizzes">
              <Button className="rounded-full bg-white text-black hover:bg-zinc-200 px-8 py-6 text-sm font-semibold transition-transform hover:scale-105">
                Explore quizzes
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Clean Featured Quizzes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mx-auto mt-32 max-w-5xl relative z-10"
        >
          <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Featured Quizzes
            </h2>
            <Link href="/quizzes" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              View all &rarr;
            </Link>
          </div>

          {featured.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 py-16 text-center bg-black/20 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">No quizzes available.</p>
              <p className="mt-2 text-sm text-zinc-400">Seed your MongoDB database to get started.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((quiz, idx) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/quiz/${quiz.id}`} className="block h-full group">
                    <Card className="h-full border border-white/10 hover:border-white/20 transition-all shadow-lg group-hover:shadow-purple-500/10 bg-black/40 backdrop-blur-md">
                      <CardHeader className="pb-2">
                        <h3 className="font-sans text-lg font-semibold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                          {quiz.description}
                        </p>
                      </CardHeader>
                      <CardBody>
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                          <span className="text-xs font-medium text-zinc-500">{quiz.questionsCount} questions</span>
                          <span className="text-xs font-medium text-purple-400">Pass: {quiz.passingScore}%</span>
                        </div>
                      </CardBody>
                    </Card>

                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </Container>
    </div>
  );
}
