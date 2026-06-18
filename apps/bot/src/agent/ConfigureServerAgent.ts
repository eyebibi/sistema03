import type { LLMProvider } from '../llm/types.js';
import type { Agent, AgentResult } from './types.js';
import type { ConfigureServerInput, ServerConfig } from '../../command-types/configureServer.js';
import { promptMessage, promptSystemMessage } from '../../helpers/prompt.js';

export class ConfigureServerAgent implements Agent<ConfigureServerInput, ServerConfig> {
  constructor(private llmProvider: LLMProvider) { }

  async execute(input: ConfigureServerInput): Promise<AgentResult<ServerConfig>> {
    const userPrompt = `${promptMessage}\n${input.description}\n${input.withEmojis
        ? 'Add emojis on channel names.'
        : 'No emojis on channel names.'
      }`;

    const result = await this.llmProvider.generate(
      [
        { role: 'system', content: promptSystemMessage },
        { role: 'user', content: userPrompt },
      ],
      {
        model: 'deepseek-v4-flash-free',
        maxTokens: 5000,
        temperature: 1,
        topP: 1,
      }
    );

    const cleaned = result.content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    try {
      const output = JSON.parse(cleaned) as ServerConfig;
      return { output, totalTokens: result.totalTokens };
    } catch (error) {
      throw new Error('Failed to parse LLM response as JSON');
    }
  }
}
