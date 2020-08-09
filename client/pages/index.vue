<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div v-if="ready" class="flex flex-wrap">
        <div class="w-full md:w-2/3">
          <div v-for="post in posts" :key="post.id" class="mb-10">
            <PostCard :post="post" />
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
// @ts-ignore-next-line
import { Fragment } from 'vue-fragment'

import PostCard from '~/components/home/PostCard.vue'
import ProfileCard from '~/components/home/ProfileCard.vue'
import AuthCard from '~/components/home/AuthCard.vue'

export default Vue.extend({
  components: {
    Fragment,
    PostCard,
    ProfileCard,
    AuthCard,
  },
  async asyncData({ $axios }) {
    const posts = await $axios.get('/posts')
    return {
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
