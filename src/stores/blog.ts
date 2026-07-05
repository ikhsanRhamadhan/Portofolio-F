import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { BlogPost } from '@/types/blog'

export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const currentPost = ref<BlogPost | null>(null)
  const isListLoading = ref(false)
  const isDetailLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchPosts = async () => {
    isListLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/blog-posts')
      posts.value = data.data ?? []
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isListLoading.value = false
    }
  }

  const fetchPost = async (slug: string) => {
    isDetailLoading.value = true
    errorMessage.value = ''
    currentPost.value = null

    try {
      const { data } = await api.get(`/blog-posts/${slug}`)
      currentPost.value = data.data ?? null
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isDetailLoading.value = false
    }
  }

  return { posts, currentPost, isListLoading, isDetailLoading, errorMessage, fetchPosts, fetchPost }
})
