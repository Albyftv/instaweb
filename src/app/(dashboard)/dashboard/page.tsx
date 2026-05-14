'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Business } from '@/lib/types'

function DashboardContent() {
  const params = useSearchParams()
  const slug = params.get('slug')
  const success = params.get('success')
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!slug) { setLoading(false); return }
    const supabase = createClient()
    supabase.from('businesses').select('*').eq('slug', slug).single()
      .then(({ data }) => { setBusiness(data); setLoading(false) })
  }, [slug])

  const handleSave = async () => {
    if (!business) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('businesses').update({
      name: business.name,
      tagline: business.tagline,
      description: business.description,
      phone: business.phone,
      whatsapp: business.whatsapp,
      address: business.address,
      city: business.city,
      instagram: business.instagram,
      facebook: business.facebook,
    }).eq('id', business.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const set = (key: keyof Business, value: string) =>
    setBusiness(prev => prev ? { ...prev, [key]: value } : null)

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-lg">Cargando...</div>
    </div>
  )

  if (!slug || !business) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
      <div className="text-5xl mb-4">🔑</div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Accede a tu panel</h1>
      <p className="text-gray-500 mb-6">Introduce la URL de tu negocio para acceder</p>
      <div className="flex gap-2 max-w-sm w-full">
        <input placeholder="sunegocio" className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500" id="slug-input" />
        <button onClick={() => {
          const val = (document.getElementById('slug-input') as HTMLInputElement)?.value
          if (val) window.location.href = `/dashboard?slug=${val.trim()}`
        }} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors">
          Ir
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-blue-600">instaweb<span className="text-orange-500">.</span></span>
        <div className="flex items-center gap-4">
          <a href={`/${business.slug}`} target="_blank"
            className="text-sm text-blue-600 font-semibold hover:underline">
            Ver mi página →
          </a>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${business.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {business.status === 'active' ? '● Activa' : '● Pendiente'}
          </span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="font-bold text-green-800">¡Tu página está publicada!</p>
            <a href={`/${business.slug}`} target="_blank" className="text-green-600 text-sm hover:underline">
              instaweb.es/{business.slug}
            </a>
          </div>
        )}

        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Mi negocio</h1>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
            <input value={business.name} onChange={e => set('name', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Eslogan</label>
            <input value={business.tagline || ''} onChange={e => set('tagline', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
            <textarea value={business.description || ''} onChange={e => set('description', e.target.value)}
              rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <input value={business.phone || ''} onChange={e => set('phone', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
              <input value={business.whatsapp || ''} onChange={e => set('whatsapp', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
              <input value={business.address || ''} onChange={e => set('address', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
              <input value={business.city || ''} onChange={e => set('city', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Instagram</label>
              <input value={business.instagram || ''} onChange={e => set('instagram', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label>
              <input value={business.facebook || ''} onChange={e => set('facebook', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60">
            {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
          </button>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="font-extrabold text-gray-900 mb-4">Tu página</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">URL pública</p>
              <p className="font-semibold text-blue-600">instaweb.es/{business.slug}</p>
            </div>
            <a href={`/${business.slug}`} target="_blank"
              className="bg-blue-50 text-blue-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
              Ver →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-gray-400 text-lg">Cargando...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
