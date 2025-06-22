<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '~/components/LoginForm.vue'

const router = useRouter()

// Функция обработки успешного входа
async function handleLogin(userData: { email: string, password: string }) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Ошибка при входе')
    }

    alert('Вход выполнен успешно!')

    // Сохраняем токен при наличии
    if (result.token) {
      localStorage.setItem('token', result.token)
    }

    // Перенаправляем пользователя в личный кабинет
    router.push('/dashboard')
  } catch (error) {
    alert(`Ошибка: ${(error as Error).message}`)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold text-center mb-4">Вход</h2>

    <!-- Дочерний компонент формы -->
    <LoginForm @login="handleLogin" />

    <p class="text-center text-sm mt-4">
      Нет аккаунта? <NuxtLink to="/register" class="text-blue-500">Зарегистрироваться</NuxtLink>
    </p>
  </div>
</template>
