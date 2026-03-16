import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.update({
    where: { email: 'admin@example.com' },
    data: { role: 'ADMIN' },
  });
  console.log('User upgraded to ADMIN');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
