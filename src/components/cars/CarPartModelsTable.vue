<template>
  <table class="w-full rounded-md">
    <thead>
      <tr>
        <th>Id</th>
        <th>Created At</th>
        <th>Name</th>
        <th>Type</th>
        <th>Acceleration</th>
        <th>Velocity</th>
        <th>Steering</th>
        <th>Resistance</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="model in models">
        <td>{{ model.id }}</td>
        <td>{{ formatDate(model.createdAt) }}</td>
        <td>{{ model.name }}</td>
        <td>{{ model.type }}</td>
        <td>{{ model.acceleration }}</td>
        <td>{{ model.velocity }}</td>
        <td>{{ model.steering }}</td>
        <td>{{ model.resistance }}</td>
        <td>
          <Button @click="handleBuyClick(model)">Buy</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { CarPartModel } from '../../server/core/domain/car/CarPartModel';

defineProps({
  models: {
    type: Array<CarPartModel>,
    required: true
  }
})

const emit = defineEmits(['buy']);

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString();
}

const handleBuyClick = (model: CarPartModel) => {
  emit('buy', model);
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