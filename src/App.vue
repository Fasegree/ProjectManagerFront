<template>
  <Header/>
  <main class="grid grid-cols-[1fr_3fr] gap-[34px]">
    <Menu/>
    <div v-if="isLoading">
      <p class="text-gray-400">Загрузка...</p>
    </div>

    <div
      v-else-if="currentUser"
      class="bg-gray-100 px-16 rounded-3xl mt-5 py-14"
    >
      <RouterView />
    </div>

    <div v-else>
      <p class="text-red-500">Пожалуйста, войдите в систему</p>
    </div>
  </main>
  <Toaster />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { auth, onAuthStateChanged } from "./firebase";
import Toaster from "./components/ui/toast/Toaster.vue";
import { toast } from "vue-sonner";
import Header from "./components/others/Header/Header.vue";
import Menu from "./components/others/Menu/Menu.vue";

const currentUser = ref();
const isLoading = ref(true);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    isLoading.value = false;
    if (!user) {
      toast({ title: "❌ Пользователь не авторизован" });
    }
  });
});
</script>
