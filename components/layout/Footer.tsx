import Link from 'next/link'

const FOOTER_LINKS = {
  navigation: [
    { href: '/#leistungen', label: 'Leistungen' },
    { href: '/#ablauf',     label: 'Ablauf'     },
    { href: '/#kontakt',    label: 'Kontakt'    },
  ],
  rechtliches: [
    { href: '/impressum',   label: 'Impressum'   },
    { href: '/datenschutz', label: 'Datenschutz' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">

          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs shrink-0">
                F
              </div>
              <span className="font-semibold text-slate-100 text-sm">
                Fyriz
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professionelles Webdesign und IT-Reparaturen für Privatpersonen,
              Kleinunternehmen, Gasthäuser und Hotels.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Navigation
              </p>
              <ul className="space-y-2">
                {FOOTER_LINKS.navigation.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Rechtliches
              </p>
              <ul className="space-y-2">
                {FOOTER_LINKS.rechtliches.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-slate-100 transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Fyriz — Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-slate-700">
            Gebaut mit Next.js &amp; Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}
