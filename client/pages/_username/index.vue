<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div v-if="ready" class="flex flex-wrap">
        <div class="w-full">
          <ProfileDetails :user="user"></ProfileDetails>
        </div>
        <hr class="w-full mt-32 border border-gray-400" />
        <div class="w-full mt-12">
          <ProfilePosts :posts="posts"></ProfilePosts>
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

export default Vue.extend({
  components: {
    Fragment,
    ProfileDetails,
    ProfilePosts,
  },
  async asyncData({ $axios, route }) {
    const user = await $axios.get(`/users/${route.params.username}`)
    const posts = await $axios.get('/posts')
    return {
      user: user.data,
      posts: posts.data.items,
      ready: true,
    }
  },
  data() {
    return {
      ready: false,
    }
  },
  head() {
    return {
      title: 'Instagram',
    }
  },
})
</script>
