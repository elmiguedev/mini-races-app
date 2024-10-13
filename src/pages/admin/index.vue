<template>
  <!-- my car -->
  <div>
    <h1>cars</h1>
  </div>

  <!-- part models -->
   <div>
    <h1>models</h1>
    <CarPartModelsTable :models="models" />
   </div>
   
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CarPartModelsTable from '~/components/cars/CarPartModelsTable.vue';
import { CarPartModel } from '~/server/core/domain/car/CarPartModel';

const models =  ref<CarPartModel[]>([]);

const getModels = async () => {
  const response = await $fetch<CarPartModel[]>("/api/part-models");
  models.value = response;
}

onMounted(async () => {
  await getModels();
})

</script>