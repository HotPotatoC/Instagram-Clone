<template>
  <div class="container mx-auto px-4 sm:px-12 lg:px-40">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Container',
})
</script>

<style></style>
