import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Skill } from '@/types/skill'

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref<Skill[]>([])
  const categories = ref<string[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchSkills = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/skills')
      skills.value = data.data ?? []
      categories.value = data.meta?.categories ?? []
    } catch (e) {
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { skills, categories, isLoading, errorMessage, fetchSkills }
})
