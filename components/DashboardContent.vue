<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ activeTab: string }>()
</script>

<template>
  <UCard class="p-6">
    <template v-if="activeTab === 'taskList'">
      <h2 class="text-2xl font-bold mb-4">Список задач</h2>
      <p>Здесь отображается общий список задач пользователя.</p>
    </template>
    <template v-else-if="activeTab === 'calendar'">
      <h2 class="text-2xl font-bold mb-4">Календарь задач</h2>
      <p>Здесь будет календарь с помеченными задачами.</p>
    </template>
    <template v-else-if="activeTab === 'urgent'">
      <h2 class="text-2xl font-bold mb-4">Срочные задачи</h2>
      <p>Здесь отображаются задачи, срок выполнения которых скоро истекает.</p>
    </template>
    <template v-else>
      <p>Выберите вкладку.</p>
    </template>
  </UCard>
</template>
