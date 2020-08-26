<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24 mb-12">
      <div class="flex justify-center items-center">
        <div class="w-full">
          <NewPostForm :error="error" @submit="upload" />
        </div>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

import NewPostForm from '~/components/post/NewPostForm.vue'

interface FormInterface {
  selectedFile: File
  caption: string
  location: string
}

export default Vue.extend({
  middleware: 'auth',
  components: {
    Fragment,
    NewPostForm,
  },
  data() {
    return {
      error: null,
    }
  },
  methods: {
    async upload(data: FormInterface) {
      try {
        await this.$store.dispatch('post/newPost', data)

        this.$router.push('/')
      } catch (error) {
        if (error.response) {
          this.error = error.response.data
          return
        }
        this.error = error
      }
    },
  },
})
</script>
