<template>
  <button
    class="w-full px-4 py-2 font-medium rounded duration-75"
    :class="[bgColor, `hover:${bgHoverColor}`, textColor, border]"
    :type="nativeType"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',
  props: {
    nativeType: {
      type: String,
      default: null,
    },
    bgColor: {
      type: String,
      default: 'bg-blue-400',
    },
    bgHoverColor: {
      type: String,
      default: 'bg-blue-500',
    },
    textColor: {
      type: String,
      default: 'text-white',
    },
    border: {
      type: String,
      default: null,
    },
  },
})
</script>
