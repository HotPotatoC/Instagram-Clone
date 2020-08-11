<template>
  <div class="flex flex-wrap justify-between items-center">
    <div v-for="post in posts" :key="post.id" class="w-full md:w-2/6 mb-6">
      <nuxt-link :to="`/post/${post.id}`">
        <img
          class="w-full h-full md:w-64 md:h-64 object-cover"
          :src="`${$config.storageURL}${post.image}`"
          :alt="post.caption"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { Post } from '~/types'

export default Vue.extend({
  name: 'ProfilePosts',
  props: {
    posts: {
      type: Array,
      required: true,
    } as PropOptions<Post[]>,
  },
})
</script>
