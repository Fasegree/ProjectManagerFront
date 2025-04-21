<template>
  <div
    class="flex justify-between gap-3 h-32 items-center bg-[#F3F4F6] rounded-3xl px-10"
  >
    <div class="flex gap-3">
      <div class="cursor-pointer">
        <h2 class="font-aeroport-black text-2xl uppercase">
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
        <DropMenuProfile :current-user="currentUser" />
      </div>
      <div v-else>
        <Button @click="loginWithGoogle"> Log in </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellIcon, ChatBubbleLeftIcon } from "@heroicons/vue/16/solid";
import { loginWithGoogle, useAuth } from "../../../composables/useAuth";
import Button from "@/components/ui/button/Button.vue";
import DropMenuProfile from "./DropMenuProfile.vue";

const { currentUser } = useAuth();
</script>
