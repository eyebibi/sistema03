export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMOptions {
  model: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

export interface LLMResult {
  content: string;
  totalTokens: number;
}

export interface LLMProvider {
  generate(messages: LLMMessage[], options?: LLMOptions): Promise<LLMResult>;
}
