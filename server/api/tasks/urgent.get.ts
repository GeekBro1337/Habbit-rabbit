import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = 1
  // Определяем временной промежуток для срочных задач (например, ближайшие 24 часа)
  const now = new Date()
  const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000)

  const tasks = await prisma.habit.findMany({
    where: {
      userId,
      reminderTime: {
        gte: now,
        lte: soon
      }
    }
  })

  return { tasks }
})
