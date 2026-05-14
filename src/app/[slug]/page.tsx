import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import type { Business } from '@/lib/types'
import RestaurantTemplate from '@/components/templates/RestaurantTemplate'
import ServicesTemplate from '@/components/templates/ServicesTemplate'
import ShopTemplate from '@/components/templates/ShopTemplate'
import TourismTemplate from '@/components/templates/TourismTemplate'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = createServiceClient()
  const { data } = await supabase.from('businesses').select('name, tagline').eq('slug', slug).eq('status', 'active').single()
  if (!data) return { title: 'Página no encontrada' }
  return {
    title: data.tagline ? `${data.name} — ${data.tagline}` : data.name,
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const supabase = createServiceClient()

  const { data: business } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!business) notFound()

  const b = business as Business

  const templates: Record<string, React.ComponentType<{ business: Business }>> = {
    restaurant: RestaurantTemplate,
    services: ServicesTemplate,
    shop: ShopTemplate,
    tourism: TourismTemplate,
  }

  const Template = templates[b.template] || templates[b.category] || ServicesTemplate

  return <Template business={b} />
}
