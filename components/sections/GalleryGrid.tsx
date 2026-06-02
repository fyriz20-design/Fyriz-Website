'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryItem {
  id:  string
  url: string
  alt: string
}

interface GalleryGridProps {
  images:      GalleryItem[]
  isPlaceholder: boolean
}

export default function GalleryGrid({ images, isPlaceholder }: GalleryGridProps) {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  return (
    <>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className={cn(
              'group relative overflow-hidden rounded-card border border-surface-border bg-surface-raised',
              // Erstes Bild groß (2x2) auf Desktop
              i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
            )}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={i === 0
                ? '(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw'
                : '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
              }
            />
            {/* Hover-Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <ZoomIn size={16} className="text-white" />
              </div>
            </div>
            {/* Alt-Text unten */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium truncate">{img.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Schließen"
          >
            <X size={18} />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full" style={{ aspectRatio: '16/9' }}>
              <Image
                src={lightbox.url}
                alt={lightbox.alt}
                fill
                className="object-contain rounded-card"
                sizes="90vw"
                priority
              />
            </div>
            {lightbox.alt && (
              <p className="text-center text-slate-400 text-sm mt-3">{lightbox.alt}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
