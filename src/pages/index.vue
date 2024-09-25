<template>
  <section class="flex items-center justify-center ">
    <h1 class="text-3xl">Hola {{ user?.name }}!</h1>
  </section>
</template>

<script setup lang="ts">
const { user, fetch } = useUserSession();

// fetch()

</script>