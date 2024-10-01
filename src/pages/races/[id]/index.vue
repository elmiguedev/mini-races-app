<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl mb-10">Race {{ race?.id }}</h1>
    <div class="mb-4 flex flex-row items-end w-100">
    </div>
    <div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Race } from '../../../server/core/domain/Race';
const { params } = useRoute();
const { id } = params;

const race = ref<Race | undefined>();

const getRace = async () => {
  race.value = await $fetch(`/api/races/${id}`);
}

onMounted(async () => {
  await getRace();
})

</script>