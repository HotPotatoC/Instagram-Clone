<template>
  <form
    enctype="multipart/form-data"
    @submit.prevent="$emit('submit', formData)"
  >
    <div
      ref="dropzone"
      class="w-full bg-white p-6 rounded border-2 border-dashed border-gray-400 duration-100 text-center"
      :class="{ isDragging }"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
      @dragover.prevent
      @drop="onDrop"
    >
      <h1 class="font-bold text-2xl md:text-4xl mb-12">Drag your image here</h1>
      <h2 class="font-semibold text-xl md:text-2xl">OR</h2>
      <input type="file" title=" " @change="onFileSelected" />
    </div>
    <textarea
      id="caption"
      v-model="formData.caption"
      class="w-full mt-4 mb-2 px-4 py-2 border-2 bg-white rounded"
      type="text"
      placeholder="Caption"
    ></textarea>
    <small
      v-if="
        error && error.details && error.details[0].context.key === 'caption'
      "
      class="text-red-400"
      >{{ error.message }}</small
    >
    <input
      id="location"
      v-model="formData.location"
      class="w-full mt-4 mb-2 px-4 py-2 border-2 bg-white rounded"
      type="text"
      placeholder="Location (Optional)"
    />
    <small
      v-if="
        error && error.details && error.details[0].context.key === 'location'
      "
      class="text-red-400"
      >{{ error.message }}</small
    >
    <div class="flex justify-center items-center">
      <Button class="w-full md:w-1/2">Upload</Button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NewPostForm',
  props: {
    error: {
      type: [Error, Object],
      default: null,
    },
  },
  data() {
    return {
      formData: {
        selectedFile: null as any,
        caption: '',
        location: '',
      },
      isDragging: false,
      fileError: null as any,
    }
  },
  methods: {
    onFileSelected(event: Event) {
      const target = event.target as HTMLInputElement
      const file: File = (target.files as FileList)[0]

      this.formData.selectedFile = file
    },
    onDragEnter(event: Event) {
      event.preventDefault()

      this.isDragging = true
    },
    onDragLeave(event: Event) {
      event.preventDefault()

      this.isDragging = false
    },
    onDrop(event: DragEvent) {
      event.preventDefault()
      event.stopPropagation()

      const { files } = event.dataTransfer as DataTransfer

      const file = files[0]

      if (!file.type.match('image.*')) {
        this.fileError = `${file.name} is not an image`
        return
      }
      this.formData.selectedFile = file
    },
  },
})
</script>

<style>
.isDragging {
  @apply border-2;
  @apply border-blue-500;
}
</style>
