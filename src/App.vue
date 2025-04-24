<template>
  <div class="mx-5 my-2">
    <SidebarProvider v-model:open="isSidebarOpen" class="flex flex-col">
      <Header :isSidebarOpen="isSidebarOpen" @toggleSidebar="isSidebarOpen = !$event" />
      <main
        class="mx-0 grid grid-cols-1 md:grid-cols-[1fr_3fr]  gap-4 md:gap-[34px]"
      >
        <aside>
          <Menu class="hidden lg:block" />
          <Sidebar class="lg:hidden">
            <SidebarContent>
              <SidebarGroup>
                <Menu />
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </aside>

        <div>
          <div v-if="isLoading">
            <p class="text-gray-400 text-center md:text-left">Loading...</p>
          </div>

          <div
            v-else-if="currentUser"
            class="bg-gray-100 px-4 py-6 md:px-16 md:py-14 rounded-xl md:rounded-3xl mt-4 md:mt-5"
          >
            <RouterView />
          </div>

          <div v-else>
            <p
              class="text-red-500 text-center md:text-left text-lg md:text-xl w-full m-2 md:m-5"
            >
              Please log in
            </p>
          </div>
        </div>
      </main>
    </SidebarProvider>
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";
import { auth, onAuthStateChanged } from "./firebase";
import Toaster from "./components/ui/toast/Toaster.vue";
import Header from "./components/others/Header/Header.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Menu from "./components/others/Menu/Menu.vue";

const currentUser = ref();
const isLoading = ref(true);
const isSidebarOpen = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    isLoading.value = false;
    if (!user) {
      toast({ title: "❌ Пользователь не авторизован" });
    }
  });
});
</script>