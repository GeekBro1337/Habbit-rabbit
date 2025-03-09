import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = 1 // В реальном проекте получать из токена

  const tasks = await prisma.habit.findMany({
    where: {
      OR: [
        { userId }, // Приватные задачи
        { visibility: 'PUBLIC' }, // Публичные
        { sharedWith: { some: { userId } } } // Расшаренные пользователю
      ]
    },
    include: { sharedWith: true }
  })

  return { tasks }
})