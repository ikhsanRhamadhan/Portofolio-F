import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Certification } from '@/types/certification'

const fallbackCertifications: Certification[] = [
  { id: 1, name: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding', issue_date: '2023-05-15', credential_url: null, created_at: null, updated_at: null },
  { id: 2, name: 'Belajar Membangun API dengan Laravel', issuer: 'Dicoding', issue_date: '2023-08-20', credential_url: null, created_at: null, updated_at: null },
  { id: 3, name: 'Belajar Fundamental Vue 3', issuer: 'Dicoding', issue_date: '2024-02-10', credential_url: null, created_at: null, updated_at: null },
]

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
      certifications.value = fallbackCertifications
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { certifications, isLoading, errorMessage, fetchCertifications }
})
