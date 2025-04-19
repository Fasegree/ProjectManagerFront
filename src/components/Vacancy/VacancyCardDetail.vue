
<template>
    <div v-if="vacancy"
      class="w-full bg-white rounded-3xl border-4 pt-8 pl-8 pr-8 pb-4 text-left hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <div>
        <div class="text-2xl font-semibold">
          {{ vacancy.name }}
        </div>
        <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
          {{ vacancy.experience }}
        </p>
        <p class="mt-2 text-gray-600 text-sm">
          <strong class="font-medium">Field:</strong> {{ vacancy.field || 'N/A' }}
        </p>
        <p class="text-gray-600 text-sm">
          <strong class="font-medium">Country:</strong> {{ vacancy.country || 'N/A' }}
        </p>
        <p class="mt-2 text-gray-500 text-sm truncate">
          {{ vacancy.description }}
        </p>
      </div>
      <div class="w-full">
        <div class="flex gap-3 pt-8 justify-between items-center">
          <div class="text-gray-400">HR Team</div> <div class="flex gap-3">
            <ChatBubbleLeftIcon class="size-5" />
            <BellIcon class="size-5" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>Нет вакансии</div>
  </template>
  
  <script setup lang="ts">
  import { ChatBubbleLeftIcon, BellIcon } from '@heroicons/vue/24/outline'; // Example icons, install @heroicons/vue
  import type { IVacancy } from '../../types/vacancy';
import { getVacanciesByProject } from '../../api/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const vacancy = ref<IVacancy>();
const route = useRoute();

const projectId = Number(route.params.projectId);
const vacancyId = Number(route.params.vacancyId);

onMounted(async () => {
  const vacancies = await getVacanciesByProject(projectId);
  vacancy.value = vacancies.find(vac => vac.id === vacancyId);
});

  </script>