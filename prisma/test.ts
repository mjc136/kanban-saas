import "dotenv/config";

import { prisma } from "../src/lib/prisma.ts";

async function main() {
    const users = await prisma.user.findMany();
    console.log(users);

    const boards = await prisma.board.findMany({
        include: {
            lists: {
                include: {
                    cards: true,
                },
            },
        },
    });
    console.log(JSON.stringify(boards, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });