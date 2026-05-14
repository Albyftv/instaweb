import type { Business } from '@/lib/types'

export default function RestaurantTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '')
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 flex items-end" style={{ background: `linear-gradient(135deg, ${b.primary_color} 0%, ${b.accent_color} 100%)` }}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative px-6 pb-8 text-white w-full">
          <h1 className="text-4xl font-extrabold">{b.name}</h1>
          {b.tagline && <p className="text-white/80 mt-1 text-lg">{b.tagline}</p>}
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="px-6 -mt-5 relative z-10 flex gap-3">
        {wa && (
          <a href={`https://wa.me/${wa}?text=Hola! Quiero hacer una reserva en ${b.name}`}
            target="_blank" rel="noopener"
            className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-xl text-center text-sm shadow-lg hover:bg-green-600 transition-colors">
            📱 Reservar por WhatsApp
          </a>
        )}
        {b.phone && (
          <a href={`tel:${b.phone}`}
            className="flex-1 bg-white text-gray-800 font-bold py-3 px-4 rounded-xl text-center text-sm shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            📞 Llamar
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Descripción */}
        {b.description && (
          <p className="text-gray-600 leading-relaxed text-lg">{b.description}</p>
        )}

        {/* Info */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
          {b.address && (
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-lg">📍</span>
              <span>{b.address}{b.city ? `, ${b.city}` : ''}</span>
            </div>
          )}
          {b.phone && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-lg">📞</span>
              <a href={`tel:${b.phone}`} className="hover:underline">{b.phone}</a>
            </div>
          )}
          {b.email && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-lg">✉️</span>
              <a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a>
            </div>
          )}
          {b.schedule && Object.keys(b.schedule).length > 0 && (
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-lg">🕐</span>
              <div>
                {Object.entries(b.schedule).map(([day, hours]) => (
                  <div key={day}><span className="capitalize font-medium">{day}:</span> {hours as string}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Redes sociales */}
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

      {/* Footer powered by */}
      <div className="text-center py-6 text-xs text-gray-300">
        Página creada con <a href="https://instaweb.es" className="hover:text-gray-500">instaweb.es</a>
      </div>
    </div>
  )
}
