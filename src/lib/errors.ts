export class AppError extends Error {
  readonly code: string;
  readonly status: number;

  constructor(message: string, opts: { code: string; status: number; cause?: unknown }) {
    super(message, { cause: opts.cause });
    this.code = opts.code;
    this.status = opts.status;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, { code: "NOT_FOUND", status: 404 });
  }
}

export class ValidationError extends AppError {
  readonly details?: unknown;

  constructor(message = "Invalid input", opts?: { details?: unknown; cause?: unknown }) {
    super(message, { code: "VALIDATION_ERROR", status: 400, cause: opts?.cause });
    this.details = opts?.details;
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database error", cause?: unknown) {
    super(message, { code: "DATABASE_ERROR", status: 500, cause });
  }
}
