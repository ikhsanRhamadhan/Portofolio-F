import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Experience } from '@/types/experience'

const fallbackExperiences: Experience[] = [
  { id: 1, company: 'PT. Tech Solution', position: 'Junior Software Engineer', description: 'Mengembangkan dan memelihara aplikasi web berbasis Laravel dan Vue 3. Bekerja dalam tim agile untuk pengembangan fitur baru dan perbaikan bug.', start_date: '2024-01-01', end_date: null, is_current: true, created_at: null, updated_at: null },
  { id: 2, company: 'Digital Agency', position: 'Web Developer Intern', description: 'Membantu pengembangan website client menggunakan Laravel dan Bootstrap. Belajar alur kerja tim dan standar coding.', start_date: '2023-06-01', end_date: '2023-12-01', is_current: false, created_at: null, updated_at: null },
]

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
      experiences.value = fallbackExperiences
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { experiences, isLoading, errorMessage, fetchExperiences }
})
