<script setup lang="ts">
import { useRouter, useUserSession } from '#imports';

const { clear } = useUserSession()
const router = useRouter();
clear().then(() => router.push("/login"))
</script>
<template>
</template>