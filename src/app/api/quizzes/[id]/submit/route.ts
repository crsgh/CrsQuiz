import { quizService } from "@/services/instances";
import { jsonError } from "@/lib/api";

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const body = await request.json();
    const result = await quizService.gradeQuiz(id, body);
    return Response.json(result);
  } catch (err) {
    return jsonError(err);
  }
}
