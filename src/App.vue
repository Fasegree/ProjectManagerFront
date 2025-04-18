
<template>
  <Header></Header>
  <main class="grid grid-cols-[1fr_3fr] gap-[34px]">
     <Menu></Menu>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Projects/Header/Header.vue';
import Menu from './components/Projects/Menu/Menu.vue';
import { auth, onAuthStateChanged } from './firebase';

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    } else {
      console.log('No user is logged in');
    }
  });
})
</script>


