import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Cleans existing data
  await prisma.card.deleteMany();
  await prisma.list.deleteMany();
  await prisma.board.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create user
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
    },
  });

  // 3. Create board
  const board = await prisma.board.create({
    data: {
      title: "My First Board",
      userId: user.id,
    },
  });

  // 4. Create lists
  const todoList = await prisma.list.create({
    data: {
      title: "Todo",
      boardId: board.id,
    },
  });

  const doingList = await prisma.list.create({
    data: {
      title: "Doing",
      boardId: board.id,
    },
  });

  const doneList = await prisma.list.create({
    data: {
      title: "Done",
      boardId: board.id,
    },
  });

  // 5. Create cards (with ordering via position)
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