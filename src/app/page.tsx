import { LandingPage } from "@/features/landing/LandingPage";
import { quizService } from "@/services/instances";

export default async function Home() {
  const quizzes = await quizService.getQuizzes();
  return <LandingPage featured={quizzes.slice(0, 3)} />;
}
