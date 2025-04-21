<template>
  <Button @click="loginWithGoogle">Login</Button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Button from "@/components/ui/button/Button.vue";

const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};

const router = useRouter();

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    router.push("/");
  }
});
</script>
