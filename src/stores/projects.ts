import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProjects } from '../api/api'; // Здесь ты используешь функцию для получения проектов
import type { IProject } from '../types/project';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<IProject[]>([]);

  // Функция для загрузки проектов
  const fetchProjects = async () => {
    projects.value = await getProjects();
  };

  return {
    projects,
    fetchProjects
  };
});
