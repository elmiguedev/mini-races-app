<template>
  <div class="flex items-center justify-center min-h-96 max-h-screen bg-white">
    <div class="w-full max-w-md p-8">
      <h1 class="text-3xl font-bold text-black text-center mb-6 font-mono">
        Login
      </h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <TextField v-model="username" border-style="dashed" placeholder="user" />
        </div>
        <div class="mb-6">
          <TextField type="password" v-model="password" border-style="dashed" placeholder="password" />
        </div>
        <Button type="submit" :loading="loading">Login</Button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import TextField from "../../components/ui/TextField.vue";
import Button from "../../components/ui/Button.vue";

const username = ref('')
const password = ref('')
const loading = ref(false)

const submitForm = async () => {
  try {
    loading.value = true;
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username.value,
        password: password.value,
      }),
    });
    if (response.ok) {
      const user = await response.json();
      console.log(">> el user", user);
    } else {
      const error = await response.json();
      console.log(">> error", error);
    }
  }  catch (error) {
    console.log(">> error", error);
  } finally {
    loading.value = false;
  }
  
}
</script>

<style scoped>
/* Puedes personalizar aún más los estilos si es necesario */
</style>
