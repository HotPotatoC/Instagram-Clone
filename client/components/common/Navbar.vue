<template>
  <div class="w-full fixed z-10 top-0 py-2 bg-white border-b">
    <Container>
      <div class="flex justify-between items-center">
        <nuxt-link to="/">
          <h1 class="text-2xl">Instagram</h1>
        </nuxt-link>
        <div class="flex justify-between items-center space-x-6">
          <nuxt-link to="/">
            <HomeIcon />
          </nuxt-link>
          <HeartIcon />
          <nuxt-link v-if="$auth.loggedIn" :to="`/${$auth.user.username}`">
            <img
              class="rounded-full h-8 object-cover"
              :src="`${$config.storageURL}${$auth.user.avatarImg}`"
              :alt="$auth.user.username"
            />
          </nuxt-link>
        </div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HeartIcon, HomeIcon } from 'vue-feather-icons'

export default Vue.extend({
  name: 'Navbar',
  components: {
    HeartIcon,
    HomeIcon,
  },
  data() {
    return {
      storageURL: process.env.storageURL,
    }
  },
})
</script>

<style></style>
