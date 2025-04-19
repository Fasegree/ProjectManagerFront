<template>
  <div v-if="projectsWithVacancies.length" class="w-full">
    <!-- <div class="flex justify-between items-center">
      <span class="text-3xl">Active projects</span>
      <RouterLink to="/create-project">
        <button
          class="text-lg font-semibold rounded-3xl bg-gray-200 hover:bg-gray-300 mt-0"
        >
          Create project
        </button>
      </RouterLink>
    </div> -->

    <div
      v-for="project in projectsWithVacancies"
      :key="project.id"
      class="mb-8"
    >
      <h2 class="text-2xl font-aeroport-light text-left"> Name project: "<b class="font-aeroport-black"> {{ project.name }}</b>"</h2>
      <TransitionGroup name="fade" tag="div">
  <VacancyCard
    v-for="vacancy in project.vacancies"
    :key="vacancy.id"
    :vacancy="vacancy"
    @deleted="handleVacancyDeleted(project.id, $event)"
  />
</TransitionGroup>

      <!-- <ul class="pl-4">
        <li
          v-for="vacancy in project.vacancies"
          :key="vacancy.id"
          class="text-gray-700"
        >
          → {{ vacancy.name }} ({{ vacancy.experience }})
        </li>
      </ul> -->
    </div>
  </div>
  <div v-else>Нет вакансий</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { IProject, IProjectWithVacancy } from "../../types/project";
import { getProjects, getVacanciesByProject } from "../../api/api";
import VacancyCard from "../../components/Vacancy/VacancyCard.vue";

// const projectsWithVacancies = ref<(IProject & { vacancies: IVacancy[] })[]>([]);
const projectsWithVacancies = ref<IProjectWithVacancy[]>([]);

const getProjectsWithVacancies = async () => {
  const projects: IProject[] = await getProjects();

  const enrichedProjects: IProjectWithVacancy[] = await Promise.all(
    projects.map(async (project) => {
      const vacancies = await getVacanciesByProject(project.id);
      return { ...project, vacancies };
    })
  );
  console.log([...enrichedProjects]);

  projectsWithVacancies.value = enrichedProjects;
};

const handleVacancyDeleted = (projectId: number, vacancyId: number) => {
  const project = projectsWithVacancies.value.find(p => p.id === projectId);
  if (project) {
    project.vacancies = project.vacancies.filter(v => v.id !== vacancyId);
  }
};


onMounted(() => {
  getProjectsWithVacancies();
});
</script>
