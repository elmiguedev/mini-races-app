<template>
  <button :type="type" class="w-full py-2 px-2 rounded-sm text-white bg-black font-mono transition cursor-pointer" v-bind="$attrs">
    <span v-if="loading" class="flex justify-center items-center">
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
    </span>
    
    <span v-else>
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset',
    default: 'button',
    validator: (value: string) => ['reset', 'submit', 'button', undefined].includes(value)
  },
  loading: {
    type:Boolean,
    default: false
  }
})


</script>
