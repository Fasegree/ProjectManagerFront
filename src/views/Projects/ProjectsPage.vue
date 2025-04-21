<template>
  <div v-if="!activeProjects.length && !passedProjects.length">No projects</div>

  <div class="w-full">
    <div class="flex justify-between items-center">
      <span class="text-3xl">Active project</span>
      <RouterLink to="/create-project">
        <Button class=""> Create project </Button>
      </RouterLink>
    </div>
  </div>
  <CardList v-if="activeProjects" :projects="activeProjects" />

  <div v-if="passedProjects.length" class="w-full">
    <div class="flex justify-between items-center pl-8">
      <span class="text-3xl pt-10">Passed project</span>
    </div>
  </div>
  <CardList :projects="passedProjects" />
</template>

<script setup lang="ts">
import { useProjectsStore } from "@/stores/projects";
import CardList from "../../components/Projects/ProjectCard/CardList.vue";
import { onMounted, ref } from "vue";
import { formatDMYToDate, getToday } from "@/utils/formatDate";
import { type IProject } from "@/types/project";
import Button from "@/components/ui/button/Button.vue";

const passedProjects = ref<IProject[]>([]);
const activeProjects = ref<IProject[]>([]);
const projectsStore = useProjectsStore();

const splitProjects = () => {
  passedProjects.value = [];
  activeProjects.value = [];

  const today = getToday();

  projectsStore.projects.forEach((project) => {
    const deadline = formatDMYToDate(project.deadline);
    const deadlineDate = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate()
    );

    if (deadlineDate >= today) {
      activeProjects.value.push(project);
    } else {
      passedProjects.value.push(project);
    }
  });
};

onMounted(async () => {
  if (projectsStore.projects.length === 0) {
    await projectsStore.fetchProjects();
  }
  splitProjects();
});
</script>
