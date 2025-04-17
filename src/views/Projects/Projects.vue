<template>
  <div >
    <main>
      <RouterView/>
      <CardList/>
    </main>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { getProjects } from "../../api/api";
import { projectMoc } from "../../mockedDb";
import Header from "../../components/Projects/Header/Header.vue";
import Menu from "../../components/Projects/Menu/Menu.vue";
import ProjectCard from "../../components/Projects/ProjectCard/ProjectCard.vue";
import CardList from "../../components/Projects/ProjectCard/CardList.vue";
import { useRoute, useRouter } from "vue-router";


onMounted(async () => {
 
});
</script>
