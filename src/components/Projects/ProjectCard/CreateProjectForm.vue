<template>
  <form @submit.prevent="createProject" class="space-y-6">
    <div class="flex gap-7">
      <div class="w-1/2">
        <label
          for="name"
          class="block text-sm font-bold text-gray-700 mb-2 text-left"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="projectDataInitial.name"
          class="w-full border rounded py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline"
          placeholder="Project Name"
          required
        />
      </div>

      <div class="w-1/2">
        <label
          for="field"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Field</label
        >
        <select
          id="field"
          v-model="projectDataInitial.field"
          class="w-full border border-gray-300 rounded py-2 px-3 bg-white shadow focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled selected>Select a field</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="flex gap-7">
      <div class="w-1/2">
        <label
          for="experience"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Experience</label
        >
        <input
          type="text"
          id="experience"
          v-model="projectDataInitial.experience"
          class="w-full border rounded py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline"
          placeholder="Required Experience"
        />
      </div>

      <div class="w-1/2">
        <label
          for="deadline"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Deadline</label
        >
        <input
          type="date"
          id="deadline"
          v-model="projectDataInitial.deadline"
          class="w-full border rounded py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>

    <div>
      <label
        for="description"
        class="block text-left text-sm font-bold text-gray-700 mb-2"
        >Description</label
      >
      <textarea
        id="description"
        v-model="projectDataInitial.description"
        rows="4"
        class="w-full border rounded py-2 px-3 text-gray-700 shadow focus:outline-none focus:shadow-outline"
        placeholder="Project Description"
      ></textarea>
    </div>

    <div class="flex">
      <Button type="submit"> Create project </Button>
    </div>
  </form>
  <Toaster v-model="errorMesage" />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { formatDateToDMY } from "../../../utils/formatDate";
import { fetchCreateProject } from "../../../api/api";
import type { IProject } from "../../../types/project";
import { useProjectsStore } from "../../../stores/projects";
import { useAutoSave } from "../../../localstorage/useAutoSave";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { toast } from "@/components/ui/toast";
import Button from "@/components/ui/button/Button.vue";

interface IProjectData {
  id: number;
  name: string;
  field: string;
  experience?: string;
  deadline: string;
  description?: string;
}

const errorMesage = ref<string>("");
const LOCAL_KEY = "draftProject";

const projectDataInitial = reactive<IProjectData>({
  id: -1,
  name: "",
  field: "",
  experience: "",
  deadline: "",
  description: "",
});

const projectsStore = useProjectsStore();
useAutoSave("draftProject", projectDataInitial);
const createProject = async () => {
  if (!navigator.onLine) {
    toast({ title: "Check your conection" });
  }
  const { name, deadline, description, experience } = projectDataInitial;
  const projectToSend: IProject = {
    id: Date.now(),
    name,
    description: description || "",
    experience: experience || "",
    deadline: formatDateToDMY(deadline),
  };
  try {
    const project = await fetchCreateProject(projectToSend);

    projectsStore.projects.push(project);

    toast({
      title: `Project "${projectDataInitial.name}" created!"`,
      description: `Date: ${new Date().toLocaleDateString(
        "ru-RU"
      )} Time: ${new Date().toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
    });
    projectDataInitial.name = "";
    projectDataInitial.field = "";
    projectDataInitial.experience = "";
    projectDataInitial.deadline = "";
    projectDataInitial.description = "";
    localStorage.removeItem(LOCAL_KEY);
  } catch (error) {
    toast({ title: "Invalid server. Try again later." });
  }
};
</script>
