<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div>
      <h2 class="text-left text-2xl font-semibold mb-6">Creating project</h2>

      <div class="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <!-- Form  -->
        <form @submit.prevent="createProject">
          <div class="flex gap-7 mb-4">
            <div class="w-1/2">
              <label
                for="name"
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                >Name</label
              >
              <input
                type="text"
                id="name"
                v-model="projectData.name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Project Name"
                required
              />
            </div>
            <div class="w-1/2">
              <label
                for="field"
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                >Field</label
              >
              <div class="relative">
                <select
                  id="field"
                  v-model="projectData.field"
                  class="block w-full bg-white border border-gray-300 hover:border-gray-400 py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>Select a field</option>
                  <option value="design">Design</option>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-4"></div>

          <div class="mb-4 flex space-x-4">
            <div class="w-1/2">
              <label
                for="experience"
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                >Experience</label
              >
              <input
                type="text"
                id="experience"
                v-model="projectData.experience"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Required Experience"
              />
            </div>
            <div class="w-1/2">
              <label
                for="deadline"
                class="block text-gray-700 text-sm font-bold mb-2 text-left"
                >Deadline</label
              >
              <input
                type="date"
                id="deadline"
                v-model="projectData.deadline"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div class="mb-6">
            <label
              for="description"
              class="block text-gray-700 text-sm font-bold mb-2 text-left"
              >Description</label
            >
            <textarea
              id="description"
              v-model="projectData.description"
              rows="4"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Project Description"
            ></textarea>
          </div>

          <div class="flex justify-start">
            <button
              type="submit"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 m-0w font-bold py-2 rounded-2xl focus:outline-none focus:shadow-outline"
            >
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { formatDateToDMY } from "../../../utils/formatDate";
import { fetchCreateProject } from "../../../api/api";
import type { IProject } from "../../../types/project";
import { useProjectsStore } from "../../../stores/projects";

interface IProjectData {
  id: number;
  name: string;
  field: string;
  experience?: string;
  deadline: string;
  description?: string;
}

const projectData = reactive<IProjectData>({
  id: -1,
  name: "",
  field: "",
  experience: "",
  deadline: "",
  description: "",
});

const projectsStore = useProjectsStore();

const createProject = async () => {
  const { name, deadline, description, experience } = projectData;

  const projectToSend: IProject = {
    id: Date.now(),
    name,
    description: description || "",
    experience: experience || "",
    deadline: formatDateToDMY(deadline), // YYYY-MM-DD → DD.MM.YYYY
  };
  const project = await fetchCreateProject(projectToSend);
  console.log({ ...project });

  projectsStore.projects.push(project);
  projectData.name = "";
  projectData.field = "";
  projectData.experience = "";
  projectData.deadline = "";
  projectData.description = "";
};
</script>
