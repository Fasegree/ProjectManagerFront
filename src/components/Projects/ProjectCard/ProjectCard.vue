<template>
  <div class="w-full rounded-3xl border-4 pt-8 pl-8 pr-8 pb-4 text-left hover:shadow-xl hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300 ease-in-out">
    <div>
      <div class="text-2xl font-semibold">
        {{ project.name }}
      </div>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
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
          <div class="text-gray-400">Anna</div>
          <div class="flex gap-3">
            <ChatBubbleLeftIcon class="size-5" />
            <BellIcon class="size-5" />
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BellIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/vue/24/outline";
import type { IProject } from "../../../types/project";

defineProps<{project: IProject}>()
</script>
