<template>
  <table class="w-full rounded-md">
    <thead>
      <tr>

      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { CarPartModel } from '../../server/core/domain/car/CarPartModel';

defineProps({
  models: Object as () => CarPartModel[]
})

</script>