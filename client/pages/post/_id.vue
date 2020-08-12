<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24 mb-12">
      <div v-if="$fetchState.pending" class="w-full">
        <PostsPlaceholder />
      </div>
      <div v-else class="w-full">
        <PostCard :post="post" @refresh-posts="$fetch()" />
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

import PostCard from '~/components/post/PostCard.vue'

import PostsPlaceholder from '~/components/post/Placeholders/PostCardPlaceholder.vue'

export default Vue.extend({
  components: {
    Fragment,
    PostCard,
    PostsPlaceholder,
  },
  async fetch() {
    const post = await this.$axios.get(`/posts/${this.$route.params.id}`)
    this.post = post.data
  },
  data() {
    return {
      post: [],
    }
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
})
</script>
