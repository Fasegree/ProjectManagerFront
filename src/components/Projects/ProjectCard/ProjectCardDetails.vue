<template>
    <div v-if="project">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-[32px] font-semibold">{{ project.name }}</h2>
        <button
          @click="() => delProject(project!.id)"
          class="text-xl font-medium rounded-3xl bg-gray-200 hover:bg-gray-300 mt-0"
        >
          Delete project
        </button>
      </div>

      <div class="bg-white p-8 rounded-3xl shadow-md w-full">
        <form @submit.prevent="updProject">
          <div class="grid grid-cols-[1fr_1fr_1fr] gap-7 mb-4">
            <div class="w-full">
              <label for="field" class="block text-sm font-bold mb-2 text-left"
                >Field</label
              >
              <select id="field" class="w-full py-2 rounded-md px-2 bg-white border border-gray-300 hover:border-gray-400 focus:outline-none focus:shadow-outline">
                <option disabled value="">Select a field</option>
                <option value="design">Design</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div class="w-full">
              <label
                for="experience"
                class="block text-sm font-bold mb-2 text-left"
                >Experience</label
              >
              <input
                v-model="project.experience"
                type="text"
                id="experience"
                class="w-full py-2 rounded-md px-2 border"
                placeholder="Required Experience"
              />
            </div>
            <div class="w-full">
              <label
                for="deadline"
                class="block text-sm font-bold mb-2 text-left"
                >Deadline</label
              >
              <input
                v-model="project.deadline"
                type="date"
                id="deadline"
                class="w-full py-2 rounded-md px-2 border"
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="description"
              class="block text-sm font-bold mb-2 text-left"
              >Description</label
            >
            <textarea
              v-model="project.description"
              id="description"
              rows="4"
              class="w-full py-2 rounded-md px-2 border"
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
            <RouterLink :to="`/projects/${project.id}/create-vacancy`">
              <button
                type="submit"
                class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-2xl focus:outline-none focus:shadow-outline"
              >
                Create vacancy
              </button>
            </RouterLink>
          </div>
        </form>
        <HiredPeopleList></HiredPeopleList>
      </div>
    </div>
    <div v-else class="text-gray-500">Loading project...</div>
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
import {
  formatDateToDMY,
  formatDMYToDateInput,
} from "../../../utils/formatDate";
import { useProjectsStore } from "../../../stores/projects";
import HiredPeopleList from "../../Vacancy/HiredPeopleList.vue";

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
    const { deadline } = project.value;
    const updateToSendProject = {
      ...project.value,
      deadline: formatDateToDMY(deadline),
    };

    fetchUpdateProject(updateToSendProject);
  }
};
const delProject = async (id: number) => {
  fetchDeleteProject(id);
  router.push("/projects");
  projectsStore.projects = projectsStore.projects.filter(
    (project) => project.id !== id
  );
};
</script>
