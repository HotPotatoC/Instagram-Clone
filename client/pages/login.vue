<template>
  <Fragment>
    <Container class="mt-24">
      <div class="flex justify-center items-center">
        <div class="w-full md:w-3/6">
          <div class="bg-white border rounded-lg p-4 md:p-6">
            <h1 class="text-center text-2xl md:text-4xl">Instagram</h1>
            <form class="mt-8" @submit.prevent="login">
              <input
                id="username"
                v-model="username"
                class="w-full mb-4 px-4 py-2 border-2 bg-gray-200"
                type="text"
                placeholder="Username, or E-Mail Address"
              />
              <input
                id="password"
                v-model="password"
                class="w-full mb-6 px-4 py-2 border-2 bg-gray-200"
                type="password"
                placeholder="Password"
              />
              <button
                class="w-full mb-4 px-4 py-2 font-medium text-white bg-blue-400 rounded duration-75 hover:bg-blue-500"
                type="submit"
              >
                Log in
              </button>
              <div class="text-center">
                <nuxt-link class="text-blue-400 hover:underline" to="/register"
                  >Don't have an account yet?</nuxt-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore-next-line
import { Fragment } from 'vue-fragment'

export default Vue.extend({
  components: {
    Fragment,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const { status } = await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password,
        },
      })

      if ((status as number) === 200) {
        this.$auth.ctx.redirect('/')
      }
    },
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to Instagram',
        },
      ],
    }
  },
})
</script>

<style></style>
