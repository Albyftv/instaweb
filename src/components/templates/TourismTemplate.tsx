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

export default function TourismTemplate({ business: b }: { business: Business }) {
  const wa = b.whatsapp?.replace(/\D/g, '') || b.phone?.replace(/\D/g, '')
  const waLink = wa
    ? `https://wa.me/${wa.startsWith('34') ? wa : `34${wa}`}?text=Hola%2C+me+interesa+reservar+con+${encodeURIComponent(b.name)}`
    : null
  const mapsLink = b.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.address} ${b.city ?? ''}`)}`
    : null

  const scheduleEntries = b.schedule
    ? Object.entries(b.schedule).filter(([, v]) => v)
    : []

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── HERO PANTALLA COMPLETA ─────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: `linear-gradient(160deg, ${b.primary_color} 0%, ${b.accent_color} 100%)` }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3"
          style={{ background: 'white' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 translate-y-1/2 -translate-x-1/3"
          style={{ background: 'white' }} />

        <div className="relative z-10 max-w-lg">
          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-white/90 text-xs font-bold tracking-widest uppercase mb-8">
            Turismo · Experiencias
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight mb-4 drop-shadow-lg">
            {b.name}
          </h1>
          {b.tagline && (
            <p className="text-white/80 text-xl max-w-sm mx-auto mb-12 leading-relaxed">{b.tagline}</p>
          )}
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener"
              className="inline-flex items-center gap-3 bg-white font-bold px-8 py-4 rounded-2xl text-base shadow-2xl hover:scale-105 transition-transform"
              style={{ color: b.primary_color }}>
              <IconWhatsApp />
              Reservar ahora
            </a>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Ver más</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 animate-bounce">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ── DESCRIPCIÓN ─────────────────────────────────────── */}
      {b.description && (
        <section className="max-w-2xl mx-auto px-6 py-14">
          <p className="text-gray-600 text-xl leading-relaxed text-center">{b.description}</p>
        </section>
      )}

      <div className="max-w-2xl mx-auto px-6 pb-32 space-y-4">

        {/* ── CONTACTO ─────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <div className="px-6 py-4 text-white text-xs font-bold tracking-widest uppercase"
            style={{ background: `linear-gradient(135deg, ${b.primary_color}, ${b.accent_color})` }}>
            Contacto y ubicación
          </div>
          <div className="bg-white p-6 space-y-4">
            {b.address && (
              <a href={mapsLink ?? '#'} target={mapsLink ? '_blank' : undefined} rel="noopener"
                className="flex items-start gap-4 group">
                <span className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: b.primary_color }}>
                  <IconPin />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800 group-hover:underline">
                    {b.address}{b.city ? `, ${b.city}` : ''}
                  </p>
                  {mapsLink && <p className="text-xs text-gray-400 mt-0.5">Ver en Google Maps →</p>}
                </div>
              </a>
            )}
            {b.phone && (
              <a href={`tel:${b.phone}`} className="flex items-center gap-4 group">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: b.primary_color }}>
                  <IconPhone />
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:underline">{b.phone}</span>
              </a>
            )}
            {b.email && (
              <a href={`mailto:${b.email}`} className="flex items-center gap-4 group">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: b.primary_color }}>
                  <IconMail />
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:underline">{b.email}</span>
              </a>
            )}
          </div>
        </div>

        {/* ── HORARIO ─────────────────────────────────────── */}
        {scheduleEntries.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ background: b.primary_color }}>
                <IconClock />
              </span>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">Disponibilidad</h2>
            </div>
            <div className="space-y-2">
              {scheduleEntries.map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-semibold text-gray-700">{DAY_LABELS[day] ?? day}</span>
                  <span className="text-sm text-gray-500">{hours as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REDES ─────────────────────────────────────────── */}
        {(b.instagram || b.facebook) && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Síguenos</h2>
            <div className="flex gap-3 flex-wrap">
              {b.instagram && (
                <a href={`https://instagram.com/${b.instagram.replace('@', '')}`} target="_blank" rel="noopener"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
                  <IconInstagram />
                  @{b.instagram.replace('@', '')}
                </a>
              )}
              {b.facebook && (
                <a href={b.facebook.startsWith('http') ? b.facebook : `https://facebook.com/${b.facebook}`}
                  target="_blank" rel="noopener"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
                  <IconFacebook />
                  Facebook
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── STICKY CTA ─────────────────────────────────── */}
      {waLink && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-2xl">
          <a href={waLink} target="_blank" rel="noopener"
            className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto text-white font-bold py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-transform"
            style={{ background: `linear-gradient(135deg, ${b.primary_color}, ${b.accent_color})` }}>
            <IconWhatsApp />
            Reservar por WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
