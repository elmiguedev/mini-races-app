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
      <!-- <Game :socket="socketManager" :race="race" /> -->
    </div>
    <div>
      <ChatBox :messages="messages" @send="handleChatBoxMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '../../../components/ui/Button.vue';
import Game from "../../../components/game/index.vue";
import ChatBox from "../../../components/ChatBox.vue";

import type { Race } from '../../../server/core/domain/race/Race';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { SocketManager } from '../../../services/socket/SocketManager';
const { params } = useRoute();
const { id } = params;
const race = ref<Race | undefined>();
const showGame = ref(false);
const socketManager = new SocketManager(id as string);
const messages = ref<string[]>([]);

socketManager.on("room_chat", (data) => {
  console.log("chat", data);
  messages.value.push(`${data.name}: ${data.message}`);
})


const handleStart = () => {
  showGame.value = true
}

const handleChatBoxMessage = (message: string) => {
  socketManager.emit("room_chat", message);
}


const getRace = async () => {
  race.value = await $fetch(`/api/races/${id}`);
  console.log()
  console.log(">> race", race.value);
  console.log()
}

onMounted(async () => {
  await getRace();
})

</script>