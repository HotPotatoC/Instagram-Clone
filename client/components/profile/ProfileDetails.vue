<template>
  <div class="flex flex-wrap justify-around items-center">
    <div class="w-full sm:w-1/4">
      <img
        class="rounded-full h-32 md:h-40 lg:h-auto object-cover"
        :src="`${$config.storageURL}${user.avatarImg}`"
        :alt="user.username"
      />
    </div>
    <div class="w-full sm:w-3/4">
      <h1 class="mb-6 font-light text-4xl">{{ user.username }}</h1>
      <h4 class="font-semibold text-xl">{{ user.displayName }}</h4>
      <p class="">{{ user.bio }}</p>
      <a
        class="text-blue-900"
        :href="user.website"
        target="_blank"
        rel="noopener noreferrer"
        >{{ sanitizeUrl(user.website || null) }}</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { User } from '~/types'

export default Vue.extend({
  name: 'ProfileDetails',
  props: {
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
  },
  methods: {
    sanitizeUrl(url: string): string {
      return sanitizeUrl(url)
    },
  },
})
</script>
