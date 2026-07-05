import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Education } from '@/types/education'

export const useEducationsStore = defineStore('educations', () => {
  const educations = ref<Education[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchEducations = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/educations')
      educations.value = data.data ?? []
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { educations, isLoading, errorMessage, fetchEducations }
})
