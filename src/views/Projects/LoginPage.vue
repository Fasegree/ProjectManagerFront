<template>
<button @click="loginWithGoogle">Login</button>
</template>

<script setup lang="ts">
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';

const loginWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};
</script>