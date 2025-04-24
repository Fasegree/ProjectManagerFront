<template>
  <div class="flex justify-between items-center mb-3 md:mb-8">
    <h2 class="text-2xl md:text-[32px] font-semibold">{{ title }}</h2>
    <Button v-if="titleBtn" @click="actionClick?.()"> {{ titleBtn }} </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '../ui/button/Button.vue';

defineProps<{ title: string; titleBtn?: string; actionClick?: () => void }>();
</script>
