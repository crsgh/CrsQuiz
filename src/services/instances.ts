import { MongoQuizRepository } from "@/repositories/quizRepository";
import { QuizService } from "@/services/quizService";

const repo = new MongoQuizRepository();

export const quizService = new QuizService(repo);

