<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">📁 Projects</h1>
    <div v-if="projects.length === 0" class="text-gray-500">
      No projects found.
    </div>
    <ul class="space-y-4">
      <li
        v-for="project in projects"
        :key="project.id"
        class="p-4 bg-white rounded shadow"
      >
        <h2 class="text-xl font-semibold">{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <p class="text-sm text-gray-500">
          Deadline: {{ project.deadline }} | Experience:
          {{ project.experience }}
        </p>

        <h3 class="mt-4 font-medium">Vacancies:</h3>
        <ul class="ml-4 list-disc">
          <li
            v-for="vacancy in vacanciesByProject(project.id)"
            :key="vacancy.id"
          >
            <strong>{{ vacancy.name }}</strong> - {{ vacancy.field }} ({{
              vacancy.country
            }})
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { IProject } from "../../../types/project";
import type { IVacancy } from "../../../types/vacancy";
import { getProjects, getVacancies } from "../../../api/api";

const projects = ref<IProject[]>([]);
const vacancies = ref<IVacancy[]>([]);

const fetchProjects = async () => {
  try {
    projects.value = await getProjects();
    // console.log([...projects.value]);
    
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }
};

const fetchVacancies = async () => {
  try {
    vacancies.value = await getVacancies();
  } catch (error) {
    console.error("Failed to fetch vacancies:", error);
  }
};

const vacanciesByProject = (projectId: number) => {
  return vacancies.value.filter((v) => v.project_id === projectId);
};

onMounted(() => {
  fetchProjects();
  fetchVacancies();
});
</script>
