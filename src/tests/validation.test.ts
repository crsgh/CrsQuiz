import { describe, expect, it } from "vitest";

import { quizSchema } from "@/validators/quiz";

describe("Validation", () => {
  it("accepts a valid quiz schema", () => {
    const parsed = quizSchema.parse({
      id: "sample-quiz",
      title: "Sample Quiz",
      description: "A sample quiz",
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: "Example question?",
          choices: ["A", "B", "C", "D"],
          correctAnswer: 0,
          type: "multiple_choice",
        },
      ],
    });

    expect(parsed.id).toBe("sample-quiz");
  });

  it("rejects an invalid quiz schema", () => {
    const bad = {
      id: "bad",
      title: "Bad",
      description: "Bad",
      passingScore: 80,
      questions: [
        {
          id: 1,
          question: "Example question?",
          choices: ["A"],
          correctAnswer: 9,
          type: "multiple_choice",
        },
      ],
    };

    expect(() => quizSchema.parse(bad)).toThrow();
  });
});

