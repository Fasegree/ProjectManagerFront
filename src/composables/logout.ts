import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter()
export const logout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {}
  };