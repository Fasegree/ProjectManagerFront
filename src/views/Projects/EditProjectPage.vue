<template>
  <div v-if="project">
    <TitleWithButton
      :title="project.name"
      title-btn="Delete project"
      :action-click="handleDeleteProject"
    />
    <div class="bg-white p-3 md:p-8 rounded-3xl shadow-md w-full">
      <EditProjectForm :project="project" />
    </div>
    <HiredPeopleList />
  </div>
  <div v-else class="text-gray-500">Loading project...</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { IProject } from "@/types/project";
import { useProjectsStore } from "@/stores/projects";
import { fetchDeleteProject, getProjectById } from "@/api/api";
import { formatDMYToDateInput } from "@/utils/formatDate";
import TitleWithButton from "@/components/others/TitleWithButton.vue";
import EditProjectForm from "@/components/Projects/ProjectCard/EditProjectForm.vue";
import HiredPeopleList from "@/components/Projects/Vacancy/HiredPeopleList.vue";

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
