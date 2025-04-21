<template>
  <div v-if="projectsStore.isLoading">...Loading</div>
  <div v-if="project" class="w-full">
    <TitleWithButton :title="project.name" title-btn="Close vacancy" :action-click="handleDelete"/>
  </div>
  <EditVacancyForm
    v-if="vacancy"
    :vacancy="vacancy"
    :project-deadline="project?.deadline"
  />
  <span v-if="!projectsStore.isLoading && !vacancy">...loading vacancy</span>
</template>

<script setup lang="ts">
import {
  fetchDeleteVacancy,
  getProjectById,
  getVacanciesByProject,
} from "@/api/api";
import TitleWithButton from "@/components/others/TitleWithButton.vue";
import { toast } from "@/components/ui/toast";
import EditVacancyForm from "@/components/Vacancy/EditVacancyForm.vue";
import { useProjectsStore } from "@/stores/projects";
import type { IProject } from "@/types/project";
import type { IVacancy } from "@/types/vacancy";
import { formatDMYToDateInput } from "@/utils/formatDate";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const projectsStore = useProjectsStore();
const project = ref<IProject>();
const vacancy = ref<IVacancy>();
const router = useRouter();

const route = useRoute();

const vacancyId = Number(route.params.vacancyId);
const projectId = Number(route.params.projectId);

onMounted(async () => {
  if (projectsStore.projects.length) {
    project.value = projectsStore.projects.find(
      (project) => project.id === projectId
    );
  } else {
    project.value = await getProjectById(projectId);
  }
  project.value = {
    ...project.value,
    deadline: project.value?.deadline
      ? formatDMYToDateInput(project.value.deadline)
      : "",
  } as IProject;

  const vacancies = await getVacanciesByProject(projectId);
  const current = vacancies.find((v) => v.id === vacancyId);
  if (current) {
    vacancy.value = current;
  } else {
    alert("Vacancy not found");
    router.push(`/projects/${projectId}`);
  }
});

const handleDelete = async () => {
  const confirmed = confirm("Are you sure you want to delete this vacancy?");
  try {
    if (confirmed) {
      await fetchDeleteVacancy(vacancyId);
      router.back();
    }
  } catch (error) {
    if (!navigator.onLine) {
      toast({ title: "No internet connection" });
    } else {
      toast({ title: "Failed to delete the vacancy" });
    }
  }
};
</script>
