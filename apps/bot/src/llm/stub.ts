import type { LLMProvider, LLMMessage, LLMOptions, LLMResult } from './types.js';

export class StubProvider implements LLMProvider {
  async generate(_messages: LLMMessage[], _options?: LLMOptions): Promise<LLMResult> {
    throw new Error('LLMProvider not implemented. Use createLLMProvider() from factory after setting up a real provider.');
  }
}
