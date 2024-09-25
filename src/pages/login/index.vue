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
          <TextField type="password" border-style="dashed" v-model="password" placeholder="password" />
        </div>
        <Button type="submit" :loading="loading">Login</Button>
      </form>
      <RouterLink 
        to="/register" 
        class="flex w-full text-center justify-center items-center mt-4 cursor-pointer decoration-solid underline decoration-black"
        :class="{ 'font-bold text-gray-800': $route.path === '/register' }"
      >
        Register
     </RouterLink>
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
const router = useRouter();
const { fetch } = useUserSession(); // Asegurate de tener algo como esto en tu composable o utilidad

const submitForm = async () => {
  loading.value = true;
  try {
    const body = {
      email: username.value,
      password: password.value,
    };

    // Enviar solicitud de login
    await $fetch("/api/auth/login", {
      method: "POST",
      body,
    });

    // Refrescar la sesión del usuario para asegurarnos que está actualizado
    await fetch(); // Esto asegura que el middleware capture la nueva sesión

    // Redirigir después del login exitoso
    router.push("/")
    loading.value = false;
  } catch (error) {
    console.log({ error });
    alert(error.statusMessage || error);
    loading.value = false;
  }
}
</script>
