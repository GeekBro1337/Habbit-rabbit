<template>
  <div class="min-h-screen flex flex-col">
    <!-- Шапка с заголовком и переключателем темы -->
    <header class="bg-gradient-to-r from-blue-500 to-indigo-500 py-10 text-center relative">
      <!-- Переключатель темы -->
      <button @click="toggleTheme" class="absolute top-4 right-4 text-white px-3 py-1 rounded border border-white">
        {{ colorMode.value === 'dark' ? 'Светлая тема' : 'Тёмная тема' }}
      </button>
      <h1 class="text-5xl font-bold text-white">Habbit Rabbit</h1>
      <p class="mt-4 text-xl text-white">
        Следи, отслеживай и систематизируй свои привычки, а также достигай желаемых результатов!
      </p>
    </header>

    <!-- Основной контент -->
    <main class="flex-grow container mx-auto px-4 py-10">
      <!-- Секция с особенностями -->
      <section class="my-10">
        <h2 class="text-3xl font-bold text-center mb-6">Особенности</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white dark:bg-gray-800 shadow rounded">
            <h3 class="text-xl font-semibold mb-2">Рейтинги пользователей</h3>
            <p>Сравнивай свои достижения с другими и стремись к лучшим результатам!</p>
          </div>
          <div class="p-6 bg-white dark:bg-gray-800 shadow rounded">
            <h3 class="text-xl font-semibold mb-2">Персонализация</h3>
            <p>Настраивай внешний вид и функционал под свои нужды.</p>
          </div>
          <div class="p-6 bg-white dark:bg-gray-800 shadow rounded">
            <h3 class="text-xl font-semibold mb-2">Удобство использования</h3>
            <p>Интуитивно понятный интерфейс для быстрого доступа ко всем функциям.</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Футер с кнопкой регистрации -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-6 text-center">
      <UButton color="primary" size="md" @click="register">
        Зарегистрироваться сейчас
      </UButton>
    </footer>
  </div>
</template>

<script setup>
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

function register() {
  navigateTo('/register') // SPA-навигатор Nuxt
}
</script>
