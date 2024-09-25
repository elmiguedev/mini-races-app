<script setup lang="ts">
const { clear } = useUserSession()
const router = useRouter();
clear().then(() => router.push("/login"))
</script>
<template>
</template>