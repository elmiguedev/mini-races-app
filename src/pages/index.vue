<template>
  <header>
    <template v-if="loggedIn">
      <p>
        Hi
        {{ user }},
      </p>
      <p @click="logout">Log out</p>
    </template>
    <p v-else>Hi Guest, <nuxt-link :to="{ name: 'login' }">Login</nuxt-link></p>
  </header>
</template>

<script setup lang="ts">
const { loggedIn, user, clear, fetch } = useUserSession();
// definePageMeta({
//   middleware: ["auth"]
// })

fetch()
const logout = () => {
  clear().then(() => {
    navigateTo("/login");
  })
};

</script>