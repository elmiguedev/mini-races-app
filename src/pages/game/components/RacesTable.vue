<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="race in races">
        <td>{{ race.id }}</td>
        <td>{{ race.createdAt }}</td>
        <td>
          <Button>join</Button>
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

</script>