'use client'

import Link from 'next/link'
import { ArrowRight, Monitor, Wrench, Globe } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Monitor, label: 'PC & Laptop Service' },
  { icon: Wrench,  label: 'Reparatur & Einrichtung' },
  { icon: Globe,   label: 'Webdesign für KMU & Hotels' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center px-6 overflow-hidden"
    >
      {/* ── Hintergrund-Effekte ──────────────────────────────────────────── */}

      {/* Teal-Glow von oben */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(20,184,166,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Subtiles Punkt-Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Horizontale Trennlinie unten */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(20,184,166,0.25), transparent)',
        }}
      />

      {/* ── Inhalt ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto text-center animate-slide-up">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-semibold mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          IT-Service &amp; Webdesign · Freudenstadt
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 leading-[1.07] tracking-tight mb-6">
          Technik, die{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)',
            }}
          >
            läuft.
          </span>
          <br />
          Design, das{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)',
            }}
          >
            überzeugt.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Kompetenter IT-Support für Laptops &amp; PCs — und professionelles Webdesign
          für Kleinunternehmen, Gasthäuser und Hotels.
          Remote oder vor Ort in Freudenstadt.
        </p>

        {/* CTA-Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-btn bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors shadow-lg shadow-brand/20"
          >
            Anfrage starten
            <ArrowRight size={15} />
          </Link>
          <Link
            href="#leistungen"
            className="inline-flex items-center justify-center px-6 py-3 rounded-btn border border-surface-border text-slate-300 hover:border-brand/40 hover:text-slate-100 font-semibold text-sm transition-colors"
          >
            Leistungen ansehen
          </Link>
        </div>

        {/* Trust-Zeile */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
              <Icon size={15} className="text-brand/50 shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
