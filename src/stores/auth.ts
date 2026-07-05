import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ id: number; name: string; email: string } | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref('')

  const fetchUser = async () => {
    const token = localStorage.getItem('admin_token')
    if (!token) return

    try {
      const { data } = await api.get('/admin/me')
      user.value = data.data
    } catch {
      localStorage.removeItem('admin_token')
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.post('/admin/login', { email, password })
      localStorage.setItem('admin_token', data.data.token)
      user.value = data.data.user
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'response' in e) {
        const err = e as { response?: { data?: { message?: string } } }
        errorMessage.value = err.response?.data?.message ?? 'Login gagal.'
      } else {
        errorMessage.value = 'Login gagal.'
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await api.post('/admin/logout')
    } catch {
      // ignore
    }
    localStorage.removeItem('admin_token')
    user.value = null
  }

  return { user, isLoading, errorMessage, fetchUser, login, logout }
})
