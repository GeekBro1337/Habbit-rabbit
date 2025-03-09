import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with test users...')

  // Примерные данные пользователей
  const users = [
    { username: 'Alice', email: 'alice@example.com' },
    { username: 'Bob', email: 'bob@example.com' },
    { username: 'Charlie', email: 'charlie@example.com' },
    { username: 'David', email: 'david@example.com' },
    { username: 'Emma', email: 'emma@example.com' },
    { username: 'Frank', email: 'frank@example.com' },
    { username: 'Grace', email: 'grace@example.com' },
    { username: 'Hannah', email: 'hannah@example.com' },
    { username: 'Isaac', email: 'isaac@example.com' },
    { username: 'Jack', email: 'jack@example.com' }
  ]

  for (const user of users) {
    const hashedPassword = await bcrypt.hash('password123', 10) // Хешируем пароль
    const pinCode = Math.floor(1000 + Math.random() * 9000).toString() // Генерируем 4-значный PIN

    await prisma.user.create({
      data: {
        username: user.username,
        auth: {
          create: {
            email: user.email,
            password: hashedPassword,
            pinCode: pinCode
          }
        }
      }
    })
  }

  console.log('✅ 10 пользователей добавлены!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
