import Hero from '@/components/sections/Hero'

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* LEISTUNGEN ─ Schritt 5 */}
      <section id="leistungen" className="section-padding">
        <div className="container-max">
          <p className="text-center text-slate-600 text-sm">
            Leistungen-Sektion — wird in Schritt 5 ausgebaut
          </p>
        </div>
      </section>

      {/* ABLAUF ─ Schritt 6 */}
      <section id="ablauf" className="section-padding">
        <div className="container-max">
          <p className="text-center text-slate-600 text-sm">
            Ablauf-Sektion — wird in Schritt 6 ausgebaut
          </p>
        </div>
      </section>

      {/* GALERIE ─ Schritt 7 */}
      <section id="galerie" className="section-padding">
        <div className="container-max">
          <p className="text-center text-slate-600 text-sm">
            Galerie — wird in Schritt 7 mit Vercel Blob verbunden
          </p>
        </div>
      </section>

      {/* KONTAKT ─ Schritt 8 */}
      <section id="kontakt" className="section-padding">
        <div className="container-max">
          <p className="text-center text-slate-600 text-sm">
            Kontaktformular — wird in Schritt 8 mit Resend verbunden
          </p>
        </div>
      </section>
    </>
  )
}
