<template>
  <button :type="type" class="w-full py-2 rounded-sm text-white bg-black font-mono transition cursor-pointer" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
    validator: (value: string) => ['reset', 'submit', 'button', undefined].includes(value)
  },
})


</script>
