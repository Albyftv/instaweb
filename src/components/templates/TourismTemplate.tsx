import type { Business } from '@/lib/types'

export default function TourismTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '')
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero grande */}
      <div className="h-72 sm:h-96 flex flex-col items-center justify-center text-center px-6"
        style={{ background: `linear-gradient(160deg, ${b.primary_color} 0%, ${b.accent_color} 100%)` }}>
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">{b.name}</h1>
        {b.tagline && <p className="text-white/90 mt-3 text-xl max-w-md">{b.tagline}</p>}
        {wa && (
          <a href={`https://wa.me/${wa}?text=Hola! Me interesa reservar con ${b.name}`}
            target="_blank" rel="noopener"
            className="mt-8 bg-white font-bold py-3 px-8 rounded-full shadow-xl transition-colors hover:bg-gray-50 text-sm"
            style={{ color: b.primary_color }}>
            🏄 Reservar ahora
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        {b.description && (
          <p className="text-gray-600 leading-relaxed text-lg">{b.description}</p>
        )}

        <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
          <h2 className="font-extrabold text-gray-900 text-lg">Información</h2>
          {b.address && (
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-xl">📍</span>
              <span>{b.address}{b.city ? `, ${b.city}` : ''}</span>
            </div>
          )}
          {b.phone && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-xl">📞</span>
              <a href={`tel:${b.phone}`} className="hover:underline">{b.phone}</a>
            </div>
          )}
          {b.email && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-xl">✉️</span>
              <a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {wa && (
            <a href={`https://wa.me/${wa}?text=Hola! Quiero más info sobre ${b.name}`}
              target="_blank" rel="noopener"
              className="flex-1 text-white font-bold py-4 text-center rounded-2xl transition-colors hover:opacity-90"
              style={{ background: '#25d366' }}>
              💬 WhatsApp
            </a>
          )}
          {b.phone && (
            <a href={`tel:${b.phone}`}
              className="flex-1 text-white font-bold py-4 text-center rounded-2xl transition-colors hover:opacity-90"
              style={{ background: b.primary_color }}>
              📞 Llamar
            </a>
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
