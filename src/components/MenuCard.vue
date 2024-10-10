<template>
  <NuxtLink 
    :to="to" 
    class="font-mono flex flex-col items-center justify-center w-48 h-48 cursor-pointer border-0 border-dashed border-black rounded-lg "
  >
    <!-- Icono (puede ser un SVG o cualquier ícono de librería) -->
    <div class="text-4xl mb-2">
      {{ icon }}
    </div>
    <!-- Texto -->
    <span class="text-lg font-semibold ">{{title}}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
  defineProps({
    to:String,
    title: String,
    icon: String
  })

</script>

<style scoped>
/* Agregar estilos adicionales si es necesario */
</style>
