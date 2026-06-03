import mongoose, { type InferSchemaType } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    question: { type: String, required: true },
    choices: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    type: { type: String, required: true, enum: ["multiple_choice", "true_false", "free_text"] },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    passingScore: { type: Number, required: true },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

export type QuizDoc = InferSchemaType<typeof quizSchema>;

export const QuizModel = (mongoose.models.Quiz as mongoose.Model<QuizDoc>) || mongoose.model("Quiz", quizSchema);

