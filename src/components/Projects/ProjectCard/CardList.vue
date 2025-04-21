<template>
  <div v-if="projects.length" class="grid grid-cols-2 gap-6 mt-7 mb-4">
    <div v-for="project in projects" :key="project.id">
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
import ProjectCard from "./ProjectCard.vue";
import type { IProject } from "../../../types/project";

defineProps<{ projects: IProject[] }>();
</script>
