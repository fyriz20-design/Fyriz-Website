import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'

export default function HomePage() {
  return (
    <>
      <Hero />

      <Services />

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
