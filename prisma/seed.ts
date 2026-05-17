import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.card.deleteMany();
  await prisma.list.deleteMany();
  await prisma.board.deleteMany();
  await prisma.user.deleteMany();

  // Create user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  // Create board
  const board = await prisma.board.create({
    data: {
      title: "My First Board",
      userId: user.id,
    },
  });

  // Create lists
  const [todoList, doingList, doneList] = await Promise.all([
    prisma.list.create({
      data: { title: "Todo", boardId: board.id },
    }),
    prisma.list.create({
      data: { title: "Doing", boardId: board.id },
    }),
    prisma.list.create({
      data: { title: "Done", boardId: board.id },
    }),
  ]);

  // Create cards
  await prisma.card.createMany({
    data: [
      {
        title: "Set up project",
        content: "Initial setup of Next.js + Prisma",
        listId: todoList.id,
        position: 1,
      },
      {
        title: "Design database schema",
        content: "Define core models",
        listId: todoList.id,
        position: 2,
      },
      {
        title: "Build API routes",
        listId: doingList.id,
        position: 1,
      },
      {
        title: "Initial deployment",
        listId: doneList.id,
        position: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });