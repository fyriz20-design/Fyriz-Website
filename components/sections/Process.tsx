import Link from 'next/link'
import {
  MessageSquare,
  Search,
  Wrench,
  PackageCheck,
  ArrowRight,
  Wifi,
  MapPin,
  Eye,
} from 'lucide-react'

// ── Prozess-Schritte ─────────────────────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Anfrage',
    description:
      'Du beschreibst Problem, Gerät und Ziel. Je genauer die Ausgangslage, desto schneller die Einschätzung.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Analyse',
    description:
      'Die Ursache wird eingegrenzt, mögliche Risiken benannt und sinnvolle Lösungswege verglichen.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Umsetzung',
    description:
      'Die vereinbarte Lösung wird strukturiert umgesetzt, getestet und bei Bedarf mit dir abgestimmt.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Übergabe',
    description:
      'Du bekommst eine verständliche Zusammenfassung, damit das System danach sicher weiterläuft.',
  },
]

// ── Info-Pills ───────────────────────────────────────────────────────────────
const INFO_PILLS = [
  { icon: Wifi,   label: 'Remote-Hilfe möglich' },
  { icon: MapPin, label: 'Vor Ort in Freudenstadt' },
  { icon: Eye,    label: 'Transparent & nachvollziehbar' },
]

export default function Process() {
  return (
    <section id="ablauf" className="section-padding">
      <div className="container-max">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface text-slate-400 text-xs font-semibold mb-5 tracking-wide uppercase">
            Ablauf
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Ein klarer Weg von der
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)' }}
            >
              Anfrage zur Lösung.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Keine Blackbox — du siehst was gemacht wird, warum es sinnvoll ist
            und welche nächsten Schritte passen.
          </p>
        </div>

        {/* ── 4-Schritt-Flow ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* Connecting Line — nur Desktop */}
          <div
            aria-hidden="true"
            className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden lg:block"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.35) 20%, rgba(20,184,166,0.35) 80%, transparent 100%)',
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="group relative flex flex-col items-center text-center p-6 rounded-card border border-surface-border bg-surface-raised hover:border-brand/40 transition-colors"
              >
                {/* Step Number Circle */}
                <div className="relative w-20 h-20 mb-5 flex items-center justify-center">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border border-brand/25 bg-brand/5 group-hover:bg-brand/10 transition-colors" />
                  {/* Inner glow dot */}
                  <div className="absolute inset-3 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                    <span className="text-2xl font-extrabold text-brand leading-none">{number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-3 group-hover:bg-brand/15 transition-colors">
                  <Icon size={15} className="text-brand" />
                </div>

                {/* Text */}
                <h3 className="font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Zitat / Aussage ────────────────────────────────────────────── */}
        <div className="mt-12 p-8 rounded-card border border-surface-border bg-surface-raised relative overflow-hidden">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)',
            }}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-slate-100 font-semibold mb-1">
                Saubere Technik, verständlich erklärt.
              </p>
              <p className="text-slate-400 text-sm max-w-xl">
                Ob Privatgerät, Homeoffice-Arbeitsplatz oder neue Unternehmenswebseite —
                Ziel ist nicht nur eine schnelle Lösung, sondern ein Ergebnis das im Alltag
                ruhig und zuverlässig funktioniert.
              </p>
            </div>
            <Link
              href="#kontakt"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors"
            >
              Anfrage starten
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── Info-Pills ─────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {INFO_PILLS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
              <Icon size={14} className="text-brand/50 shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
