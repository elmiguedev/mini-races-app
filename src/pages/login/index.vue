<template>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="w-full max-w-md p-8 border border-black">
      <h1 class="text-3xl font-bold text-black text-center mb-6 font-mono">
        Login
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <TextField :border-style="dash" placeholder="Enter your username" />
        </div>
        <div class="mb-6">
          <TextField placeholder="Enter your password" />
        </div>
        <button type="submit"
          class="w-full py-2 text-white bg-black font-mono hover:bg-white hover:text-black hover:border hover:border-black transition">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import TextField from "../../components/ui/TextField.vue";

const username = ref('')
const password = ref('')

const submitForm = () => {
  console.log('Username:', username.value)
  console.log('Password:', password.value)
  // Aquí podrías hacer la lógica para autenticar al usuario
}
</script>

<style scoped>
/* Puedes personalizar aún más los estilos si es necesario */
</style>
