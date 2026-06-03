import { quizService } from "@/services/instances";
import { jsonError } from "@/lib/api";

export async function GET() {
  try {
    const quizzes = await quizService.getQuizzes();
    return Response.json(quizzes);
  } catch (err) {
    return jsonError(err);
  }
}

