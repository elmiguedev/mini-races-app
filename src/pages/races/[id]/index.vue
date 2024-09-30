<template>
  <h1>races {{ id }}</h1>
</template>
<script setup lang="ts">
const { params } = useRoute();
const id = params.id;
</script>