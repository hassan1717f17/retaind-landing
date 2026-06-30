// src/lib/ai/types.ts
export interface AICompleteRequest {
  system?: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AICompleteResponse {
  text: string;
  usage: { inputTokens: number; outputTokens: number };
}
