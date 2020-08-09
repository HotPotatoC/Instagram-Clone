<template>
  <div class="w-full p-4 border rounded-lg bg-white">
    <div class="text-center">
      <img
        class="m-auto rounded-full h-20 object-cover"
        :src="`${$config.storageURL}${$auth.user.avatarImg}`"
        :alt="$auth.user.username"
      />
      <h1 class="text-xl m-4">{{ $auth.user.username }}</h1>
      <nuxt-link :to="`/${$auth.user.username}`">
        <Button class="mt-6 mb-4">Go to profile</Button>
      </nuxt-link>
      <Button bg-color="bg-red-400" bg-hover-color="bg-red-500" @click="logout"
        >Logout</Button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfileCard',
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
})
</script>
