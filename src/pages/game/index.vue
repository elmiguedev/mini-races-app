<template>
  <div class="flex flex-col items-center max-h-screen">
    <h1 class="text-center text-3xl font-bold mb-10">Lo autito</h1>
    <div class="mb-4 flex flex-row items-end w-100">
      <Button @click="createRace">
        Create race
      </Button>
    </div>
    <div>
      <RacesTable :races="races"/>
    </div>
    <!-- <div class="w-[700px] h-[500px] border-2 border-dotted border-black rounded-md p-4 mt-4 flex items-center justify-center">
      <LazyGame v-if="showGameComponent" @mounted="showGame" />
      <span v-if="loading" class="font-semibold">loading...</span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RacesTable from './components/RacesTable.vue';
import Button from '../../components/ui/Button.vue';
import type { Race } from '../../server/core/domain/Race';

// page state
const races = ref<Array<Race>>([]);

// page methods
const createRace = async () => {
  await $fetch("/api/races", {
    method: "POST"
  });
  await getRaces();
}

const getRaces = async () => {
  races.value = await $fetch("/api/races");
}

onMounted(async () => {
  await getRaces();
})

</script>

