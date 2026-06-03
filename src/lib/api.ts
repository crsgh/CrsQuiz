import { AppError } from "@/lib/errors";

export function jsonError(err: unknown) {
  if (err instanceof AppError) {
    return Response.json({ error: { code: err.code, message: err.message } }, { status: err.status });
  }

  return Response.json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong" } }, { status: 500 });
}

