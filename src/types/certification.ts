export interface Certification {
  id: number
  name: string
  issuer: string
  issue_date: string | null
  credential_url: string | null
  created_at: string | null
  updated_at: string | null
}
