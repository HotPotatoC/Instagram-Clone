<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div v-if="ready" class="flex flex-wrap">
        <div class="w-full md:w-3/4">
          <div v-for="post in posts" :key="post.id" class="mb-10">
            <Post :post="post" />
          </div>
        </div>
        <div class="hidden md:block md:w-1/4"></div>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore-next-line
import { Fragment } from 'vue-fragment'

import Post from '~/components/home/Post.vue'

export default Vue.extend({
  components: {
    Fragment,
    Post,
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
