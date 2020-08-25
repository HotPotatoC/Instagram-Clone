<template>
  <div>
    <Navbar />
    <Modal :show="isShowFollowersModal" @close="toggleFollowersModal">
      <template slot="title">
        <span class="font-semibold"> {{ user.username }} </span>'s followers
      </template>

      <div
        v-for="follower in followers.items"
        :key="follower.followedBy.id"
        class="flex justify-between items-center p-4"
      >
        <nuxt-link
          :to="`/${follower.followedBy.username}`"
          class="flex justify-between items-center space-x-6"
        >
          <img
            class="rounded-full h-12 object-cover"
            :src="`${$config.storageURL}${follower.followedBy.avatarImg}`"
            :alt="follower.followedBy.username"
          />
          <p class="text-base">{{ follower.followedBy.username }}</p>
        </nuxt-link>
        <MoreHorizontalIcon />
      </div>
    </Modal>
    <Modal :show="isShowFollowingModal" @close="toggleFollowingModal">
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
        <MoreHorizontalIcon />
      </div>
    </Modal>
    <Container class="mt-24">
      <div class="flex flex-wrap">
        <Fragment v-if="$fetchState.pending">
          <div class="w-full">
            <ProfileDetailsPlaceholder />
          </div>
          <hr class="w-full mt-32 border border-gray-400" />
          <div class="w-full mt-12">
            <ProfilePostsPlaceholder />
          </div>
        </Fragment>
        <Fragment v-else>
          <div class="w-full">
            <ProfileDetails
              :user="user"
              :total-posts="posts.total_records"
              :total-followers="followers.total_records"
              :total-following="followings.total_records"
              @toggle-followers-modal="toggleFollowersModal"
              @toggle-following-modal="toggleFollowingModal"
            />
          </div>
          <hr class="w-full mt-32 border border-gray-400" />
          <div class="w-full mt-12">
            <ProfilePosts :posts="posts.items" />
          </div>
        </Fragment>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

import ProfileDetails from '~/components/profile/ProfileDetails.vue'
import ProfilePosts from '~/components/profile/ProfilePosts.vue'

import ProfilePostsPlaceholder from '~/components/profile/Placeholders/ProfilePostsPlaceholder.vue'
import ProfileDetailsPlaceholder from '~/components/profile/Placeholders/ProfileDetailsPlaceholder.vue'

export default Vue.extend({
  components: {
    Fragment,
    ProfileDetails,
    ProfilePosts,
    ProfilePostsPlaceholder,
    ProfileDetailsPlaceholder,
  },
  async fetch() {
    try {
      const user = await this.$axios.get(
        `/users/${this.$route.params.username}`
      )
      const followers = await this.$axios.get(
        `/users/${this.$route.params.username}/followers`
      )
      const followings = await this.$axios.get(
        `/users/${this.$route.params.username}/followings`
      )
      const posts = await this.$axios.get(
        `/users/${this.$route.params.username}/posts`
      )
      this.user = user.data
      this.posts = posts.data
      this.followers = followers.data
      this.followings = followings.data
    } catch (error) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'User not found',
      })
    }
  },
  data() {
    return {
      user: {},
      posts: [],
      followers: [],
      followings: [],
      isShowFollowersModal: false,
      isShowFollowingModal: false,
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  methods: {
    toggleFollowersModal() {
      this.isShowFollowersModal = !this.isShowFollowersModal
    },
    toggleFollowingModal() {
      this.isShowFollowingModal = !this.isShowFollowingModal
    },
  },
  head() {
    return {
      title: 'Instagram',
    }
  },
})
</script>
