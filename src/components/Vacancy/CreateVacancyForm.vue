<template>
  <div class="w-full">
    <div class="flex justify-between items-center pb-8">
      <span class="text-3xl">Create vacancy</span>
      
    </div>
  </div>

  <form @submit.prevent="createVacancy" class="bg-white p-4 rounded-2xl">
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
          v-model="vacancyData.name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            v-model="vacancyData.field"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled selected>Select a field</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-4 flex gap-5">
      <div class="w-1/2">
        <label
          for="experience"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Experience</label
        >
        <div class="relative">
          <select
            id="experience"
            v-model="vacancyData.experience"
            class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled selected>Select experience level</option>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="expert">Expert</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
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
          v-model="vacancyData.country"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        v-model="vacancyData.description"
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

const vacancyData = reactive<VacancyData>({
  name: "",
  field: "",
  experience: "",
  country: "",
  description: "",
});

const createVacancy = async () => {
  console.log(projectId.value);
  console.log({...vacancyData});
  
  
  if(projectId.value){
    await fetchCreateVacancy({...vacancyData, project_id: Number(projectId.value) , id: Date.now() })
    console.log(7653);
    
    vacancyData.name = "";
    vacancyData.field = "";
    vacancyData.experience = "";
    vacancyData.country = "";
    vacancyData.description = "";
  }
};
</script>
