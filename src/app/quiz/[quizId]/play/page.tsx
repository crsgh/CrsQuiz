import { notFound } from "next/navigation";

import { QuizPlayer } from "@/features/quiz/player/QuizPlayer";
import { quizService } from "@/services/instances";
import { NotFoundError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export default async function QuizPlayPage(props: { params: Promise<{ quizId: string }> }) {
  const { quizId } = await props.params;

  try {
    const quiz = await quizService.getPublicQuizById(quizId);
    return <QuizPlayer quiz={quiz} />;
  } catch (err) {
    if (err instanceof NotFoundError) return notFound();
    throw err;
  }
}
