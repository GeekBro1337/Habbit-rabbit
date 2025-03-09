import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = 1
  // Выбираем задачи, у которых задано время напоминания
  const tasks = await prisma.habit.findMany({
    where: {
      userId,
      reminderTime: { not: null }
    }
  })

  return { tasks }
})
