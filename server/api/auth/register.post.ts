import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export default defineEventHandler(async (event) => {
  // Считываем данные из тела запроса
  const body = await readBody(event)

  const {
    username,
    email,
    password,
    pinCode,
    age,
    gender,
  } = body

  // 1. Проверяем, существует ли пользователь с таким username
  const existingUser = await prisma.user.findUnique({
    where: { username }
  })
  if (existingUser) {
    throw createError({ statusCode: 400, message: 'Пользователь с таким username уже существует' })
  }

  // 2. Проверяем, существует ли запись в Auth с таким email
  const existingAuth = await prisma.auth.findUnique({
    where: { email }
  })
  if (existingAuth) {
    throw createError({ statusCode: 400, message: 'Email уже используется' })
  }

  // 3. Хешируем пароль с помощью bcrypt
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // 4. Создаём пользователя с вложенной записью в Auth
    const newUser = await prisma.user.create({
      data: {
        username,
        age,
        gender,
        auth: {
          create: {
            email,
            password: hashedPassword,
            pinCode,
          }
        }
      },
      include: { auth: true }
    })

    // Убираем пароль из ответа (чтобы не светить хеш)
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.auth?.email,
      // Можно вернуть любые нужные поля
      // пароля тут нет!
    }

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: '1h'
    })

    // 5. Возвращаем успех
    return {
      message: 'Регистрация прошла успешно!',
      user: userResponse,
      token
    }

  } catch (error: any) {
    // Если что-то пошло не так (уникальные поля, и т.д.)
    throw createError({ statusCode: 500, message: error.message })
  }
})
