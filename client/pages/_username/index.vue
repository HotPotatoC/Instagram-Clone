<template>
  <div>
    <Navbar />
    <FollowersModal
      v-if="!$fetchState.pending"
      :show="isShowFollowersModal"
      :followers="followers"
      :followings="followings.items"
      :user="user"
      @close-followers-modal="toggleFollowersModal"
    />
    <FollowingsModal
      v-if="!$fetchState.pending"
      :show="isShowFollowingsModal"
      :followings="followings"
      :user="user"
      @close-followings-modal="toggleFollowingsModal"
    />
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
              :followers="followers"
              :followings="followings"
              @toggle-followers-modal="toggleFollowersModal"
              @toggle-following-modal="toggleFollowingsModal"
              @refresh-user-details="$fetch()"
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

import FollowersModal from '~/components/profile/FollowersModal.vue'
import FollowingsModal from '~/components/profile/FollowingsModal.vue'

import ProfileDetails from '~/components/profile/ProfileDetails.vue'
import ProfilePosts from '~/components/profile/ProfilePosts.vue'

import ProfilePostsPlaceholder from '~/components/profile/Placeholders/ProfilePostsPlaceholder.vue'
import ProfileDetailsPlaceholder from '~/components/profile/Placeholders/ProfileDetailsPlaceholder.vue'

export default Vue.extend({
  components: {
    Fragment,
    FollowersModal,
    FollowingsModal,
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
      isShowFollowingsModal: false,
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
    toggleFollowingsModal() {
      this.isShowFollowingsModal = !this.isShowFollowingsModal
    },
  },
  head() {
    return {
      title: 'Instagram',
    }
  },
})
</script>
