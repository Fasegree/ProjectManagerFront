<template>
  <form
    v-if="props.vacancy.id"
    @submit.prevent="updateVacancyData"
    class="bg-white p-3 md:px-5 xl:px-16 md:py-14 rounded-2xl mt-8"
  >
    <div class="grid grid-cols-2 w-full gap-3 md:grid-cols-3 md:gap-5">
      <div >
        <label
          for="field"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Field</label
        >
        <select
          id="field"
          v-model="vacancy.field"
          class="w-full border border-gray-300 rounded py-2 px-3 bg-white focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Select a field</option>
          <option value="development">Development</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <div >
        <label
          for="experience"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Experience</label
        >
        <select
          id="experience"
          v-model="vacancy.experience"
          class="w-full border border-gray-300 rounded py-2 px-3 bg-white focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Select experience level</option>
          <option value="entry">Entry Level</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid-Level</option>
          <option value="senior">Senior</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <div >
        <label
          for="deadline"
          class="block text-gray-700 text-sm font-bold mb-2 text-left"
          >Project DeadLine</label
        >
        <input
          type="date"
          id="deadline"
          v-model="props.projectDeadline"
          class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
        class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
        class="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
import { useRouter } from "vue-router";
import type { IVacancy } from "@/types/vacancy";
import { fetchUpdateVacancy } from "@/api/api";
import { toast } from "@/components/ui/toast";
import Button from "@/components/ui/button/Button.vue";

const props = defineProps<{ vacancy: IVacancy; projectDeadline?: string }>();

const router = useRouter();

const updateVacancyData = async () => {
  try {
    await fetchUpdateVacancy(props.vacancy);
    toast({ title: "Vacancy updated successfully" });
  } catch (error) {
    if (!navigator.onLine) {
      toast({ title: "Check your connection" });
    }
    toast({ title: "Server is not available. Please try again later" });
  }
};

const cancelEdit = () => {
  router.push(`/projects/${props.vacancy.project_id}`);
};
</script>
