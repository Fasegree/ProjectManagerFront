<template>
  <div v-if="project">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-[32px] font-semibold">{{ project.name }}</h2>
      <Button @click="handleDeleteProject"> Delete project </Button>
    </div>

    <div class="bg-white p-8 rounded-3xl shadow-md w-full">
      <form @submit.prevent="updProject">
        <div class="grid grid-cols-[1fr_1fr_1fr] gap-7 mb-4">
          <div class="w-full">
            <label for="field" class="block text-sm font-bold mb-2 text-left"
              >Field</label
            >
            <select
              id="field"
              class="w-full py-2 rounded-md px-2 bg-white border border-gray-300 hover:border-gray-400 focus:outline-none focus:shadow-outline"
            >
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
            <label for="deadline" class="block text-sm font-bold mb-2 text-left"
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

        <div class="flex gap-5 justify-start">
          <Button type="submit"> Save Changes </Button>
          <RouterLink :to="`/projects/${project.id}/create-vacancy`">
            <Button type="submit"> Create vacancy </Button>
          </RouterLink>
        </div>
      </form>
      <HiredPeopleList></HiredPeopleList>
    </div>
    <Toaster></Toaster>
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
import Button from "@/components/ui/button/Button.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { toast } from "@/components/ui/toast";

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

const updProject = async () => {
  if (project.value) {
    const { deadline } = project.value;
    const updateToSendProject = {
      ...project.value,
      deadline: formatDateToDMY(deadline),
    };
    try {
      await fetchUpdateProject(updateToSendProject);
      toast({ title: "Project successfully updated" });
    } catch (error) {
      toast({ title: `Server is not available. Please try again later` });
    }
  }
};
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
