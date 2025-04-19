<template>
  <div v-if="!currentUser">
    <p class="text-gray-500">Загрузка...</p>
  </div>

  <div v-else="currentUser">
    <h1 class="text-2xl font-semibold">Добро пожаловать, {{ name }}!</h1>
    <p class="text-gray-600">Готов к новым проектам? 🛠️</p>
    <RouterLink to="/projects">
      <button
        class="text-lg font-semibold rounded-3xl bg-gray-300 hover:bg-gray-400 mt-5"
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
