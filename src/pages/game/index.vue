<template>
  <div class="flex flex-col items-center max-h-screen">
    <h1 class="text-center text-3xl font-bold">Lo autito</h1>
    <div class="w-[700px] h-[500px] border-2 border-dotted border-black rounded-md p-4 mt-4 flex items-center justify-center">
      <LazyGame v-if="showGameComponent" @mounted="showGame" />
      <span v-if="loading" class="font-semibold">loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue';

const showGameComponent = ref(false);
const loading = ref(true);

const showGame = () => {
  loading.value = false;
}

onMounted(() => {
  showGameComponent.value = true
});


</script>

