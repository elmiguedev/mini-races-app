<template>
  <div class="relative flex items-center w-full">
    <!-- Icono izquierdo (opcional) -->
    <span v-if="leftIcon" class="absolute left-3">
      <slot name="left-icon"></slot>
    </span>

    <!-- Input -->
    <input v-bind="$attrs" :class="[
      'w-full px-4 py-2 text-black font-mono bg-white border-2 border-black rounded-md', // Borde más grueso y negro
      `border-${borderStyle}-black`, // Variedad de borde (solid, dashed, dotted)
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      'focus:outline-none'
    ]" :placeholder="placeholder" />

    <!-- Icono derecho (opcional) -->
    <span v-if="rightIcon" class="absolute right-3">
      <slot name="right-icon"></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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
    default: 'solid',
    validator: (value: string) => ['solid', 'dashed', 'dotted'].includes(value)
  }
})
</script>

<style scoped>
input {
  border-radius: 6px;
  /* Borde con radio */
}
</style>
