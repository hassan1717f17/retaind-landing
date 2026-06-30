// src/lib/ai/client.ts
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { generateText } from "ai";
import { AI_CONFIG } from "./config";
import { AIError } from "./errors";
import type { AICompleteRequest, AICompleteResponse } from "./types";

export class AIClient {
  private readonly model;

  constructor(modelId: string = AI_CONFIG.defaultModel) {
    const provider = createAmazonBedrock({ region: AI_CONFIG.region });
    this.model = provider(modelId);
  }

  async complete(req: AICompleteRequest): Promise<AICompleteResponse> {
    try {
      const result = await generateText({
        model: this.model,
        system: req.system,
        prompt: req.prompt,
        maxOutputTokens: req.maxTokens ?? 8192,
        temperature: req.temperature ?? AI_CONFIG.temperature,
      });
      return {
        text: result.text,
        usage: {
          inputTokens: result.usage.inputTokens ?? 0,
          outputTokens: result.usage.outputTokens ?? 0,
        },
      };
    } catch (err) {
      throw mapProviderError(err);
    }
  }
}

function mapProviderError(err: unknown): AIError {
  if (err instanceof AIError) return err;
  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  if (lower.includes("too many tokens") || lower.includes("context length")) {
    return new AIError(msg, "CONTEXT_TOO_LONG", err);
  }
  if (lower.includes("throttl") || lower.includes("rate limit") || msg.includes("429")) {
    return new AIError(msg, "RATE_LIMITED", err);
  }
  return new AIError(msg, "PROVIDER_ERROR", err);
}
