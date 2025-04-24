<script setup lang="ts">
import { useSidebar } from "./utils";
import { Bars3Icon } from "@heroicons/vue/16/solid";

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Bars3Icon
    data-sidebar="trigger"
    class="size-7 cursor-pointer"
    @click="toggleSidebar"
  />
</template>
