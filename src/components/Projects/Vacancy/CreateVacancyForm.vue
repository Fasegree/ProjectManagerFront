<template>
  <form
    @submit.prevent="createVacancy"
    class="bg-white px-16 py-14 rounded-2xl "
  >
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
          v-model="vacancyDataInitial.name"
          class="w-full border rounded py-2 px-3 text-gray-700  focus:outline-none focus:-outline"
          placeholder="Name"
          required
        />
      </div>
      <div class="w-1/2">
        <label
          for="field"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Field</label
        >
        <div class="relative">
          <select
            id="field"
            v-model="vacancyDataInitial.field"
            class="w-full border border-gray-300 rounded py-2 px-3 bg-white  focus:outline-none focus:-outline"
            required
          >
            <option value="" disabled selected>Select a field</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <div class="flex items-center px-2 text-gray-700"></div>
        </div>
      </div>
    </div>

    <div class="mb-4 mt-5 flex gap-5">
      <div class="w-1/2">
        <label
          for="experience"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Experience</label
        >
        <div class="relative">
          <select
            id="experience"
            v-model="vacancyDataInitial.experience"
            class="w-full border border-gray-300 rounded py-2 px-3 bg-white  focus:outline-none focus:-outline"
            required
          >
            <option value="" disabled selected>Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="expert">Expert</option>
          </select>
          <div class="flex items-center px-2 text-gray-700"></div>
        </div>
      </div>

      <div class="w-1/2">
        <label
          for="country"
          class="block text-left text-sm font-bold text-gray-700 mb-2"
          >Country</label
        >
        <input
          type="text"
          id="country"
          v-model="vacancyDataInitial.country"
          class="w-full border rounded py-2 px-3 text-gray-700  focus:outline-none focus:-outline"
          placeholder="Country"
        />
      </div>
    </div>

    <div class="mb-6">
      <label
        for="description"
        class="block text-sm font-bold text-gray-700 mb-2 text-left"
        >Description</label
      >
      <textarea
        id="description"
        v-model="vacancyDataInitial.description"
        rows="4"
        class="w-full border rounded py-2 px-3 text-gray-700  focus:outline-none focus:-outline"
        placeholder="Vacancy Description"
      ></textarea>
    </div>

    <div class="flex items-center justify-start">
      <Button type="submit"> Create vacancy </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { fetchCreateVacancy } from "@/api/api";
import Button from "@/components/ui/button/Button.vue";
import { toast } from "@/components/ui/toast";
import { useAutoSave } from "@/localstorage/useAutoSave";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";

const projectId = ref<string | null>(null);
const route = useRoute();
const param = route.params.projectId;
if (typeof param === "string") projectId.value = param;

interface VacancyData {
  name: string;
  field: string;
  experience: string;
  country: string;
  description: string;
}

const vacancyDataInitial = reactive<VacancyData>({
  name: "",
  field: "",
  experience: "",
  country: "",
  description: "",
});
const DRAFT_VACANCY = "draftVacancy";
useAutoSave(DRAFT_VACANCY, vacancyDataInitial);
const createVacancy = async () => {
  if (projectId.value) {
    try {
      await fetchCreateVacancy({
        ...vacancyDataInitial,
        project_id: Number(projectId.value),
        id: Date.now(),
      });
      toast({
        title: `Vacancy "${vacancyDataInitial.name}" successfully created`,
      });
      vacancyDataInitial.name = "";
      vacancyDataInitial.field = "";
      vacancyDataInitial.experience = "";
      vacancyDataInitial.country = "";
      vacancyDataInitial.description = "";
      localStorage.removeItem(DRAFT_VACANCY);
    } catch (error) {
      if (!navigator.onLine) {
        toast({ title: "Check your connection" });
      }
      toast({ title: "Server is not available. Please try again later" });
    }
  }
};
</script>
