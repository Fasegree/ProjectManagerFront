import { ref, onMounted } from "vue";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase";

const currentUser = ref<User | null>(null);
const isAuthLoading = ref(true);

let isInitialized = false;

export function useAuth() {
  if (!isInitialized) {
    isInitialized = true;

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        currentUser.value = user;
        isAuthLoading.value = false;
      });
    });
  }

  return {
    currentUser,
    isAuthLoading,
  };
}
