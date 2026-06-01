'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Upload, Trash2, ImageIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Medium } from '@/types'

interface MediaManagerProps {
  initial: Medium[]
}

export default function MediaManager({ initial }: MediaManagerProps) {
  const [media,   setMedia]   = useState<Medium[]>(initial)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting]  = useState<string | null>(null)
  const [error,   setError]   = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // ── Upload ───────────────────────────────────────────────────────────────
  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!fileArr.length) return setError('Bitte nur Bildformate (JPG, PNG, WebP …).')

    setUploading(true)
    setError('')

    for (const file of fileArr) {
      const fd = new FormData()
      fd.append('file', file)

      const res  = await fetch('/api/admin/medien/upload', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Upload fehlgeschlagen.')
        break
      }
      setMedia(prev => [data, ...prev])
    }

    setUploading(false)
  }, [])

  // ── Delete ───────────────────────────────────────────────────────────────
  const deleteMedia = async (item: Medium) => {
    if (!confirm(`"${item.alt}" wirklich löschen?`)) return
    setDeleting(item.id)

    const res = await fetch('/api/admin/medien/delete', {
      method:  'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ id: item.id, url: item.url }),
    })

    if (res.ok) {
      setMedia(prev => prev.filter(m => m.id !== item.id))
    } else {
      const data = await res.json()
      setError(data.error ?? 'Löschen fehlgeschlagen.')
    }
    setDeleting(null)
  }

  // ── Drag & Drop Handler ──────────────────────────────────────────────────
  const onDragOver  = (e: React.DragEvent) => { e.preventDefault(); setDragging(true)  }
  const onDragLeave = ()                    => setDragging(false)
  const onDrop      = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    uploadFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-6">
      {/* ── Drop Zone ─────────────────────────────────────────────────────── */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative border-2 border-dashed rounded-card p-12 text-center cursor-pointer transition-all',
          dragging
            ? 'border-brand bg-brand/10 scale-[1.01]'
            : 'border-surface-border hover:border-brand/50 hover:bg-brand/5'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={28} className="text-brand animate-spin" />
            <p className="text-sm text-slate-400">Wird hochgeladen …</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center">
              <Upload size={20} className="text-brand" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">
                {dragging ? 'Loslassen zum Hochladen' : 'Bilder hierher ziehen'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                oder klicken zum Auswählen · JPG, PNG, WebP, GIF · max. 5 MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Fehler ──────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* ── Bilder-Grid ─────────────────────────────────────────────────── */}
      {media.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-sm">
          <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
          Noch keine Bilder hochgeladen.
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-500">
            {media.length} Bild{media.length !== 1 ? 'er' : ''} in der Galerie
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-card overflow-hidden border border-surface-border bg-surface-raised"
              >
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                  <p className="text-white text-[10px] font-medium text-center line-clamp-2 leading-tight">
                    {item.alt}
                  </p>
                  <button
                    onClick={() => deleteMedia(item)}
                    disabled={deleting === item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/90 hover:bg-red-500 text-white text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    {deleting === item.id
                      ? <Loader2 size={11} className="animate-spin" />
                      : <Trash2 size={11} />
                    }
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
