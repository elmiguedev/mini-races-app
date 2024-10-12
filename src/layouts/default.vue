<template>
  <div class="px-40 font-mono">
    <Header v-if="loggedIn"></Header>
    <UserHeader  v-if="loggedIn"/>
    <div class="pt-10">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSession } from '#imports';

const {loggedIn} = useUserSession();
</script>