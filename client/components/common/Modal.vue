<template>
  <portal to="modal-outlet">
    <div
      v-if="show"
      class="fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div
        class="z-10 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-4 pb-4 sm:p-5 sm:pb-5">
          <div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div class="flex items-center justify-between mb-4">
                <h3
                  id="modal-headline"
                  class="text-lg leading-6 font-medium text-gray-900"
                >
                  <slot name="title"></slot>
                </h3>
                <button @click="$emit('close')">
                  <XIcon />
                </button>
              </div>
              <div class="mt-2 overflow-y-auto overflow-x-hidden break-words">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-6 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <slot name="footer"></slot>
          </span>
        </div>
      </div>
    </div>
  </portal>
</template>

<script lang="ts">
import { XIcon } from 'vue-feather-icons'
import Vue from 'vue'
export default Vue.extend({
  name: 'Modal',
  components: {
    XIcon,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
