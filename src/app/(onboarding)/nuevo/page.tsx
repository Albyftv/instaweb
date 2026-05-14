'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { BusinessCategory, BusinessPlan, OnboardingData } from '@/lib/types'
import { PLANS } from '@/lib/stripe'

const CATEGORIES: { id: BusinessCategory; icon: string; label: string; desc: string }[] = [
  { id: 'restaurant', icon: '🍽️', label: 'Restaurante / Bar', desc: 'Carta, horario, reservas' },
  { id: 'services', icon: '🔧', label: 'Servicios locales', desc: 'Fontanero, peluquería, clínica...' },
  { id: 'shop', icon: '🛍️', label: 'Tienda / Comercio', desc: 'Catálogo de productos y horario' },
  { id: 'tourism', icon: '🏄', label: 'Turismo / Experiencias', desc: 'Surf, tours, excursiones...' },
]

const COLORS = [
  { primary: '#2563eb', accent: '#f97316', label: 'Azul + Naranja' },
  { primary: '#16a34a', accent: '#f97316', label: 'Verde + Naranja' },
  { primary: '#dc2626', accent: '#fbbf24', label: 'Rojo + Amarillo' },
  { primary: '#7c3aed', accent: '#f97316', label: 'Morado + Naranja' },
  { primary: '#0f172a', accent: '#f97316', label: 'Negro + Naranja' },
  { primary: '#0891b2', accent: '#f97316', label: 'Cyan + Naranja' },
]

const INITIAL: OnboardingData = {
  step: 1,
  category: null,
  template: null,
  name: '',
  tagline: '',
  description: '',
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  city: '',
  instagram: '',
  facebook: '',
  primary_color: '#2563eb',
  accent_color: '#f97316',
  plan: null,
}

function NuevoContent() {
  const params = useSearchParams()
  const initialPlan = (params.get('plan') as BusinessPlan) || null
  const [data, setData] = useState<OnboardingData>({ ...INITIAL, plan: initialPlan })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof OnboardingData, value: unknown) =>
    setData(prev => ({ ...prev, [key]: value }))

  const next = () => set('step', data.step + 1)
  const back = () => set('step', data.step - 1)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: data.plan,
          businessData: {
            name: data.name,
            tagline: data.tagline,
            description: data.description,
            category: data.category,
            template: data.template || data.category,
            phone: data.phone,
            whatsapp: data.whatsapp,
            email: data.email,
            address: data.address,
            city: data.city,
            instagram: data.instagram,
            facebook: data.facebook,
            primary_color: data.primary_color,
            accent_color: data.accent_color,
            owner_email: data.email,
          },
        }),
      })
      const json = await res.json()
      if (json.url) window.location.href = json.url
      else setError(json.error || 'Error al procesar el pago')
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="text-xl font-extrabold text-blue-600">instaweb<span className="text-orange-500">.</span></a>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${s < data.step ? 'bg-blue-600 text-white' : s === data.step ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-gray-100 text-gray-400'}`}>
              {s < data.step ? '✓' : s}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Step 1: Categoría */}
        {data.step === 1 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">¿Qué tipo de negocio tienes?</h1>
            <p className="text-gray-500 mb-8">Elegiremos la mejor plantilla para ti</p>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => { set('category', c.id); set('template', c.id) }}
                  className={`p-6 rounded-2xl border-2 text-left transition-all ${data.category === c.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                  <div className="text-4xl mb-3">{c.icon}</div>
                  <div className="font-bold text-gray-900">{c.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{c.desc}</div>
                </button>
              ))}
            </div>
            <button onClick={next} disabled={!data.category}
              className="mt-8 w-full bg-blue-600 text-white font-bold py-4 rounded-full text-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Siguiente →
            </button>
          </div>
        )}

        {/* Step 2: Info del negocio */}
        {data.step === 2 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Cuéntanos sobre tu negocio</h1>
            <p className="text-gray-500 mb-8">Esta información aparecerá en tu página</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del negocio *</label>
                <input value={data.name} onChange={e => set('name', e.target.value)}
                  placeholder="Ej: Bar El Palmeral"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Eslogan o subtítulo</label>
                <input value={data.tagline} onChange={e => set('tagline', e.target.value)}
                  placeholder="Ej: Cocina canaria de toda la vida"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción breve</label>
                <textarea value={data.description} onChange={e => set('description', e.target.value)}
                  rows={3} placeholder="¿Qué ofreces? ¿Qué te diferencia?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                  <input value={data.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
                  <input value={data.whatsapp} onChange={e => set('whatsapp', e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email de contacto *</label>
                <input value={data.email} onChange={e => set('email', e.target.value)}
                  type="email" placeholder="hola@tunegocio.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
                  <input value={data.address} onChange={e => set('address', e.target.value)}
                    placeholder="Calle Mayor, 12"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                  <input value={data.city} onChange={e => set('city', e.target.value)}
                    placeholder="Puerto del Rosario"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram</label>
                  <input value={data.instagram} onChange={e => set('instagram', e.target.value)}
                    placeholder="@tunegocio"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label>
                  <input value={data.facebook} onChange={e => set('facebook', e.target.value)}
                    placeholder="facebook.com/tunegocio"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              {/* Colores */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Color de tu marca</label>
                <div className="grid grid-cols-3 gap-3">
                  {COLORS.map(c => (
                    <button key={c.primary} onClick={() => { set('primary_color', c.primary); set('accent_color', c.accent) }}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${data.primary_color === c.primary ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full" style={{ background: c.primary }} />
                        <div className="w-5 h-5 rounded-full" style={{ background: c.accent }} />
                      </div>
                      <span className="text-xs text-gray-600">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={back} className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-full hover:bg-gray-50 transition-colors">
                ← Atrás
              </button>
              <button onClick={next} disabled={!data.name || !data.email}
                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Plan */}
        {data.step === 3 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Elige tu plan</h1>
            <p className="text-gray-500 mb-8">Cancela en cualquier momento</p>
            <div className="space-y-4">
              {Object.entries(PLANS).map(([key, plan]) => (
                <button key={key} onClick={() => set('plan', key as BusinessPlan)}
                  className={`w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${data.plan === key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-extrabold text-gray-900 text-lg">{plan.name}</span>
                      {key === 'pro' && <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">RECOMENDADO</span>}
                    </div>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {plan.features.slice(0, 3).map(f => <li key={f}>✓ {f}</li>)}
                    </ul>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <div className="text-3xl font-extrabold text-gray-900">{plan.price}€</div>
                    <div className="text-xs text-gray-400">/mes</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <button onClick={back} className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-full hover:bg-gray-50 transition-colors">
                ← Atrás
              </button>
              <button onClick={next} disabled={!data.plan}
                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Resumen + pago */}
        {data.step === 4 && (
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Revisa y paga</h1>
            <p className="text-gray-500 mb-8">Tu web se publica al completar el pago</p>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Negocio</span>
                <span className="font-semibold">{data.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tipo</span>
                <span className="font-semibold">{CATEGORIES.find(c => c.id === data.category)?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold">{data.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">URL de tu página</span>
                <span className="font-semibold text-blue-600">
                  {data.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}.instaweb.es
                </span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-extrabold text-lg">
                <span>Plan {PLANS[data.plan!]?.name}</span>
                <span>{PLANS[data.plan!]?.price}€/mes</span>
              </div>
              <p className="text-xs text-gray-400">14 días de prueba gratuita. Cancela en cualquier momento.</p>
            </div>
            {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">{error}</p>}
            <div className="flex gap-4">
              <button onClick={back} className="flex-1 border-2 border-gray-200 text-gray-700 font-bold py-4 rounded-full hover:bg-gray-50 transition-colors">
                ← Atrás
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-60">
                {loading ? 'Procesando...' : 'Pagar con tarjeta →'}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">🔒 Pago seguro con Stripe</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function NuevoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400">Cargando...</div></div>}>
      <NuevoContent />
    </Suspense>
  )
}
