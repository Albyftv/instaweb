import type { Business } from '@/lib/types'

export default function ServicesTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '')
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="px-6 py-8 text-center" style={{ background: b.primary_color }}>
        <h1 className="text-4xl font-extrabold text-white">{b.name}</h1>
        {b.tagline && <p className="text-white/80 mt-2 text-lg">{b.tagline}</p>}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {b.description && (
          <p className="text-gray-600 leading-relaxed text-lg text-center">{b.description}</p>
        )}

        {/* CTA principal */}
        <div className="flex flex-col sm:flex-row gap-3">
          {wa && (
            <a href={`https://wa.me/${wa}?text=Hola! Quiero solicitar información sobre ${b.name}`}
              target="_blank" rel="noopener"
              className="flex-1 text-white font-bold py-4 px-6 rounded-2xl text-center shadow-lg transition-colors"
              style={{ background: '#25d366' }}>
              💬 Contactar por WhatsApp
            </a>
          )}
          {b.phone && (
            <a href={`tel:${b.phone}`}
              className="flex-1 border-2 text-center font-bold py-4 px-6 rounded-2xl transition-colors hover:opacity-80"
              style={{ borderColor: b.primary_color, color: b.primary_color }}>
              📞 {b.phone}
            </a>
          )}
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {b.address && (
            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Dirección</div>
                <div className="text-gray-500 text-sm">{b.address}{b.city ? `, ${b.city}` : ''}</div>
              </div>
            </div>
          )}
          {b.email && (
            <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-2xl">✉️</span>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Email</div>
                <a href={`mailto:${b.email}`} className="text-gray-500 text-sm hover:underline">{b.email}</a>
              </div>
            </div>
          )}
        </div>

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
