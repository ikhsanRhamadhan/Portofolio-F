import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { ApiSuccess, Project, ProjectFilters } from '@/types/project'

const fallbackProjects: Project[] = [
  {
    id: 1, title: 'Portfolio Website', slug: 'portfolio-website',
    description: 'Website portofolio pribadi dengan tema Gundam RX-78-2. Dibangun menggunakan Vue 3, TypeScript, Tailwind CSS, dan Laravel API.',
    thumbnail: null, thumbnail_url: null,
    tech_stack: ['Vue 3', 'TypeScript', 'Tailwind CSS', 'Laravel', 'MySQL'],
    github_url: 'https://github.com/ikhsanRhamadhan/portfolio', demo_url: null,
    category: 'Web Development', is_featured: true, order: 1,
    created_at: null, updated_at: null,
  },
  {
    id: 2, title: 'E-Commerce App', slug: 'e-commerce-app',
    description: 'Aplikasi e-commerce sederhana dengan fitur manajemen produk, keranjang belanja, dan sistem pembayaran.',
    thumbnail: null, thumbnail_url: null,
    tech_stack: ['Laravel', 'Vue 3', 'MySQL', 'Midtrans'],
    github_url: 'https://github.com/ikhsanRhamadhan/ecommerce', demo_url: null,
    category: 'Web Development', is_featured: true, order: 2,
    created_at: null, updated_at: null,
  },
  {
    id: 3, title: 'API RESTful Service', slug: 'api-restful-service',
    description: 'REST API service dengan autentikasi JWT, dokumentasi Swagger, dan testing otomatis.',
    thumbnail: null, thumbnail_url: null,
    tech_stack: ['Laravel', 'PostgreSQL', 'Redis', 'Docker'],
    github_url: 'https://github.com/ikhsanRhamadhan/api-service', demo_url: null,
    category: 'Backend', is_featured: false, order: 3,
    created_at: null, updated_at: null,
  },
  {
    id: 4, title: 'Absensi App', slug: 'absensi-app',
    description: 'Aplikasi absensi karyawan berbasis web dengan fitur QR code dan laporan bulanan.',
    thumbnail: null, thumbnail_url: null,
    tech_stack: ['Laravel', 'Vue 3', 'MySQL', 'QR Code'],
    github_url: null, demo_url: null,
    category: 'Web Development', is_featured: false, order: 4,
    created_at: null, updated_at: null,
  },
  {
    id: 5, title: 'Blog Platform', slug: 'blog-platform',
    description: 'Platform blog dengan markdown editor, manajemen kategori, dan sistem komentar.',
    thumbnail: null, thumbnail_url: null,
    tech_stack: ['Laravel', 'Vue 3', 'Tailwind CSS', 'MySQL'],
    github_url: 'https://github.com/ikhsanRhamadhan/blog', demo_url: null,
    category: 'Web Development', is_featured: false, order: 5,
    created_at: null, updated_at: null,
  },
]

const fallbackCategories = ['Web Development', 'Backend']

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
      projects.value = fallbackProjects
      categories.value = fallbackCategories
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
      featuredProjects.value = fallbackProjects.filter(p => p.is_featured)
      categories.value = fallbackCategories
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
      currentProject.value = fallbackProjects.find(p => p.slug === slug) ?? null
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
