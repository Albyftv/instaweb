import Link from 'next/link'
import { PLANS } from '@/lib/stripe'

const TEMPLATES = [
  { id: 'restaurant', icon: '🍽️', label: 'Restaurantes y bares' },
  { id: 'services', icon: '🔧', label: 'Servicios locales' },
  { id: 'shop', icon: '🛍️', label: 'Tiendas y comercios' },
  { id: 'tourism', icon: '🏄', label: 'Turismo y experiencias' },
]

const HOW = [
  { n: '1', title: 'Elige tu tipo de negocio', desc: 'Restaurante, tienda, servicios o turismo — tenemos una plantilla para cada uno.' },
  { n: '2', title: 'Rellena tus datos', desc: 'Nombre, descripción, horario, teléfono, redes sociales. 5 minutos.' },
  { n: '3', title: 'Tu web está en línea', desc: 'Publicada al instante en sunegocio.instaweb.es. Sin esperar, sin técnicos.' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-extrabold text-blue-600">instaweb<span className="text-orange-500">.</span></span>
        <div className="flex items-center gap-6">
          <a href="#como" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Cómo funciona</a>
          <a href="#precios" className="text-sm text-gray-600 hover:text-gray-900 hidden sm:block">Precios</a>
          <Link href="/nuevo" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Crear mi web →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-24 max-w-4xl mx-auto">
        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          Tu negocio merece estar en internet
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
          Tu web lista<br />
          <span className="text-blue-600">en 5 minutos.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Rellena un formulario y tu página de negocio se publica al instante.
          Sin técnicos, sin contratos largos. Desde <strong className="text-gray-800">19€/mes</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/nuevo" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Crear mi web gratis 14 días →
          </Link>
          <a href="#como" className="border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full text-lg hover:bg-gray-50 transition-colors">
            Ver cómo funciona
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-4">Sin tarjeta de crédito para empezar</p>
      </section>

      {/* Tipos de negocio */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-10">Para todo tipo de negocio local</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEMPLATES.map(t => (
              <div key={t.id} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-default">
                <div className="text-4xl mb-3">{t.icon}</div>
                <p className="text-sm font-semibold text-gray-700">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-4">Así de fácil</h2>
          <p className="text-center text-gray-500 mb-14">Sin necesitar conocimientos técnicos</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {HOW.map(s => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-4">{s.n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-4">Precio simple, sin sorpresas</h2>
          <p className="text-center text-gray-500 mb-14">Cancela cuando quieras</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {Object.entries(PLANS).map(([key, plan]) => (
              <div key={key} className={`bg-white rounded-2xl p-8 border-2 ${key === 'pro' ? 'border-blue-600 shadow-xl shadow-blue-100' : 'border-gray-100'} relative`}>
                {key === 'pro' && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">MÁS POPULAR</span>
                )}
                <h3 className="font-extrabold text-lg mb-1">{plan.name}</h3>
                <div className="text-4xl font-extrabold mb-1">{plan.price}<span className="text-lg font-normal text-gray-400">€/mes</span></div>
                <p className="text-xs text-gray-400 mb-6">IVA no incluido</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-500 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href={`/nuevo?plan=${key}`} className={`block text-center font-bold py-3 rounded-full transition-colors ${key === 'pro' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300'}`}>
                  Empezar ahora
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">¿Tu negocio aún no tiene web?</h2>
        <p className="text-gray-500 text-lg mb-8">Tus clientes te están buscando en Google ahora mismo.</p>
        <Link href="/nuevo" className="bg-orange-500 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 inline-block">
          Crear mi web en 5 minutos →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 text-center text-sm text-gray-400">
        <p>© 2026 Instaweb · Un proyecto de <a href="https://albydev.com" className="hover:text-blue-600">albydev.com</a></p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="/aviso-legal" className="hover:text-gray-600">Aviso legal</a>
          <a href="/privacidad" className="hover:text-gray-600">Privacidad</a>
          <a href="/login" className="hover:text-gray-600">Mi cuenta</a>
        </div>
      </footer>
    </div>
  )
}
