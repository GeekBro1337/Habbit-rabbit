// server/api/auth/login.post.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export default defineEventHandler(async (event) => {
  try {
    // Читаем тело запроса (email и password)
    const body = await readBody(event)
    const { email, password } = body

    // Проверяем, есть ли пользователь с таким email
    const authData = await prisma.auth.findUnique({
      where: { email },
      include: { user: true } // Подтягиваем пользователя
    })

    if (!authData) {
      throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
    }

    // Проверяем, совпадает ли пароль
    const isPasswordValid = await bcrypt.compare(password, authData.password)
    if (!isPasswordValid) {
      throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
    }

    // Формируем ответ без пароля
    const userResponse = {
      id: authData.user.id,
      username: authData.user.username,
      email: authData.email
    }

    const token = jwt.sign({ userId: authData.user.id }, JWT_SECRET, {
      expiresIn: '1h'
    })

    return {
      message: 'Вход выполнен успешно!',
      user: userResponse,
      token
    }
  } catch (error: any) {
    throw createError({ statusCode: 500, message: error.message })
  }
})
