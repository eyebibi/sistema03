import { createLLMProvider } from '../llm/factory.js';
import { ConfigureServerAgent } from './ConfigureServerAgent.js';
import { EditServerAgent } from './EditServerAgent.js';

export function createConfigureServerAgent(): ConfigureServerAgent {
  return new ConfigureServerAgent(createLLMProvider());
}

export function createEditServerAgent(): EditServerAgent {
  return new EditServerAgent(createLLMProvider());
}
