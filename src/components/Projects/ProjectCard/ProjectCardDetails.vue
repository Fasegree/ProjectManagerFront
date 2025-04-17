<template>
  <div class="bg-gray-100 min-h-screen px-8 py-8">
    <div v-if="project">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-semibold">{{ project.name }}</h2>
        <button
          @click="() => delProject(project!.id)"
          class="rounded-2xl bg-red-100 px-4 py-2 hover:bg-red-200"
        >
          Delete project
        </button>
      </div>

      <div class="bg-white p-8 rounded-md shadow-md w-full max-w-xl">
        <form @submit.prevent="updProject">
          <div class="flex gap-7 mb-4">
            <div class="w-1/2">
              <label for="name" class="block text-sm font-bold mb-2"
                >Name</label
              >
              <input
                v-model="project.name"
                type="text"
                id="name"
                required
                class="input"
                placeholder="Project Name"
              />
            </div>

            <div class="w-1/2">
              <label for="field" class="block text-sm font-bold mb-2"
                >Field</label
              >
              <select id="field" class="input">
                <option disabled value="">Select a field</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>

          <div class="flex gap-7 mb-4">
            <div class="w-1/2">
              <label for="experience" class="block text-sm font-bold mb-2"
                >Experience</label
              >
              <input
                v-model="project.experience"
                type="text"
                id="experience"
                class="input"
                placeholder="Required Experience"
              />
            </div>

            <div class="w-1/2">
              <label for="deadline" class="block text-sm font-bold mb-2"
                >Deadline</label
              >
              <input
                v-model="project.deadline"
                type="date"
                id="deadline"
                class="input"
              />
            </div>
          </div>

          <div class="mb-6">
            <label for="description" class="block text-sm font-bold mb-2"
              >Description</label
            >
            <textarea
              v-model="project.description"
              id="description"
              rows="4"
              class="input"
              placeholder="Project Description"
            ></textarea>
          </div>

          <div class="flex justify-start">
            <button
              type="submit"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Update project
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="text-gray-500">Loading project...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { IProject } from "../../../types/project";
import {
  fetchDeleteProject,
  getProjectById,
  fetchUpdateProject,
} from "../../../api/api";
import { formatDateToDMY, formatDMYToDateInput } from "../../../utils/formatDate";
import { useProjectsStore } from "../../../stores/projects";

const project = ref<IProject | null>(null);
const router = useRouter();
const projectsStore = useProjectsStore();

onMounted(async () => {
  const route = useRoute();
  const id = route.params.id as string;
  project.value = await getProjectById(Number(id));

  if (project.value?.deadline) {
    project.value.deadline = formatDMYToDateInput(project.value.deadline); // DD.MM.YYYY -> YYYY-MM-DD
  }
});

const updProject = async () => {
  if (project.value) {
    const {deadline} = project.value
    const updateToSendProject = {...project.value, deadline: formatDateToDMY(deadline)}
    
    fetchUpdateProject(updateToSendProject)
  }
};
const delProject = async (id: number) => {
  fetchDeleteProject(id)
  router.push("/projects");
  projectsStore.projects = projectsStore.projects.filter((project) => project.id!==id)
};
</script>
