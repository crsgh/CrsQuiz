# JSON-Driven Quiz Platform Architecture

## Overview
This quiz platform is **JSON-driven**, meaning all quiz content (questions, answers, metadata) is stored as structured JSON documents in MongoDB. No quiz content is hardcoded—everything flows dynamically from the database.

---

## Why JSON-Driven?

1. **Flexible Content Management** – Add/edit quizzes without redeploying the app
2. **Scalable** – New quiz types can be added by extending the JSON schema
3. **Type-Safe** – Zod validators ensure data integrity at runtime
4. **Reusable Components** – UI components render based on question `type` field (multiple_choice, true_false, free_text)

---

## Data Structure (JSON in MongoDB)

Each quiz document follows this structure:

```json
{
  "id": "javascript-basics",
  "title": "JavaScript Basics",
  "description": "Test your knowledge...",
  "passingScore": 80,
  "questions": [
    {
      "id": 1,
      "question": "Which keyword declares a constant?",
      "choices": ["var", "let", "const", "define"],
      "correctAnswer": 2,
      "type": "multiple_choice"
    },
    {
      "id": 2,
      "question": "JavaScript is statically typed.",
      "choices": ["True", "False"],
      "correctAnswer": 1,
      "type": "true_false"
    }
  ]
}
```

**Key Points:**
- `correctAnswer` is an **index** (0-based) into the `choices` array
- `type` determines how the question is rendered and validated
- Each question has a unique numeric `id` within the quiz

---

## Request Flow: How It Works

```
User Request → Next.js Route Handler → Service Layer → Repository → MongoDB
     ↓              ↓                      ↓              ↓            ↓
  Browser      Validate Input       Business Logic   Query         JSON Doc
              (Zod Schema)          & Grading        Builder
```

### Step-by-Step Example: User Takes a Quiz

#### 1. **Fetch Quiz** (`GET /api/quizzes/[id]`)
```
Request: /api/quizzes/javascript-basics
  ↓
Route Handler fetches from Service
  ↓
Service calls Repository.getById("javascript-basics")
  ↓
Repository queries MongoDB: QuizModel.findOne({ id: "javascript-basics" })
  ↓
Returns: Complete quiz JSON with questions + correctAnswers
  ↓
Frontend displays questions (hides correctAnswer values)
```

#### 2. **Submit Answers** (`POST /api/quizzes/[id]/submit`)
```
Request Body (JSON):
{
  "answers": [
    { "questionId": 1, "type": "multiple_choice", "answerIndex": 2 },
    { "questionId": 2, "type": "true_false", "answerBoolean": true }
  ]
}
  ↓
Route Handler validates against submissionSchema (Zod)
  ↓
Service.gradeQuiz() receives validated data:
  • Fetches the quiz from MongoDB (for correct answers)
  • Compares user answers against stored correctAnswer values
  • Calculates score & percentage
  • Returns: { score: 2, percentage: 100, passed: true }
```

---

## Architecture Layers

### 1. **Mongoose Models** (`src/models/Quiz.ts`)
- Defines MongoDB schema with validation rules
- Maps JSON structure to database storage
- Enforces data types (String, Number, Array, etc.)

### 2. **Repository** (`src/repositories/quizRepository.ts`)
- **Single Responsibility**: Database queries only
- Methods: `getAll()`, `getById(id)`
- Returns raw data as `QuizEntity` objects
- Handles MongoDB connection logic

### 3. **Service** (`src/services/quizService.ts`)
- **Business Logic Layer**
- Methods: `getQuizzes()`, `getQuizById()`, `gradeQuiz()`
- Implements grading algorithm:
  ```
  Correct Count = Sum of matched answers
  Percentage = (Correct Count / Total Questions) × 100
  Passed = Percentage ≥ Quiz.passingScore
  ```
- Validates quiz data using Zod schemas
- Throws meaningful errors

### 4. **Validators** (`src/validators/quiz.ts`)
- **Zod schemas** define what valid quiz JSON looks like
- Runtime validation of:
  - Quiz structure (required fields, types)
  - Question types (multiple_choice, true_false, free_text)
  - Answer indices (must be within choices array bounds)
- Used by both Service layer and API routes

### 5. **API Routes** (`src/app/api/quizzes/*`)
- Express-like Route Handlers (Next.js 15)
- Minimal logic: validate input → call service → return response
- Error handling via custom error middleware

---

## JSON Flow in MongoDB

### Insertion Flow (Seeding)
```
quizzes.json (static data)
  ↓
Mongoose schema validation
  ↓
QuizModel.insertMany([...]) — stores JSON document in MongoDB
  ↓
DB stores: document with _id (auto), id (unique index), nested questions array
```

### Query Flow
```
QuizModel.find({}, { _id: 0, __v: 0 }).lean()
  ↓
Returns plain JSON objects (not Mongoose documents)
  ↓
Repository transforms to QuizEntity type
  ↓
Service validates with Zod
  ↓
Returns to client as JSON
```

### Why `.lean()` ?
- Returns plain JavaScript objects (faster)
- Skips Mongoose Document wrapping
- Perfect for JSON API responses

---

## Validation Flow (Zod)

```
Raw Input (Unknown)
  ↓
submissionSchema.parse(userInput)
  ↓
✓ Valid → Pass to grading logic
✗ Invalid → Return ValidationError with details
  ↓
Service compares validated answers against MongoDB quiz.correctAnswer
```

---

## Grading Algorithm

```typescript
// QuizService.gradeQuiz()
1. Validate submission format (Zod)
2. Fetch quiz from MongoDB
3. For each user answer:
   - Find matching question in quiz JSON
   - Check: userAnswer === question.correctAnswer (index)
   - Count matches
4. Calculate: percentage = (correct / total) × 100
5. Check: passed = percentage >= quiz.passingScore
6. Return: { score, percentage, passed }
```

**Example:**
```
Quiz has 5 questions, passingScore: 80
User answers: [2, ✓, 0, ✓, ✓] (3 correct out of 5)
Score: 3
Percentage: (3/5) × 100 = 60%
Passed: 60 < 80? → false
```

---

## Why This Design?

| Aspect | Benefit |
|--------|---------|
| **JSON in MongoDB** | Schema flexibility + querying power |
| **Service + Repository** | Separation of concerns, testable |
| **Zod Validation** | Type safety at runtime, good error messages |
| **Dynamic Rendering** | Same component handles multiple question types |
| **Seeding** | Auto-populates DB on first run, no manual setup |

---

## Summary

- **Content stored as JSON** in MongoDB collections
- **Requests flow through** Route Handlers → Services → Repositories → MongoDB
- **Validation happens at every layer** (Zod for input, Service for logic)
- **Grading is stateless**: fetches quiz from DB, compares answers, calculates score
- **No hardcoded content**: everything is database-driven and dynamically rendered
