<template>
  <div v-if="projectsStore.isLoading">...Loading</div>
  <!-- <div v-if="projectsStore.projects.length">... No project</div> -->
  <h2 class="text-2xl font-semibold mb-6 text-left">{{ project?.name }}</h2>
  <form
    v-if="project"
    @submit.prevent="updateVacancyData"
    class="bg-white px-16 py-14 rounded-2xl text-xl"
  >
    <div class="flex gap-5">
      <div class="w-1/3">
        <label
          for="field"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Field</label
        >
        <select
          id="field"
          v-model="vacancy.field"
          class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Select a field</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <div class="w-1/3">
        <label
          for="experience"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Experience</label
        >
        <select
          id="experience"
          v-model="vacancy.experience"
          class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Select experience level</option>
          <option value="entry">Entry Level</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-Level</option>
          <option value="senior">Senior</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div class="w-1/3">
        <label
          for="deadline"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Project DeadLine</label
        >
        <input
          type="date"
          id="deadline"
          v-model="project.deadline"
          class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-3 focus:outline-none focus:shadow-outline"
          required
        />
      </div>
    </div>
    <div class="w-1/2 mt-5">
      <label
        for="country"
        class="block text-gray-700 text-sm font-bold mb-2 text-left"
        >Country</label
      >
      <input
        type="text"
        id="country"
        v-model="vacancy.country"
        class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Country"
      />
    </div>

    <div class="my-5">
      <label
        for="description"
        class="block text-gray-700 text-sm font-bold mb-2 text-left"
        >Description</label
      >
      <textarea
        id="description"
        v-model="vacancy.description"
        rows="4"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Vacancy Description"
      ></textarea>
    </div>

    <div class="flex items-center justify-start gap-5">
      <Button type="submit"> Save Changes </Button>
      <Button type="button" @click="cancelEdit"> Cancel </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchUpdateVacancy, getProjectById, getVacanciesByProject } from "../../api/api";
import type { IVacancy } from "../../types/vacancy";
import { useProjectsStore } from "../../stores/projects";
import Button from "../ui/button/Button.vue";
import { type IProject } from "@/types/project";
import { formatDMYToDateInput } from "@/utils/formatDate";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();
const vacancyId = Number(route.params.vacancyId);
const projectId = Number(route.params.projectId);

const projectsStore = useProjectsStore();
const project = ref<IProject>();

const vacancy = ref<IVacancy>({
  id: vacancyId,
  name: "",
  field: "",
  experience: "",
  description: "",
  country: "",
  project_id: projectId,
});

onMounted(async () => {
  if (projectsStore.projects.length) {
    project.value = projectsStore.projects.find(
      (project) => project.id === projectId
    );
  } else {
    project.value = await getProjectById(projectId);
  }
  project.value = {
    ...project.value,
    deadline: project.value?.deadline
      ? formatDMYToDateInput(project.value.deadline)
      : "",
  } as IProject;
  console.log(project.value.deadline);

  const vacancies = await getVacanciesByProject(projectId);
  const current = vacancies.find((v) => v.id === vacancyId);
  if (current) {
    vacancy.value = current;
  } else {
    alert("Vacancy not found");
    router.push(`/projects/${projectId}`);
  }
});

const updateVacancyData = async () => {
  try {
    await fetchUpdateVacancy(vacancy.value);
    toast({title: "Vacancy updated successfully"})
    router.push(`/projects/${projectId}`);
  } catch (error) {
    if(!navigator.onLine) {
        toast({title:"Check your connection"})
      }
      toast({title:"Server is not available. Please try again later"})    
  }
};

const cancelEdit = () => {
  router.push(`/projects/${projectId}`);
};
</script>
