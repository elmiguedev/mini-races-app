<template>
  <!-- my cars -->
  <div class="mb-5">
    <h1>my car</h1>
    <CarInfo />
  </div>

  <!-- my parts -->
  <div class="mb-5">
    <h1>my parts</h1>
    <CarPartsTable :parts="parts" @select="handleSelectPart" />
  </div>

  <!-- part models -->
  <div>
    <h1>models</h1>
    <CarPartModelsTable :models="models" @buy="handleBuyModel" />
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CarPartModelsTable from '~/components/cars/CarPartModelsTable.vue';
import CarPartsTable from '~/components/cars/CarPartsTable.vue';
import CarInfo from '~/components/cars/CarInfo.vue';

import { CarPartModel } from '~/server/core/domain/car/CarPartModel';
import { CarPart } from '~/server/core/domain/car/CarPart';


const models = ref<CarPartModel[]>([]);
const parts = ref<CarPart[]>([]);

const getModels = async () => {
  const response = await $fetch<CarPartModel[]>("/api/part-models");
  models.value = response;
}

const getUserParts = async () => {
  const response = await $fetch<CarPart[]>("/api/car-parts");
  parts.value = response;
}

const handleBuyModel = async (model: CarPartModel) => {
  const url = `/api/part-models/${model.id}/buy`;
  const part = await $fetch(url, {
    method: "POST"
  })
  console.log(part);
}

const handleSelectPart = (part: CarPart) => {
  console.log(part);
}

onMounted(async () => {
  await getModels();
  await getUserParts();
})

</script>