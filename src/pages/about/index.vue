<script setup lang="ts">
  import io from "socket.io-client";
  import type { Socket } from "socket.io-client";

  let socket: Socket;

  onMounted(() => {
    socket = io();
    socket.on('connect', () => {
      console.log('>> conectado');
    })
    socket.on("message", (data) => {
      console.log(">> mensaje", data);
    })
  })

  onUnmounted(() => {
  })
</script>
<template>
  <h1>about</h1>
</template>