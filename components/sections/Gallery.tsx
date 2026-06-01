import { createClient } from '@/lib/supabase/server'
import GalleryGrid from './GalleryGrid'

// ── Platzhalter-Bilder (von Unsplash) ────────────────────────────────────────
// Werden angezeigt bis du eigene Bilder über /admin/medien hochlädst.
const PLACEHOLDER_IMAGES = [
  {
    id:  'p1',
    url: 'https://images.unsplash.com/photo-1593640408182-31c228b0b6ed?w=1200&q=80',
    alt: 'Professionelle Laptop-Reparatur',
  },
  {
    id:  'p2',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    alt: 'Webdesign & Entwicklung',
  },
  {
    id:  'p3',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    alt: 'Modernes Webdesign',
  },
  {
    id:  'p4',
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    alt: 'IT-Arbeitsplatz Einrichtung',
  },
  {
    id:  'p5',
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
    alt: 'Bildschirm Reparatur',
  },
  {
    id:  'p6',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    alt: 'Netzwerk & IT-Support',
  },
  {
    id:  'p7',
    url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
    alt: 'Beratung & Support',
  },
]

export default async function Gallery() {
  const supabase = await createClient()
  const { data: medien } = await supabase
    .from('medien')
    .select('*')
    .order('created_at', { ascending: false })

  const hasRealImages = !!medien?.length
  const images        = hasRealImages ? medien! : PLACEHOLDER_IMAGES

  return (
    <section id="galerie" className="section-padding">
      <div className="container-max">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface text-slate-400 text-xs font-semibold mb-5 tracking-wide uppercase">
            Galerie
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Einblicke in{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)' }}
            >
              die Arbeit.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Reparaturen, Webprojekte und IT-Einrichtungen — ein Blick hinter die Kulissen.
          </p>
        </div>

        {/* ── Grid (Client Component mit Lightbox) ───────────────────────── */}
        <GalleryGrid
          images={images}
          isPlaceholder={!hasRealImages}
        />

      </div>
    </section>
  )
}
