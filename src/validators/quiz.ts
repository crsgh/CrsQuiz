import { z } from "zod";

const questionBaseSchema = z.object({
  id: z.number().int().positive(),
  question: z.string().min(1),
  choices: z.array(z.string()).min(1),
  correctAnswer: z.number().int().nonnegative(),
  type: z.enum(["multiple_choice", "true_false", "free_text"]),
});

export const questionSchema = questionBaseSchema.superRefine((q, ctx) => {
  if (q.correctAnswer >= q.choices.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "correctAnswer must be a valid index into choices",
      path: ["correctAnswer"],
    });
  }

  if (q.type === "true_false" && q.choices.length !== 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "true_false questions must have exactly 2 choices",
      path: ["choices"],
    });
  }
});

export const quizSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  passingScore: z.number().int().min(0).max(100),
  questions: z.array(questionSchema).min(1),
});

export const publicQuestionSchema = questionBaseSchema
  .omit({ correctAnswer: true })
  .superRefine((q, ctx) => {
    if (q.type === "true_false" && q.choices.length !== 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "true_false questions must have exactly 2 choices",
        path: ["choices"],
      });
    }
  });
export const publicQuizSchema = quizSchema.extend({
  questions: z.array(publicQuestionSchema),
});

export const submissionAnswerSchema = z.discriminatedUnion("type", [
  z.object({
    questionId: z.number().int().positive(),
    type: z.literal("multiple_choice"),
    answerIndex: z.number().int().nonnegative(),
  }),
  z.object({
    questionId: z.number().int().positive(),
    type: z.literal("true_false"),
    answerBoolean: z.boolean(),
  }),
  z.object({
    questionId: z.number().int().positive(),
    type: z.literal("free_text"),
    answerText: z.string(),
  }),
]);

export const submissionSchema = z.object({
  answers: z.array(submissionAnswerSchema),
});

export type Quiz = z.infer<typeof quizSchema>;
export type PublicQuiz = z.infer<typeof publicQuizSchema>;
export type Submission = z.infer<typeof submissionSchema>;
