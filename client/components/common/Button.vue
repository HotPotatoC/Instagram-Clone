<template>
  <button
    class="px-4 py-2 font-medium rounded duration-75"
    :class="btnClasses"
    :type="nativeType"
    :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClasses() {
      if (this.disabled) {
        return ['bg-gray-400', 'text-gray-600', 'cursor-not-allowed']
      }
      return [
        this.bgColor,
        `hover:${this.bgHoverColor}`,
        this.textColor,
        this.border,
      ]
    },
  },
})
</script>
