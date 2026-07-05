export interface ApiSuccess<T> {
  success: true
  message: string
  data: T
  meta?: Record<string, unknown>
}

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface DashboardStats {
  stats: {
    projects: number
    skills: number
    blog_posts: number
    unread_messages: number
  }
  recent_messages: {
    id: number
    name: string
    subject: string
    created_at: string
    is_read: boolean
  }[]
}
