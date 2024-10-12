<template>
  <div class="font-mono flex flex-col items-center w-full px-20">
    <h1 class="text-3xl mb-10">Race Id: {{ race?.id }}</h1>
    <div class="mb-4 flex w-full ">
      <Button @click="handleStart">I'm ready</Button>
    </div>
    <div class="flex flex-col gap-3 w-full">
      <div class="flex w-100" v-for="player in race?.players">
        <LobbyPlayer :player="player" />
      </div>
    </div>
    <div v-if="showGame">
      <Game :socket="socket" :race="race" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client';
import Button from '../../../components/ui/Button.vue';

import type { Race } from '../../../server/core/domain/race/Race';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
const { params } = useRoute();
const { id } = params;
const race = ref<Race | undefined>();
const showGame = ref(false);

const socket = io();

socket.on('connect', () => {
  console.log('>> connected', socket.id);
})

socket.on('confirm_connection', () => {
  console.log('>> confirmed', socket.id);
  socket.emit('race_join', id);
});

socket.on("race_status", (status) => {
  console.log(">> race status", status);
  race.value = status;
})


const handleStart = () => {
  showGame.value = true
}


const getRace = async () => {
  race.value = await $fetch(`/api/races/${id}`);
}

onMounted(async () => {
  await getRace();
})

</script>