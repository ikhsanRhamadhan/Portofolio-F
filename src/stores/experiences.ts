import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Experience } from '@/types/experience'

export const useExperiencesStore = defineStore('experiences', () => {
  const experiences = ref<Experience[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchExperiences = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/experiences')
      experiences.value = data.data ?? []
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { experiences, isLoading, errorMessage, fetchExperiences }
})
