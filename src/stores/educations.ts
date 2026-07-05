import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Education } from '@/types/education'

const fallbackEducations: Education[] = [
  { id: 1, institution: 'Universitas Bina Bangsa', degree: 'Sarjana Komputer', field_of_study: 'Informatika', start_date: '2021-09-01', end_date: null, created_at: null, updated_at: null },
]

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
      educations.value = fallbackEducations
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { educations, isLoading, errorMessage, fetchEducations }
})
