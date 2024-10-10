<template>
  <div class="font-mono text-lg w-full">
    <div class=" flex p-3 flex-row w-full items-center justify-center border-dashed border-black border-2 rounded-md">

      <div class="flex items-center space-x-4 mr-auto">
        <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <img src="https://gravatar.com/avatar/99dc667e4344f1b75fa4e0a65808c293?s=400&d=robohash&r=x" alt="User Avatar" class="w-full h-full object-cover" />
        </div>
        <span class="font-mono">{{ player?.user.name }}</span>
      </div>

      <div>
        <span class="font-bold"> - status - </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Player } from '../server/core/domain/race/Player';

  defineProps({
    player: Object as PropType<Player>,
  })

</script>