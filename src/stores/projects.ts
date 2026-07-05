import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { ApiSuccess, Project, ProjectFilters } from '@/types/project'

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const featuredProjects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const categories = ref<string[]>([])
  const isListLoading = ref(false)
  const isFeaturedLoading = ref(false)
  const isDetailLoading = ref(false)
  const errorMessage = ref('')

  const hasProjects = computed(() => projects.value.length > 0)

  const normalizeError = (error: unknown) =>
    error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data proyek.'

  async function fetchProjects(filters: ProjectFilters = {}) {
    isListLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get<ApiSuccess<Project[]>>('/projects', {
        params: filters,
      })

      projects.value = data.data
      categories.value = data.meta?.categories ?? []
    } catch (error) {
      errorMessage.value = normalizeError(error)
    } finally {
      isListLoading.value = false
    }
  }

  async function fetchFeaturedProjects() {
    isFeaturedLoading.value = true
    errorMessage.value = ''

    try {
      const { data } = await api.get<ApiSuccess<Project[]>>('/projects', {
        params: { featured: true },
      })

      featuredProjects.value = data.data
      categories.value = data.meta?.categories ?? categories.value
    } catch (error) {
      errorMessage.value = normalizeError(error)
    } finally {
      isFeaturedLoading.value = false
    }
  }

  async function fetchProject(slug: string) {
    isDetailLoading.value = true
    errorMessage.value = ''
    currentProject.value = null

    try {
      const { data } = await api.get<ApiSuccess<Project>>(`/projects/${slug}`)
      currentProject.value = data.data
    } catch (error) {
      errorMessage.value = normalizeError(error)
    } finally {
      isDetailLoading.value = false
    }
  }

  return {
    categories,
    currentProject,
    errorMessage,
    featuredProjects,
    hasProjects,
    isDetailLoading,
    isFeaturedLoading,
    isListLoading,
    projects,
    fetchFeaturedProjects,
    fetchProject,
    fetchProjects,
  }
})
