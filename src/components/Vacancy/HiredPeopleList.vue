<template>
  <div class="">
    <h2 class="text-left text-3xl font-semibold pt-8">Hired people</h2>
    <!-- Card People -->
    <div
      class="grid grid-cols-[3fr_5fr_1fr_1fr] text-left mt-8 text-[18px] gap-4"
    >
      <div class="">
        <h3 class="text-2xl font-semibold">Web Designer</h3>
        <h4>Roberto Pontu</h4>
      </div>
      <div>descripions</div>
      <div class="text-center">9/10</div>

      <RouterLink to="#">
        <div class="text-end">more -></div>
      </RouterLink>
    </div>
    <!-- /Card People -->
  </div>
</template>
<script setup lang="ts"></script>
