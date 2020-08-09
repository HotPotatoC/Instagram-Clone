<template>
  <content-placeholders :rounded="true">
    <div class="flex flex-wrap justify-between items-center">
      <div v-for="n in 9" :key="n" class="w-full md:w-2/6 mb-6">
        <div class="w-full h-full md:w-64 md:h-64 object-cover">
          <content-placeholders-img />
        </div>
      </div>
    </div>
  </content-placeholders>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { Post } from '~/types'

export default Vue.extend({
  name: 'ProfilePostsPlaceholder',
  props: {
    posts: {
      type: Array,
      required: true,
    } as PropOptions<Post[]>,
  },
})
</script>
