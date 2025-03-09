<script setup lang="ts">
import { object, string, number } from 'yup'
import type { InferType } from 'yup'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormSubmitEvent } from '#ui/types'


const router = useRouter()

// Схема валидации для формы регистрации
const schema = object({
  username: string().required('Имя пользователя обязательно'),
  email: string().email('Некорректный email').required('Email обязателен'),
  password: string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
  pinCode: string().length(4, 'PIN-код должен содержать 4 цифры').required('PIN-код обязателен'),
  age: number().min(10, 'Минимальный возраст 10 лет').max(100, 'Максимальный возраст 100 лет').required('Возраст обязателен'),
  gender: string().oneOf(['male', 'female', 'other'], 'Выберите пол').required('Пол обязателен')
})

type Schema = InferType<typeof schema>

// Состояние формы
const state = reactive<Schema>({
  username: '',
  email: '',
  password: '',
  pinCode: '',
  age: 18,
  gender: 'male'
})

// Функция отправки формы
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event.data)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Ошибка при регистрации')
    }

    alert('Регистрация успешна!')

    // Перенаправляем пользователя на страницу входа
    router.push('/login')
  } catch (error: any) {
    alert(`Ошибка: ${error.message}`)
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold text-center mb-4">Регистрация</h2>

    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <!-- Имя пользователя -->
      <UFormGroup label="Имя пользователя" name="username">
        <UInput v-model="state.username" placeholder="Введите имя" />
      </UFormGroup>

      <!-- Email -->
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="email" placeholder="Введите email" />
      </UFormGroup>

      <!-- Пароль -->
      <UFormGroup label="Пароль" name="password">
        <UInput v-model="state.password" type="password" placeholder="Введите пароль" />
      </UFormGroup>

      <!-- PIN-код -->
      <UFormGroup label="PIN-код (4 цифры)" name="pinCode">
        <UInput v-model="state.pinCode" type="number" placeholder="1234" />
      </UFormGroup>

      <!-- Возраст -->
      <UFormGroup label="Возраст" name="age">
        <UInput v-model="state.age" type="number" placeholder="Введите возраст" />
      </UFormGroup>

      <!-- Пол -->
      <UFormGroup label="Пол" name="gender">
        <USelect v-model="state.gender" :options="[
          { label: 'Мужской', value: 'male' },
          { label: 'Женский', value: 'female' },
          { label: 'Другое', value: 'other' }
        ]" />
      </UFormGroup>

      <!-- Кнопка регистрации -->
      <UButton type="submit" color="primary" size="md" block>
        Зарегистрироваться
      </UButton>
    </UForm>

    <p class="text-center text-sm mt-4">
      Уже есть аккаунт? <NuxtLink to="/login" class="text-blue-500">Войти</NuxtLink>
    </p>
  </div>
</template>
