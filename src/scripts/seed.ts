import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually for standalone script execution
const envPath = resolve(process.cwd(), ".env.local");
try {
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // .env.local not found, rely on existing env vars
}

import { connectToMongo } from "@/lib/mongodb";
import { seedQuizzesIfEmpty } from "@/lib/seed";

async function main() {
  console.log("Connecting to MongoDB...");
  await connectToMongo();
  console.log("Connected. Seeding quizzes...");
  await seedQuizzesIfEmpty();
  console.log("Done! Quizzes seeded successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

