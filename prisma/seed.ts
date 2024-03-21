import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit' },
    update: {},
    create: {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima, saepe blanditiis expedita esse voluptatibus...',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam minima, saepe blanditiis expedita esse voluptatibus. Nemo, architecto? Odio magni sapiente, omnis quas quia sit. Nostrum vel animi eum earum adipisci!',
      published: false,
    },
  });

  console.log(post1, post2);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
