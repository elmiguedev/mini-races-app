<template>
  <!-- my cars -->
  <div class="mb-5">
    <h1>my cars</h1>
    <Button @click="handleCreateCar">Create empty car</Button>
    <select @change="handleSelectCar">
      <option v-for="car in cars" :key="car.id" :value="car.id">{{ car.id }}</option>
    </select>
  </div>

  <!-- selected car -->
  <div class="mb-5">
    <h1>selected car</h1>
    <CarInfo :car="selectedCar" />
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
import { onMounted, ref, watch, watchEffect } from 'vue';
import CarPartModelsTable from '~/components/cars/CarPartModelsTable.vue';
import CarPartsTable from '~/components/cars/CarPartsTable.vue';
import CarInfo from '~/components/cars/CarInfo.vue';

import { CarPartModel } from '~/server/core/domain/car/CarPartModel';
import { CarPart } from '~/server/core/domain/car/CarPart';
import { Car } from '../../server/core/domain/car/Car';


const models = ref<CarPartModel[]>([]);
const parts = ref<CarPart[]>([]);
const cars = ref<Car[]>([]);
const selectedCar = ref<Car | undefined>();

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

const handleSelectPart = async (part: CarPart) => {
  if (!selectedCar.value) {
    alert("SELECCIONA UN AUTO PIBE")
    return;
  }
  const url = `/api/car/set-part`;
  const slot = await $fetch(url, {
    method: "POST",
    body: {
      carId: selectedCar.value.id,
      carPartId: part.id
    }
  });
  console.log("ES SLOT", slot);
  getCars();
}

const handleCreateCar = async () => {
  const url = `/api/car/create`;
  const part = await $fetch(url, {
    method: "POST"
  });
  getCars();
}

const handleSelectCar = (event: any) => {
  if (!event.target) return;
  const carId = event.target.value;
  const car = cars.value.find(c => c.id === Number(carId));
  selectedCar.value = car;
}

const getCars = async () => {
  const url = `/api/car`;
  const response = await $fetch(url, {
    method: "GET"
  });
  cars.value = response as Car[];
}

onMounted(async () => {
  await getModels();
  await getUserParts();
  await getCars();
})

// watchEffect(() => {
//   if (cars.value.length > 0) {
//     selectedCar.value = cars.value[0];
//   }
// })

</script>