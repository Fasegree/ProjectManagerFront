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
      <div class="cursor-pointer" >
        <BellIcon class="size-5" />
      </div>
      <div class="cursor-pointer" >
        <ChatBubbleLeftIcon class="size-5" />
      </div>
      <div v-if="currentUser" class="flex items-center gap-3">
        <img
          class="size-10 rounded-full bg-cyan-400"
          :src="currentUser?.photoURL || ''"
          alt="avatar"
        />
        <span class="cursor-default">{{ currentUser?.displayName }}</span>
      </div>
      <div v-else>
        <button
          class="text-lg font-semibold rounded-3xl bg-gray-200 hover:bg-gray-300 m-0"
          @click="loginWithGoogle"
        >
          Log in
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellIcon, ChatBubbleLeftIcon } from "@heroicons/vue/24/outline";
import { auth,  provider, signInWithPopup } from "../../../firebase";
import { useAuth } from "../../../composables/useAuth";



const {currentUser} = useAuth()


const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
</script>
