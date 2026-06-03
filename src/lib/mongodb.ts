import mongoose from "mongoose";

import { DatabaseError } from "@/lib/errors";
import { seedQuizzesIfEmpty } from "@/lib/seed";

const globalForMongoose = globalThis as unknown as {
  mongooseConn?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
  quizzesSeeded?: boolean;
};

export async function connectToMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new DatabaseError("Missing MONGODB_URI environment variable");
  }

  if (!globalForMongoose.mongooseConn) {
    globalForMongoose.mongooseConn = { conn: null, promise: null };
  }

  if (globalForMongoose.mongooseConn.conn) return globalForMongoose.mongooseConn.conn;

  if (!globalForMongoose.mongooseConn.promise) {
    globalForMongoose.mongooseConn.promise = mongoose
      .connect(uri, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    globalForMongoose.mongooseConn.conn = await globalForMongoose.mongooseConn.promise;
    return globalForMongoose.mongooseConn.conn;
  } catch (err) {
    globalForMongoose.mongooseConn.promise = null;
    throw new DatabaseError("Failed to connect to MongoDB", err);
  }
}

export async function ensureSeeded() {
  if (globalForMongoose.quizzesSeeded) return;
  await connectToMongo();
  await seedQuizzesIfEmpty();
  globalForMongoose.quizzesSeeded = true;
}
