import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'

export default function HomePage() {
  return (
    <>
      <Hero />

      <Services />

      <Process />

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
