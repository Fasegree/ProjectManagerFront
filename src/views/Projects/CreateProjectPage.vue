<template>
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-[32px] font-semibold">Creating Project</h2>
  </div>
  <div class="bg-white p-8 rounded-3xl shadow-md w-full">
    <CreateProjectForm />
  </div>
</template>

<script setup lang="ts">
import CreateProjectForm from "../../components/Projects/ProjectCard/CreateProjectForm.vue";
</script>
