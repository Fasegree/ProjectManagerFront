<template>
  <div v-if="!currentUser">
    <p class="text-gray-500">Loading...</p>
  </div>

  <div v-else="currentUser">
    <h1 class="text-2xl font-semibold">Welcome, {{ name }}!</h1>
    <p class="text-gray-600">Ready for new projects? 🛠️</p>
    <RouterLink to="/projects">
      <Button class="mt-5">Go to projects</Button>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "../../composables/useAuth";
import Button from "@/components/ui/button/Button.vue";

const { currentUser } = useAuth();
const name = currentUser.value?.displayName;
onMounted(() => {});
</script>
