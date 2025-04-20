<template>
  <div
    class="flex justify-between gap-3 h-32 items-center bg-[#F3F4F6] rounded-3xl px-10"
  >
    <div class="flex gap-3">
      <div class="cursor-pointer">
        <h2 class="font-aeroport font-semibold text-2xl uppercase">
          <RouterLink to="/"> TROOD COMUNITY </RouterLink>
        </h2>
      </div>
    </div>


    <div class="flex gap-3 items-center">
      <div>
        <BellIcon class="size-5 text-gray-300" />
      </div>
      <div>
        <ChatBubbleLeftIcon class="size-5 text-gray-300" />
      </div>
      <div v-if="currentUser" class="flex items-center gap-3">
        <img
          class="size-10 rounded-full bg-cyan-400"
          :src="currentUser?.photoURL || ''"
          alt="avatar"
        />
        <span class="text-gray-500 cursor-default">{{
          currentUser?.displayName
        }}</span>
      </div>
      <div v-else>
        <Button
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
import { auth, provider, signInWithPopup } from "../../../firebase";
import { useAuth } from "../../../composables/useAuth";
import { BellIcon, ChatBubbleLeftIcon } from "@heroicons/vue/16/solid";
import Button from "@/components/ui/button/Button.vue";

const { currentUser } = useAuth();

const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
</script>
