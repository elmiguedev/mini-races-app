<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl mb-10">Races</h1>
    <div class="mb-4 flex flex-row items-end w-100">
      <Button @click="createRace">Create race</Button>
    </div>
    <div class="flex w-full px-20">
      <RacesTable :races="races" @join="navigateToRace" />
    </div>
  </div>
</template>

<script setup lang="ts">
import RacesTable from './components/RacesTable.vue';
import Button from '../../components/ui/Button.vue';
import type { GetRacesResponse } from '../../server/api/races';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();
const races = ref<Array<GetRacesResponse>>([]);

const createRace = async () => {
  const race = await $fetch<GetRacesResponse>("/api/races", {
    method: "POST"
  }) 
  router.push(`/races/${race.id}`)
}

const getRaces = async () => {
  races.value = await $fetch("/api/races");
}

const navigateToRace = (id: number) => {
  console.log(">> navigating to race", id);
  router.push(`/races/${id}`);
}

onMounted(async () => {
  await getRaces();
})

</script>