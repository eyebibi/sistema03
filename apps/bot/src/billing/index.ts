import { prisma } from '@discly/db';
import type { UserPlan } from '@discly/db';

export function getTokensPerCredit(plan: UserPlan): number {
  return plan === 'COMPLETE' ? 1000 : 500;
}

function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

export function estimatePromptCost(text: string, plan: UserPlan): number {
  return Math.ceil(estimateTokenCount(text) / getTokensPerCredit(plan));
}

export interface DeductCostParams {
  discordUserId: string;
  totalTokens: number;
  plan: UserPlan;
}

export async function deductCost(params: DeductCostParams): Promise<void> {
  const cost = Math.ceil(params.totalTokens / getTokensPerCredit(params.plan));
  console.log("real cost: ", cost)
  await prisma.user.updateMany({
    where: { discordUserId: params.discordUserId },
    data: { credits: { decrement: cost } },
  });
}
