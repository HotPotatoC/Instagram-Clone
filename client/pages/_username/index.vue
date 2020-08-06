<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div v-if="ready" class="flex flex-wrap">
        <div class="w-full">
          <div class="flex flex-wrap justify-around items-center">
            <div class="w-full sm:w-1/4">
              <img
                class="rounded-full h-32 md:h-40 lg:h-auto object-cover"
                :src="`${storageURL}${user.avatarImg}`"
                :alt="user.username"
              />
            </div>
            <div class="w-full sm:w-3/4">
              <h1 class="mb-6 font-light text-4xl">{{ user.username }}</h1>
              <h4 class="font-semibold text-xl">{{ user.displayName }}</h4>
              <p class="">{{ user.bio }}</p>
              <a
                class="text-blue-900"
                :href="user.website"
                target="_blank"
                rel="noopener noreferrer"
                >{{ sanitizeUrl(user.website || null) }}</a
              >
            </div>
          </div>
        </div>
        <hr class="w-full mt-32 border border-gray-400" />
        <div class="w-full mt-12">
          <div class="flex flex-wrap justify-start items-center">
            <div
              v-for="post in posts"
              :key="post.id"
              class="w-full md:w-2/6 mb-6"
            >
              <img
                class="w-full h-full md:w-64 md:h-64 object-cover"
                :src="`${storageURL}${post.image}`"
                :alt="post.caption"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import { sanitizeUrl } from '@braintree/sanitize-url'
// @ts-ignore-next-line
import { Fragment } from 'vue-fragment'

export default Vue.extend({
  components: {
    Fragment,
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
      storageURL: process.env.storageURL,
    }
  },
  methods: {
    sanitizeUrl(url: string): string {
      return sanitizeUrl(url)
    },
  },
  head() {
    return {
      title: 'Instagram',
    }
  },
})
</script>
