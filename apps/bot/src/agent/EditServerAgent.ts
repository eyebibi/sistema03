import type { LLMProvider } from '../llm/types.js';
import type { Agent, AgentResult } from './types.js';
import { outputSchema, type ActionType } from '../schemas/index.js';
import { formatSchemaInstructions } from '../schemas/index.js';

export const SYSTEM_MESSAGE = `Você é um agente especialista em editar servidores do Discord. Sua tarefa é analisar o pedido de um usuário e, com base nisso, gerar uma lista de
    ações que devem ser executadas em ordem por um bot que está no servidor para aplicar as alterações pedidas.
    É importante que você siga o mesmo formato de ações possíveis que lhe será mostrado. Você SEMPRE deve responder apenas com o JSON, e nada mais, pois o bot somente entende JSON nos formatos especificados.
    Lembre-se que o usuário irá lhe fornecer um esboço do que o servidor dele tem no momento da mensagem, lhe dizendo quais canais, cargos e categorias existem.
    Você deve, sempre que for referenciar um desses, usar o exato mesmo nome dado pelo usuário.

    Ao definir permissões de canais, use os campos rolePermissions (criar canal) ou newRolePermissions (editar canal).
    Cada campo recebe uma lista de objetos com "roleName" (nome exato do cargo) e "permissions" (mapa de permissões).
    Para cada permissão no mapa, use true para permitir, false para negar, ou omita/null para herdar o padrão da categoria.
    Exemplo: { "roleName": "Admin", "permissions": { "ViewChannel": true, "SendMessages": true, "ManageMessages": true } }`;

export const USER_TEMPLATE = `Pedido do usuário:
{user_message}

Possíveis ações:
{possible_actions}`;

export class EditServerAgent implements Agent<string, ActionType[]> {
  constructor(private llmProvider: LLMProvider) { }

  async execute(input: string): Promise<AgentResult<ActionType[]>> {
    console.log("tamo aqui")
    const userMessage = USER_TEMPLATE
      .replace('{user_message}', input)
      .replace('{possible_actions}', formatSchemaInstructions());

    const result = await this.llmProvider.generate(
      [
        { role: 'system', content: SYSTEM_MESSAGE },
        { role: 'user', content: userMessage },
      ],
      {
        model: 'deepseek-v4-flash-free',
        maxTokens: 5000,
        temperature: 1,
        topP: 1,
      }
    );

    console.log("result: ", result)

    const cleaned = result.content
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    const output = outputSchema.parse(parsed) as ActionType[];

    return { output, totalTokens: result.totalTokens };
  }
}
