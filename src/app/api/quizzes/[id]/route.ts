import { quizService } from "@/services/instances";
import { jsonError } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const quiz = await quizService.getQuizById(id);
    return Response.json(quiz);
  } catch (err) {
    return jsonError(err);
  }
}
