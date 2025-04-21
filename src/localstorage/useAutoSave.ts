import { watch, onMounted, ref } from "vue";

export function useAutoSave<T extends object>(key: string, target: T) {
  const isRestored = ref(false);

  onMounted(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        /// Merge parsed data into the target object (mutates target)
        Object.assign(target, parsed);
        isRestored.value = true;
      } catch (e) {
        console.error(`Failed to parse localStorage key "${key}"`, e);
      }
    } else {
      isRestored.value = true;
    }
  });

  watch(
    target,
    (newVal) => {
      if (isRestored.value) {
        localStorage.setItem(key, JSON.stringify(newVal));
      }
    },
    { deep: true }
  );

  return { isRestored };
}
