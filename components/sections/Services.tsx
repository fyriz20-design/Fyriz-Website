import {
  Globe,
  Laptop,
  ShieldCheck,
  HardDrive,
  Wifi,
  Settings2,
  MonitorSmartphone,
  Check,
  Utensils,
  Hotel,
  Building2,
  MessageSquare,
} from 'lucide-react'

// ── Webdesign-Features ───────────────────────────────────────────────────────
const WEBDESIGN_FEATURES = [
  'Responsive Design — perfekt auf Handy, Tablet & Desktop',
  'Modernes UI mit Next.js & Tailwind CSS',
  'Kontaktformular mit E-Mail-Weiterleitung',
  'SEO-Grundoptimierung inklusive',
  'Schnelle Ladezeiten durch optimierten Code',
]

const WEBDESIGN_TARGETS = [
  { icon: Building2, label: 'Kleinunternehmen' },
  { icon: Utensils,  label: 'Gasthäuser & Restaurants' },
  { icon: Hotel,     label: 'Hotels & Pensionen' },
]

// ── IT-Services ──────────────────────────────────────────────────────────────
const IT_SERVICES = [
  {
    icon: Laptop,
    title: 'Laptop & PC Service',
    description:
      'Fehleranalyse, Leistungsprobleme, Komponentenprüfung und sinnvolle Upgrade-Empfehlungen.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Bildschirmaustausch',
    description:
      'Defekte Displays bei Laptops und Monitoren fachgerecht und schnell ersetzen.',
  },
  {
    icon: ShieldCheck,
    title: 'Sicherheit & Schutz',
    description:
      'Virenschutz, Updates, sichere Konten und verständliche Absicherung für Alltag und Arbeit.',
  },
  {
    icon: HardDrive,
    title: 'Backup & Daten',
    description:
      'Datensicherung, Wiederherstellungsstrategie, Cloud-Abgleich und geordnete Datenübergabe.',
  },
  {
    icon: Wifi,
    title: 'Netzwerk & WLAN',
    description:
      'Router, Drucker und Peripherie so einrichten, dass alle Geräte zuverlässig zusammenspielen.',
  },
  {
    icon: Settings2,
    title: 'Neue Systeme',
    description:
      'Windows, Programme, E-Mail und Browser sauber startklar machen — inkl. Datenübernahme.',
  },
]

export default function Services() {
  return (
    <section id="leistungen" className="section-padding">
      <div className="container-max">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface text-slate-400 text-xs font-semibold mb-5 tracking-wide uppercase">
            Leistungen
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Webdesign &amp; IT-Support
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)' }}
            >
              aus einer Hand.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Vom langsamen Laptop bis zur neuen Unternehmenswebseite —
            praxisnah, transparent und auf dauerhafte Nutzung ausgelegt.
          </p>
        </div>

        {/* ── Featured: Webdesign Card ───────────────────────────────────── */}
        <div className="relative rounded-card border border-surface-border bg-surface-raised overflow-hidden mb-6 p-8 sm:p-10">
          {/* Glow-Linie oben */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.6) 50%, transparent 100%)',
            }}
          />
          {/* Subtiler Hintergrund-Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at top right, rgba(20,184,166,0.08) 0%, transparent 70%)',
            }}
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-start">
            {/* Links: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/25 text-brand text-xs font-semibold mb-5">
                <Globe size={12} />
                Webdesign
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-3">
                Professionelle Webseite für dein Unternehmen
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Moderne, schnelle und mobiloptimierte Webseiten — speziell für
                Kleinunternehmen, Gasthäuser und Hotels die online professionell
                auftreten wollen, ohne hohe Agenturkosten.
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8">
                {WEBDESIGN_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-brand/15 border border-brand/30 flex items-center justify-center">
                      <Check size={10} className="text-brand" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors"
              >
                <MessageSquare size={14} />
                Webseite anfragen
              </a>
            </div>

            {/* Rechts: Für wen? */}
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Ideal für
              </p>
              {WEBDESIGN_TARGETS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-card bg-[#0a0a0f] border border-surface-border"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-brand" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{label}</span>
                </div>
              ))}

              <div className="mt-2 p-4 rounded-card border border-surface-border bg-[#0a0a0f]">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kein Abo, keine versteckten Kosten — einmalige Entwicklung,
                  du bekommst den kompletten Quellcode und hostest selbst auf Vercel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── IT-Service Grid ────────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">
            IT-Reparaturen &amp; Support
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IT_SERVICES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group p-6 rounded-card border border-surface-border bg-surface-raised hover:border-brand/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-4 group-hover:bg-brand/15 transition-colors">
                  <Icon size={16} className="text-brand" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2 text-sm">{title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
