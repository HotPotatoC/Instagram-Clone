<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24 mb-8">
      <div v-if="$fetchState.pending"></div>
      <article v-else class="relative bg-white border rounded">
        <header class="p-4 bg-white border-b rounded-tl rounded-tr">
          <nuxt-link
            class="flex items-center space-x-4"
            :to="`/${post.user.username}`"
          >
            <img
              class="rounded-full h-8 lg:h-12 object-cover"
              :src="`${$config.storageURL}${post.user.avatarImg}`"
              :alt="post.user.username"
            />
            <p class="text-base">{{ post.user.username }}</p>
          </nuxt-link>
        </header>
        <div class="max-w-6xl">
          <img
            class="object-cover select-none"
            :src="`${$config.storageURL}${post.image}`"
            :alt="post.caption"
          />
        </div>
        <div class="w-full mr-12 p-4 leading-normal rounded-br rounded-bl">
          <div class="break-words">
            <nuxt-link :to="`/${post.user.username}`">
              <span class="font-semibold mr-2">{{ post.user.username }}</span>
            </nuxt-link>
            <span>{{ post.caption }}</span>
            <div v-if="post.comments.length > 0" class="w-full pb-2">
              <div
                v-for="comment in post.comments"
                :key="comment.id"
                class="my-2"
              >
                <p class="break-words">
                  <span class="font-semibold mr-2">
                    <nuxt-link :to="`/${comment.user.username}`">
                      {{ comment.user.username }}
                    </nuxt-link> </span
                  >{{ comment.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 pb-2 border-b">
          <p class="font-light text-gray-600">
            {{ post.createdAt | moment('from') }}
          </p>
        </div>
        <div v-if="$auth.loggedIn">
          <form class="p-4" @submit.prevent="postComment">
            <div class="flex items-center">
              <div class="w-4/6 lg:w-5/6">
                <input
                  v-model="commentContent"
                  class="w-full"
                  name="comment"
                  type="text"
                  placeholder="Add a comment..."
                />
              </div>
              <div class="w-2/6 lg:w-1/6">
                <Button native-type="submit">
                  <div class="flex justify-between sm:space-x-4">
                    <SendIcon class="hidden sm:block" />
                    <p>
                      Send
                    </p>
                  </div>
                </Button>
              </div>
            </div>
            <small class="text-red-400">{{ error }}</small>
          </form>
        </div>
      </article>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'
import { SendIcon } from 'vue-feather-icons'
import { Post } from '~/types'

export default Vue.extend({
  components: {
    Fragment,
    SendIcon,
  },
  async fetch() {
    const post = await this.$axios.get(`/posts/${this.$route.params.id}`)
    this.post = post.data
  },
  data() {
    return {
      commentContent: '',
      post: {} as Post,
      error: '',
    }
  },
  methods: {
    async postComment() {
      try {
        await this.$axios.post(`/posts/${this.post.id}/comments`, {
          content: this.commentContent,
        })

        this.$emit('refresh-posts')
      } catch (error) {
        if (error.response.status === 422) {
          this.error = error.response.data.message
          return
        }
        this.error = 'There was a problem posting a comment, Try again later.'
      }
    },
  },
})
</script>

<style></style>
