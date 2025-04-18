<template>
  <div v-if="!currentUser">
    <p class="text-gray-500">Загрузка...</p>
  </div>

  <div v-else="currentUser">
    <h1 class="text-2xl font-semibold">Добро пожаловать, {{ name }}!</h1>
    <p class="text-gray-600">Готов к новым проектам? 🛠️</p>
    <RouterLink to="/projects">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Перейти к проектам
      </button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "../../composables/useAuth";

const { currentUser } = useAuth();
const name = currentUser.value?.displayName;
onMounted(() => {});
</script>
