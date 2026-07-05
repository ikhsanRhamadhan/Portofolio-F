export interface Experience {
  id: number
  company: string
  position: string
  description: string
  start_date: string | null
  end_date: string | null
  is_current: boolean
  created_at: string | null
  updated_at: string | null
}
