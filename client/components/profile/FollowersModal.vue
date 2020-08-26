<template>
  <Modal :show="show" @close="$emit('close-followers-modal')">
    <template slot="title">
      <span class="font-semibold"> {{ user.username }} </span>'s followers
    </template>

    <div
      v-for="follower in followers.items"
      :key="follower.followedBy.id"
      class="flex flex-col p-4"
    >
      <div class="flex justify-between">
        <div class="flex flex-row flex-1 space-x-4 items-center">
          <nuxt-link :to="`/${follower.followedBy.username}`">
            <img
              class="rounded-full h-12 object-cover"
              :src="`${$config.storageURL}${follower.followedBy.avatarImg}`"
              :alt="follower.followedBy.username"
            />
          </nuxt-link>
          <nuxt-link
            :to="`/${follower.followedBy.username}`"
            class="flex flex-col text-left"
          >
            <p class="font-semibold">{{ follower.followedBy.username }}</p>
            <p class="font-medium text-gray-600">
              {{ follower.followedBy.displayName }}
            </p>
          </nuxt-link>
        </div>
        <Fragment v-if="$auth.loggedIn">
          <Button
            v-if="!checkIfFollowed(follower.followedBy)"
            class="mt-6"
            @click="followUser"
          >
            Follow
          </Button>
          <Button
            v-else
            class="mt-6"
            bg-color="bg-gray-400"
            bg-hover-color="bg-gray-500"
            text-color="text-gray-800"
            @click="unfollowUser"
          >
            Unfollow
          </Button>
        </Fragment>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

import { User, Follower, Following } from '~/types'

export default Vue.extend({
  name: 'FollowersModal',
  components: {
    Fragment,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
    followers: {
      type: Object,
      required: true,
    } as PropOptions<Follower>,
    followings: {
      type: Array,
      required: true,
    } as PropOptions<Following[]>,
  },
  data() {
    return {
      isFollowed: false,
    }
  },
  methods: {
    async checkIfFollowed(follower: User): Promise<Boolean> {
      const { data } = await this.$axios.get(
        `/users/${this.$auth.user.username}/followings`
      )
      if (data.items.includes({ followedTo: { id: follower.id } })) {
        return true
      }
      return false
    },
    async followUser() {
      await this.$axios.post(`/users/${this.user.username}/follow`)

      this.isFollowed = true
    },
    async unfollowUser() {
      await this.$axios.post(`/users/${this.user.username}/unfollow`)

      this.isFollowed = false
    },
  },
})
</script>
