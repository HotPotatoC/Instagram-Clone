<template>
  <div class="bg-white border rounded-lg overflow-hidden">
    <div class="flex justify-between items-center p-4">
      <div class="flex justify-between items-center space-x-6">
        <nuxt-link
          :to="`/${post.user.username}`"
          class="flex justify-between items-center space-x-6"
        >
          <img
            class="rounded-full h-12 object-cover"
            :src="`${$config.storageURL}${post.user.avatarImg}`"
            :alt="post.user.username"
          />
          <p class="text-base">{{ post.user.username }}</p>
        </nuxt-link>
      </div>
      <MoreHorizontalIcon />
    </div>
    <nuxt-link :to="`/post/${post.id}`">
      <img
        class="w-full"
        :src="`${$config.storageURL}${post.image}`"
        :alt="post.id"
      />
    </nuxt-link>
    <div class="flex justify-between items-center p-4">
      <div class="flex justify-between items-center space-x-4">
        <button v-if="!isLiked" @click="likePost">
          <HeartIcon />
        </button>
        <button v-else @click="unlikePost">
          <HeartIcon class="text-red-600 fill-current" />
        </button>
        <nuxt-link :to="`/post/${post.id}`">
          <MessageCircleIcon />
        </nuxt-link>
        <SendIcon />
      </div>
      <BookmarkIcon></BookmarkIcon>
    </div>
    <div class="px-4">
      <p
        v-if="post.likes.length > 0 && post.likes.length === 1"
        class="font-bold break-words"
      >
        {{ post.likes.length }} Like
      </p>
      <p
        v-else-if="post.likes.length > 0 && post.likes.length > 1"
        class="font-bold break-words"
      >
        {{ post.likes.length }} Likes
      </p>
    </div>
    <div class="px-4 pt-1 pb-2">
      <p class="break-words">
        <nuxt-link :to="`/${post.user.username}`">
          <span class="font-semibold mr-2">{{ post.user.username }}</span>
        </nuxt-link>
        <span v-if="isExpanded || post.caption.length < 20">{{
          post.caption
        }}</span>
        <span v-else-if="!isExpanded && post.caption.length > 20"
          >{{ postCaption }}
          <button
            class="bg-transparent focus:outline-none text-gray-600"
            @click="expand"
          >
            more
          </button></span
        >
      </p>
    </div>
    <div v-if="post.comments.length > 0" class="px-4">
      <nuxt-link v-if="post.comments.length > 1" :to="`/post/${post.id}`">
        <p class="font-light text-gray-600">
          Show all {{ post.comments.length }} comments
        </p>
      </nuxt-link>
    </div>
    <div v-if="post.comments.length > 0" class="w-full px-4 pb-2">
      <div
        v-for="comment in post.comments.slice(0, 2)"
        :key="comment.id"
        class="my-2"
      >
        <p class="break-words">
          <nuxt-link :to="`/${comment.user.username}`">
            <span class="font-medium mr-2">{{ comment.user.username }}</span>
          </nuxt-link>
          {{ comment.content }}
        </p>
      </div>
    </div>
    <div class="px-4 pb-2 border-b">
      <p class="font-light text-gray-600">
        {{ post.createdAt | moment('from') }}
      </p>
    </div>
    <div v-if="$auth.loggedIn">
      <form class="p-4" @submit.prevent="postComment">
        <div class="flex justify-between items-center">
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
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import {
  BookmarkIcon,
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SendIcon,
} from 'vue-feather-icons'
import { Post } from '~/types'

export default Vue.extend({
  name: 'Post',
  components: {
    BookmarkIcon,
    HeartIcon,
    MessageCircleIcon,
    MoreHorizontalIcon,
    SendIcon,
  },
  props: {
    post: {
      type: Object,
      required: true,
    } as PropOptions<Post>,
  },
  data() {
    return {
      commentContent: '',
      error: '',
      isExpanded: false,
      isLiked: false,
    }
  },
  computed: {
    postCaption(): string {
      return this.post.caption.length >= 50
        ? `${this.post.caption.substring(0, 50)}...`
        : this.post.caption
    },
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      const isLiked = await this.post.likes.some(
        (like) => like.userId === this.$auth.user.id
      )

      if (isLiked) {
        this.isLiked = true
      } else {
        this.isLiked = false
      }
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
    async likePost() {
      try {
        if (!this.$auth.loggedIn) {
          return this.$router.push('/login')
        }
        await this.$axios.post(`/posts/${this.post.id}/favorite`)

        this.isLiked = true
        this.$emit('refresh-posts')
      } catch (error) {}
    },
    async unlikePost() {
      try {
        await this.$axios.post(`/posts/${this.post.id}/unfavorite`)

        this.isLiked = false
        this.$emit('refresh-posts')
      } catch (error) {}
    },
    expand() {
      this.isExpanded = !this.isExpanded
    },
  },
})
</script>
