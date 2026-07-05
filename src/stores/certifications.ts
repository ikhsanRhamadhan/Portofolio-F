import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Certification } from '@/types/certification'

export const useCertificationsStore = defineStore('certifications', () => {
  const certifications = ref<Certification[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchCertifications = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/certifications')
      certifications.value = data.data ?? []
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { certifications, isLoading, errorMessage, fetchCertifications }
})
