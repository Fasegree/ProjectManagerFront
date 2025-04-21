import { defineStore } from "pinia";
import { ref } from "vue";
import { getProjects } from "../api/api";
import type { IProject } from "../types/project";

export const useProjectsStore = defineStore("projects", () => {
  const projects = ref<IProject[]>([]);
  const isLoading = ref<boolean>(false);

  const fetchProjects = async () => {
    try {
      isLoading.value = true;
      projects.value = await getProjects();
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const getProjectById = (id: number) => {
    return projects.value.find((project) => project.id === id);
  };

  return {
    isLoading,
    projects,
    fetchProjects,
    getProjectById,
  };
});
