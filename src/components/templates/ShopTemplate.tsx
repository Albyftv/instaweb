import type { Business } from '@/lib/types'

export default function ShopTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '')
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div className="px-6 py-10 text-center" style={{ background: `linear-gradient(135deg, ${b.primary_color}, ${b.accent_color})` }}>
        <h1 className="text-4xl font-extrabold text-white">{b.name}</h1>
        {b.tagline && <p className="text-white/80 mt-2 text-lg">{b.tagline}</p>}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {b.description && (
          <p className="text-gray-600 leading-relaxed text-lg text-center">{b.description}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {b.address && (
            <div className="border border-gray-100 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-2">📍</div>
              <div className="font-bold text-gray-900">{b.address}</div>
              {b.city && <div className="text-gray-500 text-sm">{b.city}</div>}
            </div>
          )}
          {b.phone && (
            <a href={`tel:${b.phone}`} className="border border-gray-100 rounded-2xl p-5 text-center hover:bg-gray-50 transition-colors block">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-bold text-gray-900">{b.phone}</div>
              <div className="text-gray-500 text-sm">Llámanos</div>
            </a>
          )}
        </div>

        {wa && (
          <a href={`https://wa.me/${wa}?text=Hola! Tengo una consulta sobre ${b.name}`}
            target="_blank" rel="noopener"
            className="block text-center text-white font-bold py-4 rounded-2xl shadow-lg transition-colors hover:opacity-90"
            style={{ background: '#25d366' }}>
            💬 Pregúntanos por WhatsApp
          </a>
        )}

        {(b.instagram || b.facebook) && (
          <div className="flex gap-3">
            {b.instagram && (
              <a href={`https://instagram.com/${b.instagram.replace('@', '')}`} target="_blank" rel="noopener"
                className="flex-1 border border-gray-200 rounded-xl py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                📸 Instagram
              </a>
            )}
            {b.facebook && (
              <a href={b.facebook.startsWith('http') ? b.facebook : `https://facebook.com/${b.facebook}`} target="_blank" rel="noopener"
                className="flex-1 border border-gray-200 rounded-xl py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                👍 Facebook
              </a>
            )}
          </div>
        )}
      </div>
      <div className="text-center py-6 text-xs text-gray-300">
        Página creada con <a href="https://instaweb.es" className="hover:text-gray-500">instaweb.es</a>
      </div>
    </div>
  )
}
