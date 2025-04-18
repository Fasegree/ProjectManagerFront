<template>
  <div v-if="user" class="flex flex-col justify-between min-h-[80vh]">
    <div class="flex flex-col items-start w-full">
      <RouterLink
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="w-full"
      >
        <button
          @click="setActiveItem(index)"
          :class="[
            'w-full mx-0 py-5 text-left  transition-colors duration-200 font-aeroport font-medium',
            isActive === index
              ? 'bg-[#C2C5CB] text-white '
              : 'hover:bg-gray-200 text-gray-700 bg-transparent',
          ]"
        >
        
          {{ item.label }}
        </button>
      </RouterLink>
    </div>
    <div class="py-5 pl-5 self-start text-sm text-gray-400 cursor-pointer">
      <span @click="logout">log out</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { auth, onAuthStateChanged, signOut } from "../../../firebase";
import type { User } from "firebase/auth";
import { useRouter, useRoute } from "vue-router";

const user = ref<User | null>(null);
const isActive = ref<number | null>(0);

const route = useRoute();

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });
});

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes("project")) {
      isActive.value = 1;
    } else if (newPath.includes("vacanc")) {
      isActive.value = 2;
    } else if (newPath.startsWith("/people")) {
      isActive.value = 3;
    } else if (newPath.startsWith("/tests")) {
      isActive.value = 4;
    } else if (newPath.startsWith("/settings")) {
      isActive.value = 5;
    } else {
      isActive.value = 0;
    }
  },
  { immediate: true }
);

interface MenuItem {
  label: string;
  path: string;
}

const menuItems = ref<MenuItem[]>([
  { label: "Main page", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Vacancies", path: "/vacancies" },
  { label: "People", path: "/people" },
  { label: "Tests", path: "/tests" },
  { label: "Settings", path: "/settings" },
]);

const setActiveItem = (index: number) => {
  isActive.value = index;
};

const router = useRouter();
const logout = async () => {
  try {
    await signOut(auth);
    router.push("/login");
  } catch (error) {}
};
</script>
