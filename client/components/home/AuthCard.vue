<template>
  <div class="w-full p-4 border rounded-lg bg-white">
    <h1 class="text-xl text-center mb-6">Welcome to Instagram</h1>
    <nuxt-link to="/login">
      <Button class="w-full block mb-4">Sign in</Button>
    </nuxt-link>
    <nuxt-link to="/register">
      <Button class="w-full block">Sign Up</Button>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ProfileCard',
})
</script>
