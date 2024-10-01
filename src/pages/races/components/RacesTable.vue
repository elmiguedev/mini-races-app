<template>
  <table class="w-full border border-solid border-black rounded-md">
    <thead>
      <tr class="border border-solid border-black">
        <th>Id</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody class=" border border-solid border-black">
      <tr v-for="race in races">
        <td>{{ race.id }}</td>
        <td>{{ race.createdAt }}</td>
        <td>
          <Button @click="handleJoinClick(race.id)">join</Button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { Race } from '../../../server/core/domain/Race';
import Button from '../../../components/ui/Button.vue';

defineProps({
  races: {
    type: Array<Race>,
    required: true
  }
});

const emit = defineEmits(['join']);

const handleJoinClick = (id:string) => {
  emit('join', id);
}

</script>