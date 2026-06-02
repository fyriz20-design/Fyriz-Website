import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import MediaManager from '@/components/admin/MediaManager'
import type { Medium } from '@/types'

export default async function MedienPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: medien } = await supabaseAdmin
    .from('medien')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminShell email={user.email ?? ''}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-100 mb-1">Medien-Manager</h1>
        <p className="text-slate-400 text-sm">
          Bilder hochladen oder löschen — sie erscheinen sofort in der Galerie auf der Hauptseite.
        </p>
      </div>

      <MediaManager initial={(medien ?? []) as Medium[]} />
    </AdminShell>
  )
}
