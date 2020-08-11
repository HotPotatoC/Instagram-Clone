<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div v-if="$fetchState.pending" class="flex flex-wrap">
        <div class="w-full md:w-2/3">
          <PostsPlaceholder v-for="n in 10" :key="n" class="mb-10" />
        </div>
      </div>
      <div v-else class="flex flex-wrap">
        <div class="w-full md:w-2/3">
          <div v-for="post in posts" :key="post.id" class="mb-10">
            <PostCard :post="post" @refresh-posts="$fetch()" />
          </div>
        </div>
        <div class="pl-4 hidden md:block md:w-1/3">
          <ProfileCard v-if="$auth.loggedIn" />
          <AuthCard v-else />
        </div>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

import PostCard from '~/components/home/PostCard.vue'
import ProfileCard from '~/components/home/ProfileCard.vue'
import AuthCard from '~/components/home/AuthCard.vue'

import PostsPlaceholder from '~/components/home/Placeholders/PostsPlaceholder.vue'

export default Vue.extend({
  components: {
    Fragment,
    PostCard,
    ProfileCard,
    AuthCard,
    PostsPlaceholder,
  },
  async fetch() {
    const posts = await this.$axios.get('/posts')
    this.posts = posts.data.items
  },
  data() {
    return {
      posts: [],
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  head() {
    return {
      title: 'Home',
    }
  },
})
</script>
