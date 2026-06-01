import { put } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE_MB   = 5

export async function POST(request: Request) {
  const formData = await request.formData()
  const file     = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei gefunden.' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Nur Bildformate erlaubt (JPG, PNG, WebP, GIF, SVG).' }, { status: 400 })
  }
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json({ error: `Datei zu groß (max. ${MAX_SIZE_MB} MB).` }, { status: 400 })
  }

  try {
    // Zu Vercel Blob hochladen
    const blob = await put(`galerie/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    // URL in Supabase speichern
    const { data, error } = await supabaseAdmin
      .from('medien')
      .insert({ url: blob.url, alt: file.name.replace(/\.[^.]+$/, '') })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    console.error('Upload-Fehler:', err)
    return NextResponse.json({ error: 'Upload fehlgeschlagen.' }, { status: 500 })
  }
}
