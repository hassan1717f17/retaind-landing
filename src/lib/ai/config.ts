// src/lib/ai/config.ts
//
// Amazon Bedrock model configuration (via the Vercel AI SDK).
//   - region        — AWS region the Bedrock models are invoked in. Env: AWS_REGION.
//   - defaultModel  — report/summary generation. Env: AI_MODEL_ID.
//                     Default: Claude 3.5 Sonnet.
//
// Credentials are read from the standard AWS environment variables
// (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY) by the Bedrock provider.
export const AI_CONFIG = {
  region: process.env.AWS_REGION ?? "us-east-1",
  defaultModel:
    process.env.AI_MODEL_ID ??
    "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
  temperature: 0.7,
} as const;
