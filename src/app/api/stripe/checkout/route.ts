export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PLANS } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { plan, businessData } = body

  if (!plan || !PLANS[plan as keyof typeof PLANS]) {
    return NextResponse.json({ error: 'Plan inválido' }, { status: 400 })
  }

  const selectedPlan = PLANS[plan as keyof typeof PLANS]
  const supabase = createServiceClient()

  // Generar slug único
  const baseSlug = businessData.name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  let slug = baseSlug
  let i = 1
  while (true) {
    const { data } = await supabase.from('businesses').select('id').eq('slug', slug).single()
    if (!data) break
    slug = `${baseSlug}-${i++}`
  }

  // Crear negocio en estado pending
  const { data: business, error } = await supabase.from('businesses').insert({
    ...businessData,
    slug,
    plan,
    status: 'pending',
  }).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Crear sesión de Stripe
  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: selectedPlan.priceId, quantity: 1 }],
    customer_email: businessData.owner_email,
    metadata: { business_id: business.id, slug },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1&slug=${slug}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/nuevo?step=3`,
  })

  return NextResponse.json({ url: session.url })
}
