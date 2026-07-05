export interface BlogPost {
  id: number
  title: string
  slug: string
  content?: string
  excerpt: string | null
  thumbnail: string | null
  thumbnail_url: string | null
  published_at: string | null
  created_at: string | null
  updated_at: string | null
}
