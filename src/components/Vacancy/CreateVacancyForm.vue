<template>
  <div class="flex">
      <span class="text-left text-3xl pb-8">Create vacancy</span>      
  </div>

  <form @submit.prevent="createVacancy" class="bg-white px-16 py-14 rounded-2xl text-xl">
    <div class="flex gap-5">
      <div class="w-1/2">
        <label
          for="name"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="vacancyDataInitial.name"
          class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-3 focus:outline-none focus:shadow-outline"
          placeholder="Name"
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
            v-model="vacancyDataInitial.field"
            class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled selected>Select a field</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <div
            class="flex items-center px-2 text-gray-700"
          >
           
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4 mt-5 flex gap-5">
      <div class="w-1/2">
        <label
          for="experience"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Experience</label
        >
        <div class="relative">
          <select
            id="experience"
            v-model="vacancyDataInitial.experience"
            class="block w-full bg-white border border-gray-300 hover:border-gray-400 h-[61px] py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled selected>Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="expert">Expert</option>
          </select>
          <div
            class=" flex items-center px-2 text-gray-700"
          >
           
          </div>
        </div>
      </div>

      <div class="w-1/2">
        <label
          for="country"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Country</label
        >
        <input
          type="text"
          id="country"
          v-model="vacancyDataInitial.country"
          class="shadow appearance-none border rounded w-full h-[61px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Country"
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
        v-model="vacancyDataInitial.description"
        rows="4"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Vacancy Description"
      ></textarea>
    </div>

    <div class="flex items-center justify-start">
      <button
        type="submit"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-0 rounded-2xl focus:outline-none focus:shadow-outline"
      >
        Create vacancy
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { fetchCreateVacancy } from "../../api/api";
import { useRoute } from "vue-router";
import { useAutoSave } from "../../composables/useAutoSave";

const projectId = ref<string | null>(null)
const route = useRoute()
const param = route.params.projectId
if(typeof param === 'string')
projectId.value = param

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
const DRAFT_VACANCY = "draftVacancy"
useAutoSave(DRAFT_VACANCY, vacancyDataInitial)
const createVacancy = async () => {
  
  
  if(projectId.value){
    await fetchCreateVacancy({...vacancyDataInitial, project_id: Number(projectId.value) , id: Date.now() })
    
    vacancyDataInitial.name = "";
    vacancyDataInitial.field = "";
    vacancyDataInitial.experience = "";
    vacancyDataInitial.country = "";
    vacancyDataInitial.description = "";
    localStorage.removeItem(DRAFT_VACANCY);

  }
};
</script>
