import type { Business } from '@/lib/types'

const DAY_LABELS: Record<string, string> = {
  mon: 'Lunes', tue: 'Martes', wed: 'Miércoles', thu: 'Jueves',
  fri: 'Viernes', sat: 'Sábado', sun: 'Domingo',
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.848L.057 23.625a.563.563 0 0 0 .693.693l5.772-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 0 1-5.001-1.367l-.358-.213-3.427.871.887-3.34-.234-.374A9.77 9.77 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  )
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.37a16 16 0 0 0 6 6l1.27-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function RestaurantTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '') || b.phone?.replace(/\D/g, '')
  const waLink = wa
    ? `https://wa.me/${wa.startsWith('34') ? wa : `34${wa}`}?text=Hola%2C+me+gustar%C3%ADa+hacer+una+reserva+en+${encodeURIComponent(b.name)}`
    : null
  const mapsLink = b.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address} ${b.city ?? ''}`)}`
    : null

  const scheduleEntries = b.schedule
    ? Object.entries(b.schedule).filter(([, v]) => v)
    : []

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end"
        style={{ background: `linear-gradient(160deg, ${b.primary_color} 0%, ${b.accent_color} 100%)` }}
      >
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="relative z-10 px-6 pb-10 pt-16 max-w-2xl mx-auto w-full">
          {b.tagline && (
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-white/60 mb-3">
              {b.tagline}
            </span>
          )}
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight mb-6">
            {b.name}
          </h1>
          <div className="flex gap-3 flex-wrap">
            {waLink && (
              <a href={waLink} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-full text-sm shadow-xl hover:scale-105 transition-transform">
                <IconWhatsApp />
                Reservar por WhatsApp
              </a>
            )}
            {b.phone && (
              <a href={`tel:${b.phone}`}
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-full text-sm backdrop-blur-sm hover:bg-white/10 transition-colors">
                <IconPhone />
                Llamar
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── DESCRIPCIÓN ───────────────────────────────────── */}
      {b.description && (
        <section className="max-w-2xl mx-auto px-6 py-10">
          <p className="text-gray-600 text-lg leading-relaxed">{b.description}</p>
        </section>
      )}

      {/* ── DIVIDER ───────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6">
        <hr className="border-gray-100" />
      </div>

      {/* ── INFO ─────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 py-8 space-y-4">
        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Información</h2>

        {b.address && (
          <a href={mapsLink ?? '#'} target={mapsLink ? '_blank' : undefined} rel="noopener"
            className="flex items-start gap-4 group">
            <span className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: b.primary_color }}>
              <IconPin />
            </span>
            <div>
              <span className="text-sm font-semibold text-gray-800 group-hover:underline">
                {b.address}{b.city ? `, ${b.city}` : ''}
              </span>
              {mapsLink && <p className="text-xs text-gray-400 mt-0.5">Ver en Google Maps →</p>}
            </div>
          </a>
        )}

        {b.phone && (
          <a href={`tel:${b.phone}`} className="flex items-center gap-4 group">
            <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: b.primary_color }}>
              <IconPhone />
            </span>
            <span className="text-sm font-semibold text-gray-800 group-hover:underline">{b.phone}</span>
          </a>
        )}

        {b.email && (
          <a href={`mailto:${b.email}`} className="flex items-center gap-4 group">
            <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ background: b.primary_color }}>
              <IconMail />
            </span>
            <span className="text-sm font-semibold text-gray-800 group-hover:underline">{b.email}</span>
          </a>
        )}
      </section>

      {/* ── HORARIO ─────────────────────────────────────── */}
      {scheduleEntries.length > 0 && (
        <>
          <div className="max-w-2xl mx-auto px-6"><hr className="border-gray-100" /></div>
          <section className="max-w-2xl mx-auto px-6 py-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ background: b.primary_color }}>
                <IconClock />
              </span>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">Horario</h2>
            </div>
            <div className="space-y-2">
              {scheduleEntries.map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-semibold text-gray-700">{DAY_LABELS[day] ?? day}</span>
                  <span className="text-sm text-gray-500">{hours as string}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── REDES SOCIALES ─────────────────────────────── */}
      {(b.instagram || b.facebook) && (
        <>
          <div className="max-w-2xl mx-auto px-6"><hr className="border-gray-100" /></div>
          <section className="max-w-2xl mx-auto px-6 py-8">
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">Síguenos</h2>
            <div className="flex gap-3">
              {b.instagram && (
                <a href={`https://instagram.com/${b.instagram.replace('@', '')}`} target="_blank" rel="noopener"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50">
                  <IconInstagram />
                  @{b.instagram.replace('@', '')}
                </a>
              )}
              {b.facebook && (
                <a href={b.facebook.startsWith('http') ? b.facebook : `https://facebook.com/${b.facebook}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50">
                  <IconFacebook />
                  Facebook
                </a>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="mt-8 pb-28 pt-8 text-center">
        <p className="text-xs text-gray-300">
          Página creada con{' '}
          <a href="https://instaweb.es" className="hover:text-gray-500 transition-colors">instaweb.es</a>
        </p>
      </footer>

      {/* ── STICKY CTA BOTTOM ──────────────────────────── */}
      {waLink && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-2xl">
          <a href={waLink} target="_blank" rel="noopener"
            className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto text-white font-bold py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-transform"
            style={{ background: `linear-gradient(135deg, ${b.primary_color}, ${b.accent_color})` }}>
            <IconWhatsApp />
            Reservar ahora por WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
