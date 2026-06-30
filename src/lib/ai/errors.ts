// src/lib/ai/errors.ts
export type AIErrorCode =
  | "PROVIDER_ERROR"
  | "RATE_LIMITED"
  | "CONTEXT_TOO_LONG"
  | "INVALID_RESPONSE";

export class AIError extends Error {
  constructor(
    message: string,
    readonly code: AIErrorCode,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "AIError";
  }
}
