<template>
  <div class="flex flex-wrap justify-around items-center">
    <div class="w-full sm:w-1/4">
      <img
        class="rounded-full h-32 md:h-40 lg:h-auto object-cover"
        :src="`${$config.storageURL}${user.avatarImg}`"
        :alt="user.username"
      />
    </div>
    <div class="w-full sm:w-3/4 sm:pl-6">
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
              {{ followers.total_records }}
            </span>
            followers
          </h1>
        </button>
        <button @click="$emit('toggle-following-modal')">
          <h1 class="text-xl">
            <span class="font-semibold">
              {{ followings.total_records }}
            </span>
            following
          </h1>
        </button>
      </div>
      <h4 class="font-semibold text-xl">{{ user.displayName }}</h4>
      <p>{{ user.bio }}</p>
      <a
        v-if="user.website"
        class="text-blue-900"
        :href="user.website"
        target="_blank"
        rel="noopener noreferrer"
        >{{ sanitizeUrl(user.website || null) }}</a
      >
      <Fragment v-if="$auth.loggedIn && user.id !== $auth.user.id">
        <Button v-if="!isFollowed" class="w-full mt-6" @click="followUser">
          Follow
        </Button>
        <Button
          v-else
          class="w-full mt-6"
          bg-color="bg-gray-400"
          bg-hover-color="bg-gray-500"
          text-color="text-gray-800"
          @click="unfollowUser"
        >
          Unfollow
        </Button>
      </Fragment>
      <Fragment v-else-if="$auth.loggedIn && user.id === $auth.user.id">
        <nuxt-link to="/post/new">
          <Button class="w-full mt-6">
            Upload a new post
          </Button>
        </nuxt-link>
      </Fragment>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'
import { sanitizeUrl } from '@braintree/sanitize-url'

import { User, Follower, Following } from '~/types'

export default Vue.extend({
  name: 'ProfileDetails',
  components: {
    Fragment,
  },
  props: {
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
    totalPosts: {
      type: Number,
      required: true,
    },
    followers: {
      type: Object,
      required: true,
    } as PropOptions<Follower[]>,
    followings: {
      type: Object,
      required: true,
    } as PropOptions<Following[]>,
  },
  data() {
    return {
      isFollowed: false,
    }
  },
  async mounted() {
    if (this.$auth.loggedIn && this.user.id !== this.$auth.user.id) {
      const { data } = await this.$axios.get(
        `/users/${this.$auth.user.username}/followings`
      )

      const followings: Following[] = data.items

      const isFollowed: boolean = followings.some(
        (following) => this.user.id === following.followedTo.id
      )

      if (isFollowed) {
        this.isFollowed = true
      }
    }
  },
  methods: {
    async followUser() {
      await this.$axios.post(`/users/${this.user.username}/follow`)

      this.isFollowed = true
      this.$emit('refresh-user-details')
    },
    async unfollowUser() {
      await this.$axios.post(`/users/${this.user.username}/unfollow`)

      this.isFollowed = false
      this.$emit('refresh-user-details')
    },
    sanitizeUrl(url: string): string {
      return sanitizeUrl(url)
    },
  },
})
</script>
