<template>
  <div class="bg-white border rounded-lg overflow-hidden">
    <div class="flex justify-between items-center p-4">
      <div class="flex justify-between items-center space-x-6">
        <img
          class="rounded-full h-12 object-cover"
          :src="`${storageURL}${post.user.avatarImg}`"
          :alt="post.user.username"
        />
        <p class="text-base">{{ post.user.username }}</p>
      </div>
      <MoreHorizontalIcon />
    </div>
    <img class="w-full" :src="`${storageURL}${post.image}`" :alt="post.id" />
    <div class="flex justify-between items-center p-4">
      <div class="flex justify-between items-center space-x-4">
        <HeartIcon />
        <MessageCircleIcon />
        <SendIcon />
      </div>
      <i data-feather="bookmark"></i>
    </div>
    <div class="px-4 pt-1 pb-4">
      <p class="text-base">
        <span class="font-semibold mr-4">{{ post.user.username }} </span
        >{{ post.caption }}
      </p>
    </div>
    <div class="px-4 pt-1 pb-4">
      <p class="font-light text-gray-600">
        {{ post.createdAt | moment('from') }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SendIcon,
} from 'vue-feather-icons'
import { Post } from '~/types'

export default Vue.extend({
  name: 'Post',
  components: {
    HeartIcon,
    MessageCircleIcon,
    MoreHorizontalIcon,
    SendIcon,
  },
  props: {
    post: {
      type: Object,
      required: true,
    } as PropOptions<Post[]>,
  },
  data() {
    return {
      storageURL: process.env.storageURL,
    }
  },
})
</script>

<style></style>
