<script setup lang="ts">
import { object, string, number } from 'yup'
import type { InferType } from 'yup'

import { reactive, defineEmits } from 'vue'

// Определяем тип события формы
type FormSubmitEvent<T> = {
  data: T
}

const emit = defineEmits(['register'])

// Схема валидации
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

// Отправка формы (вызывает событие register)
function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('register', event.data)
}
</script>
