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
      <div class="mb-6 flex justify-start items-center space-x-6">
        <h1 class="text-xl">
          <span class="font-semibold">
            {{ totalPosts }}
          </span>
          posts
        </h1>
        <button @click="$emit('toggle-followers-modal')">
          <h1 class="text-xl">
            <span class="font-semibold">
              {{ totalFollowers }}
            </span>
            followers
          </h1>
        </button>
        <button @click="$emit('toggle-following-modal')">
          <h1 class="text-xl">
            <span class="font-semibold">
              {{ totalFollowing }}
            </span>
            following
          </h1>
        </button>
      </div>
      <h4 class="font-semibold text-xl">{{ user.displayName }}</h4>
      <p>{{ user.bio }}</p>
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
    totalPosts: {
      type: Number,
      required: true,
    },
    totalFollowers: {
      type: Number,
      required: true,
    },
    totalFollowing: {
      type: Number,
      required: true,
    },
  },
  methods: {
    sanitizeUrl(url: string): string {
      return sanitizeUrl(url)
    },
  },
})
</script>
