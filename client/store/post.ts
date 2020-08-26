import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Post } from '~/types'

export const state = () => ({
  posts: [] as Post[],
  error: false,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  posts: (state) => state.posts,
}

export const mutations: MutationTree<RootState> = {
  SET_POSTS: (state, payload: Post[]) => (state.posts = payload),
  SET_POSTS_FAILED: (state, payload) => (state.error = payload),
  NEW_POST: (state, payload: Post) => state.posts.push(payload),
  NEW_POST_FAILED: (state, payload) => (state.error = payload),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchPosts({ commit }) {
    try {
      const { data } = await this.$axios.get('/posts')
      commit('SET_POSTS', data.items)
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async newPost({ commit }, payload) {
    const formData = new FormData()
    const file = payload.selectedFile

    formData.append('caption', payload.caption)
    if (payload.location) {
      formData.append('location', payload.location)
    }
    formData.append('image', file, file.name)

    try {
      const { data } = await this.$axios.post('/posts', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })

      commit('NEW_POST', data.post)
      return Promise.resolve(data)
    } catch (error) {
      commit('NEW_POST_FAILED', error)
      return Promise.reject(error)
    }
  },
}
