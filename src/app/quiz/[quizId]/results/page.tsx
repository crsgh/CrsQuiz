import { notFound } from "next/navigation";

import { QuizResultsPage } from "@/features/quiz/results/QuizResultsPage";
import { quizService } from "@/services/instances";
import { NotFoundError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export default async function ResultsPage(props: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await props.params;

  try {
    const quiz = await quizService.getPublicQuizById(quizId);
    return <QuizResultsPage quiz={quiz} />;
  } catch (err) {
    if (err instanceof NotFoundError) return notFound();
    throw err;
  }
}
