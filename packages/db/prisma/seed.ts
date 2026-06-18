import { prisma } from '../src/index.ts';
import "dotenv/config"
import { randomUUID } from "node:crypto"

async function main() {
  const discordUserId = process.env.SEED_DISCORD_USER_ID;

  if (!discordUserId) {
    console.error('SEED_DISCORD_USER_ID environment variable required');
    process.exit(1);
  }

  await prisma.user.upsert({
    where: { email: 'seed@discly.dev' },
    update: { discordUserId },
    create: {
      id: randomUUID(),
      email: 'seed@discly.dev',
      password: '',
      plan: 'BASIC',
      credits: 100,
      discordUserId,
      updatedAt: new Date(),
    },
  });

  console.log('Seed user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
