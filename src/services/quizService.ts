import { NotFoundError, ValidationError } from "@/lib/errors";
import { type QuizEntity, type QuizListEntity, type QuizRepository } from "@/repositories/quizRepository";
import { quizSchema, publicQuizSchema, submissionSchema, type PublicQuiz, type Submission } from "@/validators/quiz";

export type QuizListItem = QuizListEntity;

export type SubmissionResult = {
  score: number;
  percentage: number;
  passed: boolean;
};

export class QuizService {
  constructor(private readonly repo: QuizRepository) {}

  async getQuizzes(): Promise<QuizListItem[]> {
    const list = await this.repo.getAll();
    return list;
  }

  async getQuizById(id: string): Promise<QuizEntity> {
    const quiz = await this.repo.getById(id);
    if (!quiz) throw new NotFoundError("Quiz not found");
    return quizSchema.parse(quiz);
  }

  async getPublicQuizById(id: string): Promise<PublicQuiz> {
    const parsed = await this.getQuizById(id);
    const publicQuiz = {
      id: parsed.id,
      title: parsed.title,
      description: parsed.description,
      passingScore: parsed.passingScore,
      questions: parsed.questions.map((q) => ({
        id: q.id,
        question: q.question,
        choices: q.choices,
        type: q.type,
      })),
    };
    return publicQuizSchema.parse(publicQuiz);
  }

  async gradeQuiz(quizId: string, submissionInput: unknown): Promise<SubmissionResult> {
    const submission = submissionSchema.parse(submissionInput);
    const parsedQuiz = await this.getQuizById(quizId);

    validateSubmissionAgainstQuiz(parsedQuiz, submission);

    const correct = calculateCorrectCount(parsedQuiz, submission);
    const percentage = Math.round((correct / parsedQuiz.questions.length) * 100);
    const passed = percentage >= parsedQuiz.passingScore;

    return { score: correct, percentage, passed };
  }
}

function normalizeText(s: string) {
  return s.trim().toLowerCase();
}

function validateSubmissionAgainstQuiz(quiz: QuizEntity, submission: Submission) {
  const questionById = new Map(quiz.questions.map((q) => [q.id, q]));

  for (const ans of submission.answers) {
    const q = questionById.get(ans.questionId);
    if (!q) {
      throw new ValidationError("Submission contains unknown questionId", { details: { questionId: ans.questionId } });
    }
    if (q.type !== ans.type) {
      throw new ValidationError("Submission answer type does not match question type", {
        details: { questionId: ans.questionId, expected: q.type, actual: ans.type },
      });
    }

    if (ans.type === "multiple_choice") {
      if (ans.answerIndex < 0 || ans.answerIndex >= q.choices.length) {
        throw new ValidationError("answerIndex out of range", { details: { questionId: ans.questionId } });
      }
    }
  }
}

export function calculateCorrectCount(quiz: QuizEntity, submission: Submission) {
  const answerByQuestionId = new Map<number, Submission["answers"][number]>();
  for (const ans of submission.answers) answerByQuestionId.set(ans.questionId, ans);

  let correct = 0;

  for (const q of quiz.questions) {
    const ans = answerByQuestionId.get(q.id);
    if (!ans) continue;

    if (q.type === "multiple_choice" && ans.type === "multiple_choice") {
      if (ans.answerIndex === q.correctAnswer) correct += 1;
      continue;
    }

    if (q.type === "true_false" && ans.type === "true_false") {
      const correctBool = q.correctAnswer === 0;
      if (ans.answerBoolean === correctBool) correct += 1;
      continue;
    }

    if (q.type === "free_text" && ans.type === "free_text") {
      const expected = q.choices[q.correctAnswer] ?? "";
      const accepted = new Set(q.choices.map(normalizeText));
      if (accepted.has(normalizeText(ans.answerText))) correct += 1;
      else if (normalizeText(ans.answerText) === normalizeText(expected)) correct += 1;
    }
  }

  return correct;
}
