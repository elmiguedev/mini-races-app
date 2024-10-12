<template>
  <div class="relative flex items-center w-full">
    <!-- Icono izquierdo (opcional) -->
    <span v-if="leftIcon" class="absolute left-3">
      <slot name="left-icon"></slot>
    </span>

    <!-- Input -->
    <input :class="[
      'w-full px-4 py-2 text-black font-mono bg-white border border-black rounded-md',
      `border-${borderStyle}`, 
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      'focus:outline-none'
    ]" 
     v-bind="$attrs"
    :placeholder="placeholder"
    v-model="inputValue"
    />

    <!-- Icono derecho (opcional) -->
    <span v-if="rightIcon" class="absolute right-3">
      <slot name="right-icon"></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Enter text...'
  },
  leftIcon: {
    type: Boolean,
    default: false
  },
  rightIcon: {
    type: Boolean,
    default: false
  },
  borderStyle: {
    type: String,
    default: 'dashed',
  }
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.value);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
})

</script>

<style scoped>
input {
  border-radius: 6px;
  /* Borde con radio */
}
</style>
