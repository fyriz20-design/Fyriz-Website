import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Contact from '@/components/sections/Contact'

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

      <Contact />
    </>
  )
}
