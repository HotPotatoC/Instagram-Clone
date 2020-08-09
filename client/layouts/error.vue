<template>
  <Fragment>
    <Navbar />
    <Container class="mt-24">
      <div class="flex flex-col justify-center items-center">
        <h1 class="font-bold text-6xl">{{ error.statusCode }}</h1>
        <p class="text-xl">{{ error.message }}</p>
      </div>
    </Container>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
// @ts-ignore
import { Fragment } from 'vue-fragment'

export default Vue.extend({
  components: {
    Fragment,
  },
  props: ['error'],
})
</script>

<style></style>
