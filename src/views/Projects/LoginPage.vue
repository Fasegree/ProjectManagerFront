<template>
  <button @click="loginWithGoogle">Login</button>
</template>

<script setup lang="ts">
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

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
