import Stripe from 'stripe'

// Elimina BOM (U+FEFF) y espacios que PowerShell puede añadir a las env vars
function cleanEnv(value: string | undefined): string {
  return (value ?? '').replace(/^﻿/, '').trim()
}

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(cleanEnv(process.env.STRIPE_SECRET_KEY), {
      apiVersion: '2026-04-22.dahlia',
    })
  }
  return _stripe
}

export const PLANS = {
  basic: {
    name: 'Básico',
    price: 19,
    priceId: cleanEnv(process.env.STRIPE_PRICE_BASIC),
    features: [
      '1 página de negocio',
      'Subdominio instaweb.es',
      'Actualización de contenido',
      'WhatsApp directo',
      'Soporte por email',
    ],
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: cleanEnv(process.env.STRIPE_PRICE_PRO),
    features: [
      'Todo lo del Básico',
      'Dominio propio incluido',
      'Formulario de contacto',
      'Galería de fotos',
      'Horarios detallados',
    ],
  },
  negocio: {
    name: 'Negocio',
    price: 49,
    priceId: cleanEnv(process.env.STRIPE_PRICE_NEGOCIO),
    features: [
      'Todo lo del Pro',
      'Hasta 3 páginas',
      'Reservas por WhatsApp automáticas',
      'Analytics básico',
      'Soporte prioritario',
    ],
  },
} as const
