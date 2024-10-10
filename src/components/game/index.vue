<template>
  <div id="pro"></div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import Phaser, { Game } from 'phaser';
import {RaceScene} from "./core/scenes/RaceScene";
const emit = defineEmits(["mounted"]);
const { socket } = defineProps(["socket"]);

let game: Game | undefined = undefined;
onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    parent: 'pro',
    backgroundColor: '#ffffff',
    render: {
      pixelArt: true,
      transparent: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
  });

  game.scene.add('RaceScene', RaceScene, true, { socket: socket });
  emit("mounted");

});

onBeforeUnmount(() => {
  if (game) {
    game.destroy(true);
    game = undefined;
  }
})

</script>

<style scoped>
#pro {
  background-color: white !important;
}

#pro>canvas {
  background-color: white !important;
}
</style>