export type BusinessCategory = 'restaurant' | 'services' | 'shop' | 'tourism'
export type BusinessPlan = 'basic' | 'pro' | 'negocio'
export type BusinessStatus = 'pending' | 'active' | 'cancelled'

export interface Schedule {
  mon?: string
  tue?: string
  wed?: string
  thu?: string
  fri?: string
  sat?: string
  sun?: string
}

export interface Business {
  id: string
  slug: string
  name: string
  tagline?: string
  category: BusinessCategory
  template: string
  description?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  city?: string
  schedule?: Schedule
  logo_url?: string
  cover_url?: string
  gallery?: string[]
  instagram?: string
  facebook?: string
  tiktok?: string
  primary_color: string
  accent_color: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  plan: BusinessPlan
  status: BusinessStatus
  owner_email: string
  custom_domain?: string
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  business_id: string
  category: string
  name: string
  description?: string
  price?: number
  image_url?: string
  available: boolean
  sort_order: number
}

export interface ServiceItem {
  id: string
  business_id: string
  name: string
  description?: string
  price?: string
  duration?: string
  image_url?: string
  sort_order: number
}

export type OnboardingData = {
  step: number
  category: BusinessCategory | null
  template: string | null
  name: string
  tagline: string
  description: string
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  instagram: string
  facebook: string
  primary_color: string
  accent_color: string
  plan: BusinessPlan | null
}
