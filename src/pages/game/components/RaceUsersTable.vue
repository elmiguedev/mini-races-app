<template>
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import type { User } from '../../../core/domain/user/User';

  defineProps({
    users: {
      type: Array<User>,
      required: true
    }
  });

</script>