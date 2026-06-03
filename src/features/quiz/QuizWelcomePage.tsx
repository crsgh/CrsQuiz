"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ArrowRight, BookOpenCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import type { PublicQuiz } from "@/validators/quiz";

export function QuizWelcomePage({ quiz }: { quiz: PublicQuiz }) {
  return (
    <Container className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card className="border border-white/10 bg-black/40 backdrop-blur-md">
          <CardHeader className="pb-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <Badge className="w-fit bg-white/10 text-white border-white/20">
                  <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Quiz overview
                </Badge>
                <h1 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {quiz.title}
                </h1>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Badge className="bg-white/10 text-white border-white/20">{quiz.questions.length} questions</Badge>
                <Badge className="bg-white/10 text-white border-white/20">Pass {quiz.passingScore}%</Badge>
              </div>
            </div>
          </CardHeader>
          <CardBody className="pt-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: (props) => <p className="mb-3 text-sm leading-7 text-zinc-300" {...props} />,
                  ul: (props) => <ul className="mb-3 list-disc pl-5 text-sm leading-7 text-zinc-300" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  a: (props) => (
                    <a className="font-semibold text-purple-400 underline-offset-4 hover:underline" {...props} />
                  ),
                  strong: (props) => <strong className="font-semibold text-white" {...props} />,
                }}
              >
                {quiz.description}
              </ReactMarkdown>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={`/quiz/${quiz.id}/play`} className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                  Start quiz
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/quizzes" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 rounded-full border-none">
                  Back to list
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </Container>
  );
}

