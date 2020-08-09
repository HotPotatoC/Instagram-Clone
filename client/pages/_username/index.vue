<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div class="flex flex-wrap">
        <div v-if="$fetchState.pending">
          <div class="w-full">
            <ProfileDetailsPlaceholder />
          </div>
          <hr class="w-full mt-32 border border-gray-400" />
          <div class="w-full mt-12">
            <ProfilePostsPlaceholder />
          </div>
        </div>
        <div v-else>
          <div class="w-full">
            <ProfileDetails :user="user" />
          </div>
          <hr class="w-full mt-32 border border-gray-400" />
          <div class="w-full mt-12">
            <ProfilePosts :posts="posts" />
          </div>
        </div>
      </div>
    </Container>
  </Fragment>
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
    const user = await this.$axios.get(`/users/${this.$route.params.username}`)
    const posts = await this.$axios.get('/posts')
    this.user = user.data
    this.posts = posts.data.items
  },
  data() {
    return {
      posts: [],
      user: {},
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  head() {
    return {
      title: 'Instagram',
    }
  },
})
</script>
