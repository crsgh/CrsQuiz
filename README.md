# AI-Assisted Quiz Platform (JSON-Driven)

BlueQuiz is a modern quiz platform where all quiz content is stored as JSON documents in MongoDB Atlas and rendered dynamically.

Non-negotiables satisfied:
- Landing page, quiz list, quiz welcome, quiz taking, results
- No quiz content hardcoded in the frontend (content comes from MongoDB documents)
- Supports multiple_choice, true_false, free_text question types via a reusable QuestionRenderer
- Server-side validation (Zod) and grading with pass/fail
- Seed-on-first-run: inserts sample quizzes when the collection is empty
- Vitest + React Testing Library tests for core logic and API route

## Tech Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- MongoDB Atlas + Mongoose
- Zod
- Vitest + React Testing Library
- pnpm

## Architecture
The project follows a clean-ish separation:
- `src/app`: routes (pages) and API routes (route handlers)
- `src/components`: shared UI and layout components
- `src/features`: page-level UI modules (landing, quizzes, quiz player, results)
- `src/lib`: infra utilities (Mongo connection, errors, seed)
- `src/models`: Mongoose models
- `src/repositories`: persistence layer
- `src/services`: business logic layer (grading, loading)
- `src/validators`: Zod schemas
- `src/tests`: Vitest + RTL tests

## Setup

### 1) Install
```bash
pnpm install --no-frozen-lockfile
```

### 2) Configure MongoDB Atlas
Create a MongoDB Atlas cluster and a database.

Required env var:
- `MONGODB_URI`

Create `.env.local`:
```bash
cp .env.example .env.local
```

Then update `MONGODB_URI` in `.env.local`.

Example format:
```text
mongodb+srv://<username>:<password>@<cluster-host>/<db-name>?retryWrites=true&w=majority
```

MongoDB notes:
- The app uses a `quizzes` collection.
- A unique index on `id` is defined by the Mongoose schema.
- On first run (when `quizzes` is empty), the server auto-seeds:
  - JavaScript Basics
  - TypeScript Fundamentals
  - General Knowledge

### 3) Run
```bash
pnpm run dev
```
Open http://localhost:3000

## API
- `GET /api/quizzes` → lists quizzes (title, description, question count, passing score)
- `GET /api/quizzes/[id]` → returns the full quiz JSON document
- `POST /api/quizzes/[id]/submit` → validates and grades a submission

Submit response shape:
```json
{
  "score": 8,
  "percentage": 80,
  "passed": true
}
```

## Seeding (manual)
The app auto-seeds on first database use. If you want to trigger seeding manually:
```bash
pnpm run seed
```

## Testing
```bash
pnpm test
```

## Deployment
Recommended:
- Deploy on Vercel
- Add `MONGODB_URI` as an environment variable in the deployment environment

Build/run:
```bash
pnpm run build
pnpm start
```
