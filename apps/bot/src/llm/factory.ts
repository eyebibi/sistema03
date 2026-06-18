import type { LLMProvider } from './types.js';
import { OpenCodeProvider } from './OpenCodeProvider.js';

export function createLLMProvider(): LLMProvider {
  return new OpenCodeProvider();
}
