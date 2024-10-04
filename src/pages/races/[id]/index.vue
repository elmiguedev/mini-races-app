<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl mb-10">Race {{ race?.id }}</h1>
    <div class="mb-4 flex flex-row items-end w-100">
    </div>
    <div>
      <ul>
        <li v-for="user in race?.lobbyUsers">
          {{ user.name }}
        </li>
      </ul>
    </div>
    <button @click="handleStart">start</button>
    <div v-if="showGame">
      <Game :socket="socket" :race="race" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client';
import type { Race } from '../../../server/core/domain/Race';
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