<script setup lang="ts">
import { object, string } from 'yup'
import type { InferType } from 'yup'
import { reactive, defineEmits } from 'vue'

// Определяем emit для передачи данных родителю
const emit = defineEmits(['login'])

// Определяем схему валидации через Yup
const schema = object({
  email: string().email('Некорректный email').required('Email обязателен'),
  password: string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен')
})

type Schema = InferType<typeof schema>

// Состояние формы
const state = reactive<Schema>({
  email: '',
  password: ''
})

// Функция отправки формы
function onSubmit(event: { data: Schema }) {
  emit('login', event.data) // Передаём данные в родительский компонент
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <!-- Email -->
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" placeholder="Введите email" />
    </UFormGroup>

    <!-- Пароль -->
    <UFormGroup label="Пароль" name="password">
      <UInput v-model="state.password" type="password" placeholder="Введите пароль" />
    </UFormGroup>

    <!-- Кнопка входа -->
    <UButton type="submit" color="primary" size="md" block>
      Войти
    </UButton>
  </UForm>
</template>