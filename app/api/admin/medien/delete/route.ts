import { del } from '@vercel/blob'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(request: Request) {
  const { id, url } = await request.json()

  if (!id || !url) {
    return NextResponse.json({ error: 'ID und URL erforderlich.' }, { status: 400 })
  }

  try {
    // Aus Vercel Blob löschen
    await del(url)

    // Aus Supabase löschen
    const { error } = await supabaseAdmin
      .from('medien')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lösch-Fehler:', err)
    return NextResponse.json({ error: 'Löschen fehlgeschlagen.' }, { status: 500 })
  }
}
