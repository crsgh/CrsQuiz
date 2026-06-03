import { notFound } from "next/navigation";

import { QuizWelcomePage } from "@/features/quiz/QuizWelcomePage";
import { quizService } from "@/services/instances";
import { NotFoundError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export default async function QuizPage(props: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await props.params;

  try {
    const quiz = await quizService.getPublicQuizById(quizId);
    return <QuizWelcomePage quiz={quiz} />;
  } catch (err) {
    if (err instanceof NotFoundError) return notFound();
    throw err;
  }
}
