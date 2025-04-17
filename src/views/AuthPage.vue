<template>
  <div  class="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center text-[#00f0ff] text-center font-orbitron">
    <h1 class="text-2xl font-semibold">🌌 Добро пожаловать в FutureApp</h1>

    <div v-if="user" class="grid">
      <img :src="user.photoURL" alt="avatar" class="justify-self-center rounded-full w-20 my-4 " />
      <p>Привет, {{ user.displayName }}!</p>
      <div class="grid">
        <button @click="goToDashboard">Перейти в панель</button>
        <button @click="goToCalendar">Перейти в календарь</button>
        <button @click="goToNotes">Перейти к заметкам</button>
      </div>
    </div>

    <div v-else>
      <button @click="loginWithGoogle">🚀 Войти через Google</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  db,
  ref as dbRef,
  set
} from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref<any | null>(null)

onMounted(() => {
  onAuthStateChanged(auth, (u) => {
    user.value = u
    if (u) {
      set(dbRef(db, 'users/' + u.uid), {
        name: u.displayName,
        email: u.email,
        photo: u.photoURL
      })
    }
  })
})

const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider)
}
const goToNotes = () => {
  router.push('/counter')
}
const goToCalendar = () => {
  router.push('/calendar')
}
const goToDashboard = () => {
  router.push('/dashboard')
}
</script>
