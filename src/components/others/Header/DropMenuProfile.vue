<template>
  <DropdownMenu
    ><DropdownMenuTrigger>
      <span
        class="text-gray-500 cursor-pointer hover:text-gray-900 rounded-[5px]"
        >{{ currentUser?.displayName }}</span
      >
    </DropdownMenuTrigger>
    <DropdownMenuContent class="bg-white opacity-80 rounded-[7px]">
      <DropdownMenuLabel class="cursor-default text-gray-400"
        >My Account</DropdownMenuLabel
      >
      <DropdownMenuSeparator />
      <DropdownMenuItem class="p-0">
        <span
          @click="() => router.push('/settings')"
          class="w-full p-2 text-gray-700 cursor-pointer rounded-[5px] hover:bg-gray-300 transition-colors duration-200 ease-in-out"
        >
          Setting
        </span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="p-0"
        ><span
          class="w-full p-2 text-gray-700 cursor-pointer rounded-[5px] hover:bg-gray-300 transition-colors duration-200 ease-in-out hover:text-red-400"
          :onClick="logout"
          >Logout</span
        ></DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">

import { logout } from "@/composables/logout";

import type { User } from "firebase/auth";
import { useRouter } from "vue-router";

import DropdownMenuSeparator from "@/components/ui/dropdown-menu/DropdownMenuSeparator.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import DropdownMenuItem from "@/components/ui/dropdown-menu/DropdownMenuItem.vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";

const router = useRouter();

defineProps<{ currentUser: User }>();
</script>
