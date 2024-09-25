<template>
  <Header v-if="loggedIn"></Header>
  <div class="pt-10">
    <slot />
  </div>
</template>

<script setup lang="ts">
const {loggedIn} = useUserSession();
</script>