<template>
  <div v-if="projectsWithVacancies.length" class="w-full">
  

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

    
    </div>
  </div>
  <div v-else>No vacancies</div>
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
