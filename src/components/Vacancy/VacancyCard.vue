<template>
  <div
    class="flex justify-between mt-5 bg-white rounded-3xl border-1 pt-4 pl-8 pr-8 pb-4 text-left hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out "
  >
  <RouterLink class="w-full cursor-pointer" :to="`/projects/${vacancy.project_id}/vacancy/${vacancy.id}`">
<div >
      <div class="text-2xl font-semibold">
        {{ vacancy.name }}
      </div>
      <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
        {{ vacancy.experience }}
      </p>
</div>
  </RouterLink>

    <div class="flex flex-col justify-between items-end ">
      <RouterLink
        :to="`/projects/${vacancy.project_id}/edit-vacancy/${vacancy.id}`"
        class="text-gray-500 hover:text-blue-500 hover:underline"
      >
        Edit
      </RouterLink>
      <div @click.stop.prevent="handleDelete" class="text-gray-500 hover:text-red-500 hover:underline cursor-pointer">
        Delete
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchDeleteVacancy } from '../../api/api';
import type { IVacancy } from '../../types/vacancy';
import { defineEmits } from 'vue';

const props = defineProps<{ vacancy: IVacancy }>();
const emit = defineEmits<{
  (e: 'deleted', id: number): void;
}>();

const handleDelete = async () => {
  const confirmed = confirm('Are you sure you want to delete this vacancy?');
  if (confirmed) {
    await fetchDeleteVacancy(props.vacancy.id);
    emit('deleted', props.vacancy.id); 
  }
};
</script>
