import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
}

export default function DatenschutzPage() {
  return (
    <div className="section-padding">
      <div className="container-max max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Datenschutzerklärung</h1>
        <p className="text-slate-500 text-sm mb-10">Stand: Juni 2026</p>

        <div className="space-y-8 text-slate-300 text-sm leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">1. Verantwortlicher</h2>
            <p>
              Firuz Azgin<br />
              Hirschkopfstraße 26<br />
              72250 Freudenstadt<br />
              Telefon: 0179 254 22 51<br />
              E-Mail: fyriz20@gmail.com
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Ich verarbeite personenbezogene Daten nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie der angebotenen Inhalte und Leistungen erforderlich
              ist. Eine Weitergabe an Dritte erfolgt nur im technisch notwendigen Umfang
              (siehe Abschnitt 5).
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">3. Kontaktformular</h2>
            <p className="mb-3">
              Wenn Sie das Kontaktformular auf dieser Website nutzen, werden folgende Daten
              erhoben:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 mb-3">
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Ihre Nachricht</li>
              <li>Art der Anfrage</li>
            </ul>
            <p className="mb-3">
              Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von
              Anfragen).
            </p>
            <p>
              Die Daten werden in einer Datenbank gespeichert und nach abschließender
              Bearbeitung Ihrer Anfrage gelöscht, spätestens jedoch nach 12 Monaten.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">4. Hosting & technische Dienste</h2>
            <p className="mb-3">Diese Website nutzt folgende Drittanbieter:</p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-surface-raised border border-surface-border">
                <p className="font-medium text-slate-200 mb-1">Vercel Inc. (Hosting)</p>
                <p className="text-slate-400">
                  Diese Website wird auf Servern von Vercel Inc. betrieben. Die
                  Serverless-Funktionen und Datenverarbeitung erfolgen ausschließlich in der
                  EU-Region <strong className="text-slate-300">Frankfurt am Main, Deutschland</strong> (Region: fra1).
                  Beim Abruf der Website werden automatisch Server-Log-Daten
                  (IP-Adresse, Browsertyp, Datum/Uhrzeit) erfasst.
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.{' '}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                    className="text-brand hover:underline">Datenschutzerklärung Vercel</a>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-surface-raised border border-surface-border">
                <p className="font-medium text-slate-200 mb-1">Supabase (Datenbank)</p>
                <p className="text-slate-400">
                  Kontaktanfragen werden in einer Datenbank von Supabase Inc. gespeichert.
                  Der Datenbankserver befindet sich in der EU (Frankfurt).{' '}
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer"
                    className="text-brand hover:underline">Datenschutzerklärung Supabase</a>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-surface-raised border border-surface-border">
                <p className="font-medium text-slate-200 mb-1">Resend (E-Mail-Versand)</p>
                <p className="text-slate-400">
                  Zur E-Mail-Weiterleitung von Kontaktanfragen wird Resend Inc. verwendet.
                  Dabei werden Name, E-Mail-Adresse und Ihre Nachricht übertragen.{' '}
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                    className="text-brand hover:underline">Datenschutzerklärung Resend</a>
                </p>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">5. Cookies & Tracking</h2>
            <p>
              Diese Website verwendet <strong className="text-slate-200">keine Tracking-Cookies</strong> und
              kein Analyse-Tool (z. B. Google Analytics). Es werden lediglich technisch
              notwendige Session-Cookies für den eingeloggten Adminbereich gesetzt.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">6. Ihre Rechte</h2>
            <p className="mb-3">Sie haben gegenüber mir folgende Rechte:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 mb-3">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an{' '}
              <a href="mailto:fyriz20@gmail.com" className="text-brand hover:underline">
                fyriz20@gmail.com
              </a>.
              Sie haben zudem das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde
              zu beschweren.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-slate-100 font-semibold text-base mb-3">7. Aktualität</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung
              der Website kann eine Anpassung notwendig werden.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
