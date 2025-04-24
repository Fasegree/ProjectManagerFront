<template>
  <div
    class="flex justify-between gap-3 h-20 items-center bg-[#F3F4F6] rounded-3xl px-4 md:px-10 md:h-32"
  >
    <div class="flex items-center gap-3">
      <SidebarTrigger class="md:hidden" />

      <div class="cursor-pointer">
        <h2 class="font-aeroport-black xl:text-2xl uppercase">
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
          class="hidden size-10 rounded-full bg-cyan-400 md:block"
          :src="currentUser?.photoURL || ''"
          alt="avatar"
        />
        <DropMenuProfile :current-user="currentUser">
          <span
            class="hidden text-gray-500 cursor-pointer hover:text-gray-900 rounded-[5px] text-sm md:block md:text-base"
            >{{ currentUser?.displayName }}</span
          >
          <img
            class="size-10 rounded-full bg-cyan-400 md:hidden"
            :src="currentUser?.photoURL || ''"
            alt="avatar"
          />
        </DropMenuProfile>
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
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";

const { currentUser } = useAuth();
</script>
