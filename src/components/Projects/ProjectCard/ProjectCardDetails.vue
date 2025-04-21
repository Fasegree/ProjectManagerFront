<template>
  <form @submit.prevent="updProject">
    <div class="grid grid-cols-[1fr_1fr_1fr] gap-7 mb-4">
      <div class="w-full">
        <label for="field" class="block text-sm font-bold mb-2 text-left"
          >Field</label
        >
        <select
          id="field"
          v-model="project.field"
          class="w-full py-2 rounded-md px-2 bg-white border border-gray-300 hover:border-gray-400 focus:outline-none focus:shadow-outline"
        >
          <option disabled value="">Select a field</option>
          <option value="design">Design</option>
          <option value="development">Development</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <div class="w-full">
        <label for="experience" class="block text-sm font-bold mb-2 text-left"
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
      <label for="description" class="block text-sm font-bold mb-2 text-left"
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
    <Toaster/>
  </form>

</template>

<script setup lang="ts">
import { fetchUpdateProject } from "@/api/api";
import Button from "@/components/ui/button/Button.vue";
import { toast } from "@/components/ui/toast";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useProjectsStore } from "@/stores/projects";
import type { IProject } from "@/types/project";
import { formatDateToDMY, formatDMYToDateInput } from "@/utils/formatDate";

const projectsStore = useProjectsStore
const props = defineProps<{ project: IProject }>();
console.log(props.project);

const projectDeadline = props.project.deadline

const updProject = async () => {
  if (props.project) {
    const { deadline } = props.project;
    const updateToSendProject = {
      ...props.project,
      deadline: formatDateToDMY(deadline),
    };
    
    try {
      await fetchUpdateProject(updateToSendProject);
      const equilDate = new Date(deadline).getTime() === new Date(projectDeadline).getTime()
      if(!equilDate )
      projectsStore().fetchProjects()
      toast({ title: "Project successfully updated" });
    } catch (error) {
      toast({ title: `Server is not available. Please try again later` });
    }
  }
};
</script>
