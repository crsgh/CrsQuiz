import { QuizModel } from "@/models/Quiz";
import { ensureSeeded } from "@/lib/mongodb";
import { DatabaseError } from "@/lib/errors";

export type QuizEntity = {
  id: string;
  title: string;
  description: string;
  passingScore: number;
  questions: Array<{
    id: number;
    question: string;
    choices: string[];
    correctAnswer: number;
    type: "multiple_choice" | "true_false" | "free_text";
  }>;
};

export type QuizListEntity = Omit<QuizEntity, "questions"> & { questionsCount: number };

export interface QuizRepository {
  getAll(): Promise<QuizListEntity[]>;
  getById(id: string): Promise<QuizEntity | null>;
}

export class MongoQuizRepository implements QuizRepository {
  async getAll(): Promise<QuizListEntity[]> {
    try {
      await ensureSeeded();
    } catch (err) {
      if (err instanceof DatabaseError) return [];
      throw err;
    }
    const quizzes = await QuizModel.find({}, { _id: 0, __v: 0 }).lean().exec();
    return quizzes.map((q) => ({
      id: q.id,
      title: q.title,
      description: q.description,
      passingScore: q.passingScore,
      questionsCount: q.questions.length,
    }));
  }

  async getById(id: string): Promise<QuizEntity | null> {
    try {
      await ensureSeeded();
    } catch (err) {
      if (err instanceof DatabaseError) return null;
      throw err;
    }
    const quiz = await QuizModel.findOne({ id }, { _id: 0, __v: 0 }).lean().exec();
    if (!quiz) return null;
    return quiz as unknown as QuizEntity;
  }
}
