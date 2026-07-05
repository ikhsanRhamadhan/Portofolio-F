import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Profile } from '@/types/profile'

const fallbackProfile: Profile = {
  id: 1,
  name: 'Muhamad Ikhsan Ramadhan',
  title: 'Software Engineer',
  bio: 'Trying To Be Better',
  avatar_url: null,
  email: 'ikhsanpribadi90@gmail.com',
  phone: null,
  location: 'Rangkasbitung',
  languages: ['Indonesia'],
  motto: 'xixixi',
  social_links: [
    { platform: 'GitHub', url: 'https://github.com/ikhsanRhamadhan', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ikhsan-ramadhan-787a6a278', icon: 'linkedin' },
    { platform: 'Email', url: 'mailto:ikhsanpribadi90@gmail.com', icon: 'email' },
  ],
  stats: [
    { label: 'Tahun Pengalaman', value: '2+' },
    { label: 'Proyek Selesai', value: '15' },
    { label: 'Teknologi Dikuasai', value: '12+' },
    { label: 'Kopi per Hari', value: '3' },
  ],
  created_at: null,
  updated_at: null,
}

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref('')
  const isFallback = ref(false)

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchProfile = async () => {
    isLoading.value = true
    errorMessage.value = ''
    isFallback.value = false

    try {
      const { data } = await api.get('/profile')
      profile.value = data.data ?? null
    } catch (e) {
      profile.value = fallbackProfile
      isFallback.value = true
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { profile, isLoading, errorMessage, isFallback, fetchProfile }
})
