<!-- ++++ -->
<template>
  <div v-if="activeProjects.length" class="w-full">
    <div class="flex justify-between items-center">
      <span class="text-3xl">Active project</span>
      <RouterLink to="/create-project">
        <button
          class="text-lg font-semibold rounded-3xl bg-gray-300 hover:bg-gray-400 mt-0"
        >
          Create project
        </button>
      </RouterLink>
    </div>
  </div>

  <div v-if="activeProjects.length" class="grid grid-cols-2 gap-6 mt-7 mb-4 ">
    <div v-for="project in activeProjects" :key="project.id">
      <RouterLink
        :to="`/projects/${project.id}`"
        class="text-inherit no-underline hover:no-underline focus:outline-none hover:text-inherit"
      >
        <ProjectCard :project="project" />
      </RouterLink>
    </div>
  </div>

  <div v-if="passedProjects.length" class="w-full">
    <div class="flex justify-between items-center pl-8">
      <span class="text-3xl pt-10">Passed project</span>
    </div>
  </div>

  <div v-if="passedProjects.length" class="grid grid-cols-2 gap-3 mt-4 mb-4 ml-4">
    <div v-for="project in passedProjects" :key="project.id">
      <RouterLink
        :to="`/projects/${project.id}`"
        class="text-inherit no-underline hover:no-underline focus:outline-none hover:text-inherit"
      >
        <ProjectCard :project="project" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useProjectsStore } from '../../../stores/projects';
import { getToday, formatDMYToDate } from '../../../utils/formatDate';
import ProjectCard from './ProjectCard.vue';
import type { IProject } from '../../../types/project';

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
