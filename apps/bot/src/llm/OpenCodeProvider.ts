import type { LLMProvider, LLMMessage, LLMOptions, LLMResult } from './types.js';

export class OpenCodeProvider implements LLMProvider {
  async generate(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResult> {
    const response = await fetch('https://opencode.ai/zen/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options?.model,
        messages,
        stream: false,
        thinking: {
          type: "disabled"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenCode API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as { choices: Array<{ message: { content: string } }>; usage: { total_tokens: number } };
    console.log("LLM DATA: ", data)

    const content = data.choices[0]?.message?.content;
    if (content === undefined) {
      throw new Error('OpenCode API returned empty response');
    }

    return { content, totalTokens: data.usage.total_tokens };
  }
}
