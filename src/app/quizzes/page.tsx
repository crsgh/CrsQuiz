import { QuizListPage } from "@/features/quizzes/QuizListPage";
import { quizService } from "@/services/instances";

export const dynamic = "force-dynamic";

export default async function QuizzesPage() {
  const quizzes = await quizService.getQuizzes();
  return <QuizListPage quizzes={quizzes} />;
}

