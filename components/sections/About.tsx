import { CheckCircle2, Wrench, Globe, MapPin } from 'lucide-react'

const HIGHLIGHTS = [
  { icon: Globe,        text: 'Webdesign für Kleinunternehmen, Gasthäuser & Hotels' },
  { icon: Wrench,       text: 'IT-Reparaturen & Support — remote und vor Ort' },
  { icon: MapPin,       text: 'Ansässig in Freudenstadt im Schwarzwald' },
  { icon: CheckCircle2, text: 'Transparent, direkt, ohne Agenturaufschlag' },
]

export default function About() {
  return (
    <section className="section-padding border-t border-surface-border">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Avatar + Deko */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-brand/10 blur-3xl scale-110 pointer-events-none" />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-2xl bg-surface-raised border border-surface-border flex items-center justify-center overflow-hidden">
                {/* Initials Placeholder — einfach durch <Image> ersetzen wenn Foto vorhanden */}
                <div className="flex flex-col items-center gap-3 select-none">
                  <span className="text-7xl sm:text-8xl font-bold text-brand/30">F</span>
                  <span className="text-xs text-slate-600 tracking-widest uppercase">Firuz Azgin</span>
                </div>

                {/* Dot pattern Overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #14b8a6 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Freudenstadt
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-brand text-xs font-semibold uppercase tracking-widest mb-3">
              Über mich
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-5 leading-snug">
              Ein Ansprechpartner.<br />
              <span className="text-gradient-brand">Zwei Stärken.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Ich bin Firuz Azgin — freiberuflicher Webdesigner und IT-Techniker aus Freudenstadt.
              Mein Ziel ist es, dass Technik einfach funktioniert: ob eine neue Webseite für dein
              Unternehmen oder ein Laptop, der wieder rund läuft.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Kein Ticket-System, keine anonyme Hotline. Du erreichst mich direkt — und ich erkläre
              verständlich, was getan wird und warum.
            </p>

            <ul className="space-y-3">
              {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                  <Icon size={16} className="text-brand mt-0.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}
