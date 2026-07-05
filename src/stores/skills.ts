import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Skill } from '@/types/skill'

const fallbackSkills: Skill[] = [
  { id: 1, name: 'Laravel', category: 'Backend', level: 85, icon: null, created_at: null, updated_at: null },
  { id: 2, name: 'Vue 3', category: 'Frontend', level: 80, icon: null, created_at: null, updated_at: null },
  { id: 3, name: 'TypeScript', category: 'Frontend', level: 75, icon: null, created_at: null, updated_at: null },
  { id: 4, name: 'Tailwind CSS', category: 'Frontend', level: 80, icon: null, created_at: null, updated_at: null },
  { id: 5, name: 'MySQL', category: 'Database', level: 75, icon: null, created_at: null, updated_at: null },
  { id: 6, name: 'PostgreSQL', category: 'Database', level: 65, icon: null, created_at: null, updated_at: null },
  { id: 7, name: 'Git', category: 'Tools', level: 80, icon: null, created_at: null, updated_at: null },
  { id: 8, name: 'Docker', category: 'Tools', level: 60, icon: null, created_at: null, updated_at: null },
  { id: 9, name: 'REST API', category: 'Backend', level: 80, icon: null, created_at: null, updated_at: null },
  { id: 10, name: 'JavaScript', category: 'Frontend', level: 80, icon: null, created_at: null, updated_at: null },
  { id: 11, name: 'PHP', category: 'Backend', level: 85, icon: null, created_at: null, updated_at: null },
  { id: 12, name: 'Bootstrap', category: 'Frontend', level: 75, icon: null, created_at: null, updated_at: null },
]

const fallbackCategories = ['Backend', 'Frontend', 'Database', 'Tools']

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
      skills.value = fallbackSkills
      categories.value = fallbackCategories
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { skills, categories, isLoading, errorMessage, fetchSkills }
})
