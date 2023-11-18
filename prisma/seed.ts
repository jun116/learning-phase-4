import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  const alice = await prisma.user.upsert({
    where: { email: 'alice@pbc.io' },
    update: {},
    create: {
      email: 'alice@pbc.io',
      name: 'Alice',
      pets: {
        create: {
          name: 'GIGI',
          imageUrl: 'https://cdn2.thecatapi.com/images/9u1.jpg',
          birthDate: new Date('2022-01-01'),
          gender: 'Male',
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@pbc.io' },
    update: {},
    create: {
      email: 'bob@pbc.io',
      name: 'Bob',
      pets: {
        create: [
          {
            name: 'MIAO',
            imageUrl: 'https://cdn2.thecatapi.com/images/716.jpg',
            birthDate: new Date('2023-10-01'),
            gender: 'Male',
          },
          {
            name: 'SNOW',
            imageUrl: 'https://cdn2.thecatapi.com/images/wJyw82pIl.jpg',
            birthDate: new Date('2021-05-11'),
            gender: 'Female',
          },
        ],
      },
    },
  })
  console.log({ alice, bob })
  console.log(`Seeding finished.`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
