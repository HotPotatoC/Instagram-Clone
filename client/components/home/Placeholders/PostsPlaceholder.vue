<template>
  <content-placeholders>
    <div class="bg-white border rounded-lg overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <div class="flex justify-between items-center space-x-6">
          <content-placeholders-heading :img="true" />
          <content-placeholders-text class="text-base" :lines="1" />
        </div>
        <MoreHorizontalIcon />
      </div>
      <content-placeholders-img class="w-full" />
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
          <content-placeholders-text class="font-semibold mr-4" :lines="1" />
        </p>
      </div>
      <div class="px-4 pt-1 pb-4">
        <p class="font-light text-gray-600">
          <content-placeholders-text :lines="1" />
        </p>
      </div>
    </div>
  </content-placeholders>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PostsPlaceholder',
  props: {
    amount: {
      type: Number,
      default: 1,
    },
  },
})
</script>
