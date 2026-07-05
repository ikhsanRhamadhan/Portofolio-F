export interface SocialLink {
  platform: string
  url: string
  icon: string | null
}

export interface ProfileStat {
  label: string
  value: string
}

export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  avatar_url: string | null
  location: string | null
  languages: string[] | null
  email: string | null
  phone: string | null
  motto: string | null
  social_links: SocialLink[] | null
  stats: ProfileStat[] | null
  created_at: string | null
  updated_at: string | null
}
