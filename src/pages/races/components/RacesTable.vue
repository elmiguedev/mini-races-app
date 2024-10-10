<template>
  <table class="w-full rounded-md">
    <thead>
      <tr>
        <th>Id</th>
        <th>Created At</th>
        <th>Players</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody >
      <tr v-for="race in races" >
        <td>{{ race.id }}</td>
        <td>{{ formatDate(race.createdAt) }}</td>
        <td>{{ race.players }}</td>
        <td >
          <Button @click="handleJoinClick(race.id)">join</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import Button from '../../../components/ui/Button.vue';
import type { GetRacesResponse } from '../../../server/api/races';

defineProps({
  races: {
    type: Array<GetRacesResponse>,
    required: true
  }
});

const emit = defineEmits(['join']);

const handleJoinClick = (id:string) => {
  emit('join', id);
}

const formatDate = (date:Date) => {
  const d = new Date(date).toLocaleString();
  return d;
}

</script>

<style scoped>
th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #000 ;
}
</style>