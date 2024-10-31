<template>
  <div class="font-mono flex flex-col items-center w-full px-20">
    <h1 class="text-3xl mb-10">Race Id: {{ race?.id }}</h1>
    <div v-if="!showGame" class="mb-4 flex w-full ">
      <Button @click="handlePlayerReadyClick">I'm ready</Button>
    </div>
    <div v-if="!showGame" class="flex flex-col gap-3 w-full">
      <div class="flex w-100" v-for="player in race?.players">
        <LobbyPlayer :player="player" />
      </div>
    </div>
    <div v-if="showGame">
      <Game :race="race" />
    </div>
    <div v-if="!showGame">
      <ChatBox :messages="messages" @send="handleChatBoxMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../../components/ui/Button.vue';
import Game from "../../../components/game/index.vue";
import ChatBox from "../../../components/ChatBox.vue";
import LobbyPlayer from '~/components/LobbyPlayer.vue';

import type { RaceData } from '../../../server/core/domain/race/RaceData';
import { useRoute } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { SocketManager } from '../../../services/socket/SocketManager';
const { params } = useRoute();
const { id } = params;
const race = ref<RaceData | undefined>();
const showGame = ref(false);
const messages = ref<string[]>([]);



const startGame = () => {
  showGame.value = true
}

const handleChatBoxMessage = (message: string) => {
  SocketManager.getInstance().emit("room_chat", message);
}

const handlePlayerReadyClick = () => {
  SocketManager.getInstance().emit("player_ready", {});
}

const checkRaceReady = () => {
  if (race.value?.status === "ready") {
    startGame();
  }
}

const joinRoom = (id: string) => {
  SocketManager.getInstance().join(id);

  SocketManager.getInstance().on("room_chat", (data) => {
    console.log("chat", data);
    messages.value.push(`${data.name}: ${data.message}`);
  })

  SocketManager.getInstance().on("race_status", (data) => {
    race.value = data;
    checkRaceReady();
  });

}


const getRace = async () => {
  race.value = await $fetch(`/api/races/${id}`);
  console.log()
  console.log(">> race", race.value);
  console.log()
  joinRoom(race.value?.id!);

}

onMounted(async () => {
  await getRace();
})

onBeforeUnmount(() => {
  SocketManager.getInstance().disconnect();
})

</script>