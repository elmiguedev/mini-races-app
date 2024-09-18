<template >
  <div id="pro"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import Phaser from 'phaser';
import { MainScene} from '../core/game/scenes/MainScene';

const emit = defineEmits(["mounted"]);

onMounted(() => {
  new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'pro',
    backgroundColor: '#ffffff',
    render: {
      pixelArt: true,
      transparent: true
    },
    scene: [MainScene],
  });
  emit("mounted");

});
</script>

<style scoped>
#pro {
  background-color: white !important;
}
#pro > canvas {
  background-color: white !important;
}
</style>