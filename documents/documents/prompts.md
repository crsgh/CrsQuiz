Prompt 1 
You are a senior Staff Software Engineer and UI/UX Engineer.

Build a complete production-quality hackathon project that satisfies all requirements below.

# Project

AI-Assisted Quiz Platform (JSON-Driven)

# Goal

Create a modern quiz platform where all quiz content is stored as JSON documents in MongoDB and rendered dynamically.

No quiz questions, answers, or quiz content may be hardcoded in the frontend.

The platform must be fully data-driven.

# Required Tech Stack

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* Framer Motion
* MongoDB Atlas
* Mongoose
* Zod
* Vitest
* React Testing Library
* pnpm

Development command:

```bash
pnpm install
pnpm run dev
```

The application must run successfully after those commands.

# UI Requirements

Do NOT copy Wayground.

Create an original design inspired by Wayground's layout, spacing, card system, smooth transitions, and playful learning experience.

Theme:

* Primary Blue: #0F4C81
* Secondary Blue: #2F80ED
* Light Blue: #EAF4FF
* White: #FFFFFF
* Dark Text: #1E293B

Visual style:

* Modern SaaS
* Rounded cards
* Smooth animations
* Clean typography
* Professional landing page
* Mobile responsive
* Accessible

Use Framer Motion for:

* Page transitions
* Card hover animations
* Quiz question transitions
* Progress animations
* Result animations

# Non-Negotiable Requirements

Create:

1. Landing Page
2. Quiz List Page
3. Quiz Welcome Page
4. Quiz Taking Page
5. Results Page

The system must:

* Load quiz data from JSON
* Render questions dynamically
* Compute results dynamically
* Display pass/fail status

# Landing Page

Purpose:

Attract users.

Include:

* Hero section
* CTA button
* Featured quizzes
* How it works section
* Benefits section
* Modern illustrations/icons
* Responsive layout

# Quiz List Page

Route:

```text
/quizzes
```

Display all quizzes retrieved from MongoDB.

Each card shows:

* title
* description
* question count
* passing score

Clicking a card redirects to quiz details.

# Quiz Welcome Page

Route:

```text
/quiz/[quizId]
```

Display:

* title
* description
* image (optional)
* passing score
* question count

Button:

Start Quiz

Descriptions must support markdown rendering.

# Quiz Taking Page

Route:

```text
/quiz/[quizId]/play
```

Display:

* progress bar
* question counter
* question
* choices

Supported question types:

* multiple_choice
* true_false
* free_text

Questions must be rendered dynamically based on type.

No hardcoded question UI.

Create a reusable QuestionRenderer component.

# Results Page

Display:

* score
* percentage
* passed/failed
* total correct
* total wrong

Show animated success/failure state.

Allow retry.

# JSON Structure

Use this exact structure:

```json
{
  "id": "sample-quiz",
  "title": "Sample Quiz",
  "description": "A sample quiz",
  "passingScore": 80,
  "questions": [
    {
      "id": 1,
      "question": "Example question?",
      "choices": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctAnswer": 0,
      "type": "multiple_choice"
    }
  ]
}
```

Store this structure directly inside MongoDB documents.

# MongoDB Requirement

Use MongoDB Atlas.

Create:

Quiz Collection

Schema:

* id
* title
* description
* passingScore
* questions

Create a seed mechanism.

When the application starts for the first time:

* detect if quizzes collection is empty
* insert sample quizzes automatically

Create at least:

* JavaScript Basics
* TypeScript Fundamentals
* General Knowledge

All stored using the JSON structure above.

# Architecture

Use clean architecture.

Suggested folders:

```text
src/
  app/
  components/
  features/
  lib/
  models/
  repositories/
  services/
  validators/
  tests/
```

# Validation

Use Zod.

Validate:

* quiz schema
* question schema
* answer submissions

# API Endpoints

Create:

GET /api/quizzes

GET /api/quizzes/[id]

POST /api/quizzes/[id]/submit

Submission endpoint returns:

```json
{
  "score": 8,
  "percentage": 80,
  "passed": true
}
```

# Tests

Implement tests for:

Quiz Service

* load quiz
* calculate score
* pass/fail logic

Validation

* valid quiz schema
* invalid quiz schema

API

* submit quiz endpoint

Use Vitest.

# Error Handling

Create:

* custom error classes
* global error handling
* friendly UI states

# Loading States

Create skeleton loaders for:

* quizzes page
* quiz page
* results page

# Empty States

Handle:

* no quizzes
* quiz not found
* invalid submission

# Documentation

Generate:

README.md

Include:

* project overview
* architecture
* setup
* environment variables
* testing instructions
* deployment instructions

# Deliverables

Generate all code.

Generate all files.

Generate folder structure.

Generate package.json.

Generate environment variable examples.

Generate MongoDB setup instructions.

Generate seed scripts.

Generate tests.

Generate complete implementation.

Do not provide pseudocode.

Do not provide partial snippets.

Generate actual production-ready code.

If any configuration value is required (such as MongoDB connection string), ask for it only after generating the implementation plan and identifying the exact environment variables needed.


Prompt 2 

Implement the complete JSON-driven backend.

Requirements:
- Store all quizzes in MongoDB
- No quiz content hardcoded in React components
- Quiz structure must follow:

{
  "id": "",
  "title": "",
  "description": "",
  "passingScore": 80,
  "questions": []
}

Create:
- Quiz model
- Repository layer
- Service layer
- Seed system using data/quizzes.json
- API routes

Endpoints:
GET /api/quizzes
GET /api/quizzes/[id]
POST /api/quizzes/[id]/submit

Implement score calculation and pass/fail logic.

Generate:
- data/quizzes.json
- seed script
- API handlers
- validation
- error handling

Do not build UI yet.

Prompt 3

Build the complete frontend experience.

Design Inspiration:
- Inspired by Wayground's layout, card design, spacing, and smooth interactions
- Do not clone Wayground
- Create an original design

Theme:

Primary:
#0F4C81

Secondary:
#2F80ED

Background:
#FFFFFF

Accent:
#EAF4FF

Text:
#1E293B

Visual Style:
- Modern SaaS
- Clean and professional
- Rounded cards
- Subtle shadows
- Smooth animations
- Fully responsive
- Accessibility-friendly

Use Framer Motion for:
- Page transitions
- Card hover animations
- Question transitions
- Progress animations
- Result animations

Create the following pages:

1. Landing Page

Requirements:
- Attractive hero section
- Call-to-action buttons
- Featured quizzes section
- How it works section
- Benefits section
- Responsive design

2. Quiz List Page

Route:
/quizzes

Requirements:
- Fetch quizzes from API
- Display quiz cards dynamically
- Loading state
- Empty state
- Hover effects

3. Quiz Welcome Page

Route:
/quiz/[id]

Display:
- Title
- Description
- Question count
- Passing score
- Start Quiz button

4. Quiz Taking Page

Route:
/quiz/[id]/play

Requirements:
- Dynamic question rendering
- Progress bar
- Question counter
- Answer state management
- Smooth transitions

Supported question types:
- multiple_choice
- true_false
- free_text

Create a reusable QuestionRenderer component.

No hardcoded questions.

Questions must be rendered entirely from API data.

5. Results Page

Requirements:
- Score
- Percentage
- Pass/Fail
- Correct answers
- Incorrect answers
- Retry quiz

Create reusable components:

- QuestionRenderer
- QuizCard
- ProgressBar
- ResultSummary
- LoadingSkeleton

The UI should feel polished, modern, and suitable for a hackathon demo.

Prompt 4
seed.ts should be like this 
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "quizzes.json");

const raw = await fs.readFile(filePath, "utf8");
const quizzes = JSON.parse(raw);

const docs = quizzes.map((q) => quizSchema.parse(q));

await QuizModel.insertMany(docs);

The flow is like this 
quizzes.json
      ↓
seed.ts
      ↓
MongoDB
      ↓
API
      ↓
Frontend

seed.ts should only 
1. Read JSON file
2. Validate via Zod
3. Insert into MongoDB

and then this should be fully JSON driven


Prompt 5
I will deploy to vercel and this is the error 
Running build in Washington, D.C., USA (East) – iad1
Build machine configuration: 2 cores, 8 GB
Cloning github.com/crsgh/CrsQuiz (Branch: master, Commit: 300b679)
Previous build caches not available.
Cloning completed: 287.000ms
Running "vercel build"
Vercel CLI 54.7.1
Detected `pnpm-lock.yaml` 9 which may be generated by pnpm@9.x or pnpm@10.x
Using pnpm@10.x based on project creation date
To use pnpm@9.x, manually opt in using corepack (https://vercel.com/docs/deployments/configure-a-build#corepack)
Installing dependencies...
 ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with <ROOT>/package.json
Note that in CI environments this setting is true by default. If you still need to run install in such cases, use "pnpm install --no-frozen-lockfile"


Prompt 6 
Finalize the project and prepare it for deployment.

Testing Requirements:

Quiz Service:
- Load quiz
- Calculate score
- Pass/fail logic

Validation:
- Valid quiz schema
- Invalid quiz schema

API:
- Get quizzes
- Get quiz by id
- Submit quiz

Frontend:
- Question rendering
- Results rendering

Improve:

- Accessibility
- Error boundaries
- Mobile responsiveness
- Loading skeletons
- Empty states
- Performance optimization

Generate:

README.md

Include:
- Project overview
- Architecture overview
- Folder structure
- Environment setup
- MongoDB setup
- Seeding instructions
- Testing instructions
- Deployment instructions


Perform a final audit and verify all requirements are satisfied:

✓ Landing page
✓ Quiz list page
✓ Quiz welcome page
✓ Quiz taking page
✓ Results page
✓ JSON-driven quiz content
✓ MongoDB storage
✓ Dynamic rendering
✓ Dynamic score calculation
✓ Pass/fail evaluation
✓ Unit tests
✓ Responsive design
✓ Vercel-ready deployment

Identify and implement any missing functionality required to make the application production-ready.




