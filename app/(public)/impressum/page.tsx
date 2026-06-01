import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
}

export default function ImpressumPage() {
  return (
    <div className="section-padding">
      <div className="container-max max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 mb-8">Impressum</h1>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div>
            <h2 className="text-slate-100 font-semibold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Firuz Azgin<br />
              Hirschkopfstraße 26<br />
              72250 Freudenstadt
            </p>
          </div>

          <div>
            <h2 className="text-slate-100 font-semibold mb-2">Kontakt</h2>
            <p>
              Telefon: 0179 254 22 51<br />
              E-Mail: fyriz20@gmail.com
            </p>
          </div>

          <div>
            <h2 className="text-slate-100 font-semibold mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine
              Gewähr.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
