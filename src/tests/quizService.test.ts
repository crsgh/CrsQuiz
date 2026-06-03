import { describe, expect, it } from "vitest";

import { QuizService, calculateCorrectCount } from "@/services/quizService";
import type { QuizEntity, QuizRepository } from "@/repositories/quizRepository";

const quiz: QuizEntity = {
  id: "unit-quiz",
  title: "Unit Quiz",
  description: "Test",
  passingScore: 80,
  questions: [
    {
      id: 1,
      question: "Pick B",
      choices: ["A", "B", "C", "D"],
      correctAnswer: 1,
      type: "multiple_choice",
    },
    {
      id: 2,
      question: "True statement",
      choices: ["True", "False"],
      correctAnswer: 0,
      type: "true_false",
    },
    {
      id: 3,
      question: "Type gold symbol",
      choices: ["Au", "AU"],
      correctAnswer: 0,
      type: "free_text",
    },
    {
      id: 4,
      question: "Pick A",
      choices: ["A", "B"],
      correctAnswer: 0,
      type: "multiple_choice",
    },
    {
      id: 5,
      question: "Pick False",
      choices: ["True", "False"],
      correctAnswer: 1,
      type: "true_false",
    },
  ],
};

class FakeRepo implements QuizRepository {
  async getAll() {
    return [
      {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        questionsCount: quiz.questions.length,
      },
    ];
  }
  async getById(id: string) {
    return id === quiz.id ? quiz : null;
  }
}

describe("QuizService", () => {
  it("loads quiz and strips correctAnswer for public quiz", async () => {
    const service = new QuizService(new FakeRepo());
    const publicQuiz = await service.getPublicQuizById(quiz.id);

    expect(publicQuiz.id).toBe(quiz.id);
    expect(publicQuiz.questions).toHaveLength(quiz.questions.length);
    expect(publicQuiz.questions[0]).not.toHaveProperty("correctAnswer");
  });

  it("calculates score across multiple question types", () => {
    const correct = calculateCorrectCount(quiz, {
      answers: [
        { questionId: 1, type: "multiple_choice", answerIndex: 1 },
        { questionId: 2, type: "true_false", answerBoolean: true },
        { questionId: 3, type: "free_text", answerText: " au " },
        { questionId: 4, type: "multiple_choice", answerIndex: 1 },
        { questionId: 5, type: "true_false", answerBoolean: false },
      ],
    });

    expect(correct).toBe(4);
  });

  it("applies pass/fail logic based on percentage", async () => {
    const service = new QuizService(new FakeRepo());
    const result = await service.gradeQuiz(quiz.id, {
      answers: [
        { questionId: 1, type: "multiple_choice", answerIndex: 1 },
        { questionId: 2, type: "true_false", answerBoolean: true },
        { questionId: 3, type: "free_text", answerText: "Au" },
        { questionId: 4, type: "multiple_choice", answerIndex: 0 },
        { questionId: 5, type: "true_false", answerBoolean: false },
      ],
    });

    expect(result.score).toBe(5);
    expect(result.percentage).toBe(100);
    expect(result.passed).toBe(true);
  });
});

