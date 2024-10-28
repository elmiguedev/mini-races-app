<template>
  <div>
    <div class="flex flex-col">
      <span v-for="message in messages">{{ message }}</span>
    </div>
    <div>
      <input type="text" @keyup.enter="handleTextFieldEnter" v-model="message" placeholder="mensaje" />
      <button @click="handleTextFieldEnter">send</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import TextField from './ui/TextField.vue';

defineProps({
  messages: Array<String>,
})

const message = ref("");
const emit = defineEmits(["send"]);

const handleTextFieldEnter = () => {
  emit("send", message.value);
  message.value = "";
}
</script>
