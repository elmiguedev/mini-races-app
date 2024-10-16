<template>
  <table class="w-full rounded-md">
    <thead>
      <tr>
        <th>Id</th>
        <th>Model</th>
        <th>Created At</th>
        <th>Acc upgrade</th>
        <th>Vel upgrade</th>
        <th>Res upgrade</th>
        <th>Str upgrade</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="part in parts">
        <td>{{ part.id }}</td>
        <td>{{ part.CarPartModel?.name }}</td>
        <td>{{ formatDate(part.createdAt!) }}</td>
        <td>{{ part.accelerationUpgrade }}</td>
        <td>{{ part.velocityUpgrade }}</td>
        <td>{{ part.resistanceUpgrade }}</td>
        <td>{{ part.steeringUpgrade }}</td>
        <td>
          <Button @click="handleSelectClick(part)">Select</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { CarPart } from '../../server/core/domain/car/CarPart';

defineProps({
  parts: {
    type: Array<CarPart>,
    required: true
  }
})

const emit = defineEmits(["select"]);

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
}

const handleSelectClick = (part: CarPart) => {
  emit('select', part);
}

</script>

<style>
th,
td {
  border: 1px solid #000;
  text-align: left;
  padding-left: 4px;
}
</style>