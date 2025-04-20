
<template>
    <div v-if="vacancy"
      class="w-full bg-white rounded-3xl border-1 pt-8 pl-8 pr-8 pb-4 text-left hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out"
    >
      <div>
        <div class="text-2xl font-semibold">
          {{ vacancy.name }}
        </div>
        <div>

        </div>
        <p class="border-l-4 pl-4 border-gray-300 text-left mt-5">
          {{ vacancy.experience }}
        </p>
        <p class="flex gap-2 mt-4 text-gray-600 text-sm border-l-4 pl-4 border-gray-300">
          <strong class="font-medium">Field:</strong> {{ vacancy.field || 'N/A' }}
          <strong class="font-medium border-l-4 pl-4 ml-6 border-gray-300">Country:</strong> {{ vacancy.country || 'N/A' }}
        </p>
        <p class="text-gray-600 text-sm">
        </p>
        <p class="mt-2 text-gray-500 text-sm truncate">
          {{ vacancy.description }}
        </p>
      </div>
      <div class="w-full">
        <div class="flex gap-3 pt-8 justify-between items-center">
          <div class="text-gray-400">HR Team</div> <div class="flex gap-3">
            <ChatBubbleLeftIcon class="size-5 text-gray-300" />
            <BellIcon class="size-5 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>No vacancies</div>
  </template>
  
  <script setup lang="ts">
  import { } from '@heroicons/vue/24/outline'; 
  import type { IVacancy } from '../../types/vacancy';
import { getVacanciesByProject } from '../../api/api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { BellIcon, ChatBubbleLeftIcon } from '@heroicons/vue/16/solid';

const vacancy = ref<IVacancy>();
const route = useRoute();

const projectId = Number(route.params.projectId);
const vacancyId = Number(route.params.vacancyId);

onMounted(async () => {
  const vacancies = await getVacanciesByProject(projectId);
  vacancy.value = vacancies.find(vac => vac.id === vacancyId);
});

  </script>