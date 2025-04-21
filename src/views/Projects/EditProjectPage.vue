<template>
  <div v-if="project">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-[32px] font-semibold">{{ project.name }}</h2>
      <Button @click="handleDeleteProject"> Delete project </Button>
    </div>
    <div class="bg-white p-8 rounded-3xl shadow-md w-full">
      <ProjectCardDetails :project="project" />
    </div>
    <HiredPeopleList />
  </div>
  <div v-else class="text-gray-500">Loading project...</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import Button from "@/components/ui/button/Button.vue";
import type { IProject } from "@/types/project";
import { useProjectsStore } from "@/stores/projects";
import { fetchDeleteProject, getProjectById } from "@/api/api";
import { formatDMYToDateInput } from "@/utils/formatDate";
import ProjectCardDetails from "../../components/Projects/ProjectCard/ProjectCardDetails.vue";
import HiredPeopleList from "@/components/Vacancy/HiredPeopleList.vue";

const project = ref<IProject | null>(null);
const router = useRouter();
const projectsStore = useProjectsStore();

const route = useRoute();
const projectId = ref<number>();

onMounted(async () => {
  projectId.value = Number(route.params.id);
  try {
    project.value = await getProjectById(projectId.value);
    if (project.value?.deadline) {
      project.value.deadline = formatDMYToDateInput(project.value.deadline); // DD.MM.YYYY -> YYYY-MM-DD
    }
  } catch (error) {}
});

const handleDeleteProject = async () => {
  const confirmed = confirm("Are you sure you want to delete this project?");
  if (confirmed) {
    try {
      await fetchDeleteProject(project.value!.id);
      router.push("/projects");
      projectsStore.projects = projectsStore.projects.filter(
        (project) => project.id !== projectId.value
      );
    } catch (error) {}
  }
};
</script>
