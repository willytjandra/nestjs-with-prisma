import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {},
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: 'password-sabin',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {},
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: 'password-alex',
    },
  });

  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: { authorId: user1.id },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit' },
    update: { authorId: user2.id },
    create: {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima, saepe blanditiis expedita esse voluptatibus...',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima, saepe blanditiis expedita esse voluptatibus. Nemo, architecto? Odio magni sapiente, omnis quas quia sit. Nostrum vel animi eum earum adipisci!',
      published: true,
      authorId: user2.id,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log(user1, user2, post1, post2, post3);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
