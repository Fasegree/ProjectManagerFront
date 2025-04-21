<template>
  <TitleWithButton
    title="Active project"
    title-btn="Create project"
    :action-click="() => router.push('/create-project')"
  />
  <CardList v-if="activeProjects" :projects="activeProjects" />

  <TitleWithButton v-if="passedProjects.length" title="Passed project" />
  <CardList :projects="passedProjects" />
  <div v-if="!activeProjects.length && !passedProjects.length">No projects</div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "@/stores/projects";
import CardList from "../../components/Projects/ProjectCard/CardList.vue";
import { onMounted, ref } from "vue";
import { formatDMYToDate, getToday } from "@/utils/formatDate";
import { type IProject } from "@/types/project";
import TitleWithButton from "@/components/others/TitleWithButton.vue";
import { useRouter } from "vue-router";
import { toast } from "@/components/ui/toast";
import { getProjects } from "@/api/api";
const router = useRouter();
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
        try {
          await projectsStore.fetchProjects();
          if (!projectsStore.projects.length) {
            const fetchedProjects = await getProjects();
            projectsStore.projects = fetchedProjects;
            if (!fetchedProjects.length) {
              toast({ title: "Нет проектов на сервере" });
            }
          }
        } catch (error: any) {
          if (error.message === "Failed to fetch") {
            toast({ title: "Нет доступа к серверу или отсутствует интернет-соединение" });
          } else if (error.message === "Проекты не найдены на сервере" || error.message.startsWith("Ошибка сервера:")) {
            toast({ title: error.message }); // Показывать сообщение с сервера, если оно есть
          } else if (error.message === "На сервере нет проектов") {
            toast({ title: "Нет проектов на сервере" }); // Отображать ваш конкретный текст
          } else {
            toast({ title: `Произошла ошибка: ${error}` }); // Обработка других, непредвиденных ошибок
          }
        }
      }
  splitProjects();
});
</script>
