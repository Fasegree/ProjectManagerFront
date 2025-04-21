<template>
  <div
    class="w-full bg-white rounded-3xl border-1 py-8 pl-8 pr-8 text-left hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out"
  >
    <div>
      <div class="text-2xl leading-4">
        {{ project.name }}
      </div>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5 line-clamp-5">
        {{ project.description }}
      </p>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
        Finished creating visual for Facebook
      </p>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
        Finished creating visual for Facebook
      </p>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
        Finished creating visual for Facebook
      </p>
    </div>
    <div class="w-full">
      <div class="flex gap-3 pt-12 justify-between items-center">
        <div class="flex gap-2">
          <UserIcon class="size-5 text-gray-300" />
          <div class="text-gray-400">Anna</div>
        </div>
        <div class="flex gap-3">
          <ChatBubbleLeftIcon class="size-5 text-gray-300" />
          <BellIcon class="size-5 text-gray-300" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "@heroicons/vue/24/outline";
import type { IProject } from "../../../types/project";
import {
  BellIcon,
  ChatBubbleLeftIcon,
  UserIcon,
} from "@heroicons/vue/16/solid";

defineProps<{ project: IProject }>();
</script>
