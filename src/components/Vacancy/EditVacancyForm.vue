<template>
    <h2 class="text-2xl font-semibold mb-6 text-left">{{ project?.name }}</h2>
    <form @submit.prevent="updateVacancyData" class="bg-white px-16 py-14 rounded-2xl text-xl">
  
      <div class="flex gap-5">
       
  
          
          <div class="w-1/3">
            <label for="field" class="block text-gray-700 text-sm font-bold mb-2 text-left">Field</label>
            <select
              id="field"
              v-model="vacancy.field"
              class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>Select a field</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
        </div>
        <div class="w-1/3">
          <label for="experience" class="block text-gray-700 text-sm font-bold mb-2 text-left">Experience</label>
          <select
            id="experience"
            v-model="vacancy.experience"
            class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div class="w-1/3">
          <label for="deadline" class="block text-gray-700 text-sm font-bold mb-2 text-left">Project DeadLine</label>
          <input
            type="date"
            id="deadline"
            v-model="vacancy.name"
            class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-3 focus:outline-none focus:shadow-outline"
            required
          />
        </div>
  
    </div>
    <div class="w-1/2">
      <label for="country" class="block text-gray-700 text-sm font-bold mb-2 text-left">Country</label>
      <input
        type="text"
        id="country"
        v-model="vacancy.country"
        class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Country"
      />
    </div>
  
      <div class="mb-6">
        <label for="description" class="block text-gray-700 text-sm font-bold mb-2 text-left">Description</label>
        <textarea
          id="description"
          v-model="vacancy.description"
          rows="4"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Vacancy Description"
        ></textarea>
      </div>
  
      <div class="flex items-center justify-start gap-4">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
        >
          Save Changes
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { fetchUpdateVacancy, getVacanciesByProject } from '../../api/api';
  import type { IVacancy } from '../../types/vacancy';
import { useProjectsStore } from '../../stores/projects';
  
  const route = useRoute();
  const router = useRouter();
  const vacancyId = Number(route.params.vacancyId);
  const projectId = Number(route.params.projectId);

  const project = useProjectsStore().projects.find(project => project.id === projectId);
  
  const vacancy = ref<IVacancy>({
    id: vacancyId,
    name: '',
    field: '',
    experience: '',
    description: '',
    country: '',
    project_id: projectId,
  });
  
  onMounted(async () => {
    
    const vacancies = await getVacanciesByProject(projectId);
    const current = vacancies.find(v => v.id === vacancyId);
    if (current) {
      vacancy.value = current;
    } else {
      alert('Vacancy not found');
      router.push(`/projects/${projectId}`);
    }
  });
  
  const updateVacancyData = async () => {
    try {
      await fetchUpdateVacancy(vacancy.value);
      alert('Vacancy updated successfully');
      router.push(`/projects/${projectId}`);
    } catch (error) {
      console.error(error);
      alert('Failed to update vacancy.');
    }
  };
  
  const cancelEdit = () => {
    router.push(`/projects/${projectId}`);
  };
  </script>
  