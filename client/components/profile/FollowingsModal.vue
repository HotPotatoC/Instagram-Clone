<template>
  <Modal :show="show" @close="$emit('close-followings-modal')">
    <template slot="title">
      <span class="font-semibold"> {{ user.username }} </span>'s followings
    </template>
    <div
      v-for="following in followings.items"
      :key="following.followedTo.id"
      class="flex justify-between items-center p-4"
    >
      <nuxt-link
        :to="`/${following.followedTo.username}`"
        class="flex justify-between items-center space-x-6"
      >
        <img
          class="rounded-full h-12 object-cover"
          :src="`${$config.storageURL}${following.followedTo.avatarImg}`"
          :alt="following.followedTo.username"
        />
        <p class="text-base">{{ following.followedTo.username }}</p>
      </nuxt-link>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import { User, Following } from '~/types'

export default Vue.extend({
  name: 'FollowersModal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
    followings: {
      type: Object,
      required: true,
    } as PropOptions<Following[]>,
  },
})
</script>
