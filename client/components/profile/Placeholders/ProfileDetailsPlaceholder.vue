<template>
  <content-placeholders :rounded="true">
    <div class="flex flex-wrap justify-around items-center">
      <div class="w-full sm:w-1/4">
        <content-placeholders-img
          class="rounded-full h-32 md:h-40 lg:h-auto object-cover"
        />
      </div>
      <div class="w-full sm:w-3/4">
        <content-placeholders-heading :lines="4" />
        <content-placeholders-text class="mt-4" :lines="3" />
      </div>
    </div>
  </content-placeholders>
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
