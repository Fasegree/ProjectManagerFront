
<template>
  qwe
  <!-- <Header></Header>
  <main class="grid grid-cols-[1fr_3fr] gap-[34px]">
    <Menu></Menu>
    
    <div v-if="isLoading">
      <p class="text-gray-400">Загрузка...</p>
    </div>
    
    <div v-else-if="currentUser" class="bg-gray-100 px-16 rounded-3xl mt-5 py-14">
      <RouterView />
    </div>

    <div v-else>
      <p class="text-red-500">Пожалуйста, войдите в систему</p>
    </div>
  </main> -->
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from './components/Projects/Header/Header.vue';
import Menu from './components/Projects/Menu/Menu.vue';
import { auth, onAuthStateChanged } from './firebase';

const currentUser = ref()
const isLoading = ref(true)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    isLoading.value = false
    if (!user) {
      console.log('❌ Пользователь не авторизован')
    }
  });
})
</script>


