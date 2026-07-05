import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { Hobby } from '@/types/hobby'

const fallbackHobbies: Hobby[] = [
  { id: 1, name: 'Coding Side Project', description: 'Eksperimen dengan teknologi baru dan membangun tools untuk daily use.', category: 'coding', icon: null, level: 85, created_at: null, updated_at: null },
  { id: 2, name: 'Mobile Legend', description: 'Main ML santai buat ngilangin stress.', category: 'gaming', icon: null, level: 70, created_at: null, updated_at: null },
  { id: 3, name: 'Nonton Anime', description: 'Anime slice-of-life dan action jadi favorit.', category: 'other', icon: null, level: 80, created_at: null, updated_at: null },
  { id: 4, name: 'Dengerin Musik', description: 'Musik sebagai teman coding biar fokus.', category: 'music', icon: null, level: 75, created_at: null, updated_at: null },
  { id: 5, name: 'Badminton', description: 'Olahraga mingguan bareng teman-teman.', category: 'sports', icon: null, level: 55, created_at: null, updated_at: null },
  { id: 6, name: 'Baca Artikel Tech', description: 'Baca blog dan dokumentasi buat upgrade skill.', category: 'reading', icon: null, level: 70, created_at: null, updated_at: null },
]

export const useHobbiesStore = defineStore('hobbies', () => {
  const hobbies = ref<Hobby[]>([])
  const isLoading = ref(false)
  const errorMessage = ref('')

  const normalizeError = (e: unknown) =>
    e instanceof Error ? e.message : 'Terjadi kesalahan.'

  const fetchHobbies = async () => {
    isLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get('/hobbies')
      hobbies.value = data.data ?? []
    } catch (e) {
      hobbies.value = fallbackHobbies
      errorMessage.value = normalizeError(e)
    } finally {
      isLoading.value = false
    }
  }

  return { hobbies, isLoading, errorMessage, fetchHobbies }
})
