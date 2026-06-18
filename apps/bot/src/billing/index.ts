import { prisma } from '@discly/db';

export const TOKENS_PER_CREDIT = 500;

function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

export function estimatePromptCost(text: string): number {
  return Math.ceil(estimateTokenCount(text) / TOKENS_PER_CREDIT);
}

export interface DeductCostParams {
  discordUserId: string;
  totalTokens: number;
}

export async function deductCost(params: DeductCostParams): Promise<void> {
  const cost = Math.ceil(params.totalTokens / TOKENS_PER_CREDIT);
  console.log("real cost: ", cost)
  await prisma.user.updateMany({
    where: { discordUserId: params.discordUserId },
    data: { credits: { decrement: cost } },
  });
}
