import fs from "fs/promises";
import path from "path";

import { QuizModel } from "@/models/Quiz";
import { quizSchema } from "@/validators/quiz";

export async function seedQuizzesIfEmpty() {
  const count = await QuizModel.estimatedDocumentCount();
  if (count > 0) return;

  const filePath = path.join(process.cwd(), "data", "quizzes.json");
  const raw = await fs.readFile(filePath, "utf8");
  const quizzes = JSON.parse(raw);

  const docs = quizzes.map((q: unknown) => quizSchema.parse(q));
  await QuizModel.insertMany(docs, { ordered: true });
}

