export interface Project {
  id: number
  title: string
  slug: string
  description: string
  thumbnail: string | null
  thumbnail_url: string | null
  tech_stack: string[]
  github_url: string | null
  demo_url: string | null
  category: string
  is_featured: boolean
  order: number
  created_at: string | null
  updated_at: string | null
}

export interface ApiSuccess<T> {
  success: true
  message: string
  data: T
  meta?: {
    categories?: string[]
    filters?: Record<string, unknown>
  }
}

export interface ProjectFilters {
  category?: string
  tech?: string
  featured?: boolean
}
