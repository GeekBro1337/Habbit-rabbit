<script setup lang="ts">
import { defineProps } from 'vue'

// 🎯 **Интерфейс задачи (Habit)**
interface Task {
  id: number
  title: string
  description?: string
  reminderTime?: string
  habitType: 'DAILY' | 'WEEKLY' | 'REGULAR' | 'DESIRED_RESULT'
  rating: number
  color?: string
  status: 'DONE' | 'NOT_DONE' | 'IN_PROGRESS' | 'ABANDONED'
  visibility: 'PRIVATE' | 'PUBLIC' | 'SHARED'
}

// ✅ Используем интерфейс в `defineProps`
const props = defineProps<{
  activeTab: string,
  tasks: Task[] // Используем Task вместо `any[]`
}>()

// Функция для расшаривания задачи
async function shareTask(taskId: number, userId: number) {
  try {
    await $fetch<{ message: string }>('/api/tasks/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { habitId: taskId, userIdToShare: userId }
    })
    alert('Задача успешно расшарена')
  } catch (error) {
    if (error instanceof Error) {
      alert(`Ошибка: ${error.message}`)
    } else {
      alert('Произошла неизвестная ошибка')
    }
  }
}

// Функция для удаления доступа
async function unshareTask(taskId: number, userId: number) {
  try {
    await $fetch<{ message: string }>('/api/tasks/unshare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { habitId: taskId, userIdToRemove: userId }
    })
    alert('Доступ к задаче удалён')
  } catch (error) {
    if (error instanceof Error) {
      alert(`Ошибка: ${error.message}`)
    } else {
      alert('Произошла неизвестная ошибка')
    }
  }
}
</script>

<template>
  <div>
    <template v-if="activeTab === 'taskList'">
      <h2 class="text-2xl font-bold mb-4">Список задач</h2>
      <ul>
        <li v-for="task in tasks" :key="task.id" class="mb-2 flex justify-between">
          <div>
            <strong>{{ task.title }}</strong> - {{ task.status }}
          </div>
          <div>
            <UButton color="primary" size="sm" @click="shareTask(task.id, 2)">Расшарить</UButton>
            <UButton color="red" size="sm" @click="unshareTask(task.id, 2)">Удалить доступ</UButton>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>
