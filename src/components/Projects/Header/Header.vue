<template>
  <div
    class="flex justify-between gap-3 h-32 items-center bg-slate-100 rounded-md px-10"
  >
    <!-- логотип -->
    <div class="flex gap-3">
      <div class="cursor-pointer">
        <h2 class="font-aeroport font-semibold text-2xl uppercase">
          TROOD COMUNITY
        </h2>
      </div>
    </div>

    <!-- навигация корзина и профиль -->

    <div class="flex gap-3 items-center">
      <div class="cursor-pointer" @click="toogleCart">
        <BellIcon class="size-5" />
      </div>
      <div class="cursor-pointer" @click="toogleProfile">
        <ChatBubbleLeftIcon class="size-5" />
      </div>
      <div v-if="user" class="flex items-center gap-3">
        <img
          class="size-10 rounded-full bg-cyan-400"
          :src="user?.photoURL || undefined"
          alt="avatar"
        />
        <span class="cursor-default">{{ user?.displayName }}</span>
      </div>
      <div v-else>
        <button
          class="text-lg font-semibold rounded-3xl bg-gray-200 hover:bg-gray-300"
          @click="loginWithGoogle"
        >
          login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BellIcon, ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { auth, provider, signInWithPopup } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth/cordova";
import type { User } from "firebase/auth";

const searchInputRef = ref<HTMLInputElement | null>(null);
const isModalCartOpen = ref(false);
const isModalProfileOpen = ref(false);

const user = ref<User | null>(null);
onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
    // console.log('User:', user.value);
  });
});
function toogleCart() {
  isModalCartOpen.value = !isModalCartOpen.value;
}
function toogleProfile() {
  isModalProfileOpen.value = !isModalProfileOpen.value;
}
function search() {
  console.log("Search", searchInputRef.value?.value);
}
const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
</script>
