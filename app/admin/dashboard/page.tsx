import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, Image } from 'lucide-react'
import AdminShell from '@/components/admin/AdminShell'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { count: offeneAnfragen } = await supabaseAdmin
    .from('anfragen')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'offen')

  const { count: alleAnfragen } = await supabaseAdmin
    .from('anfragen')
    .select('*', { count: 'exact', head: true })

  const { count: alleMedien } = await supabaseAdmin
    .from('medien')
    .select('*', { count: 'exact', head: true })

  return (
    <AdminShell email={user.email ?? ''}>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-slate-100 mb-1">Dashboard</h1>
        <p className="text-slate-400 text-sm">Willkommen zurück!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-surface-raised border border-surface-border rounded-card p-5">
          <p className="text-xs text-slate-400 mb-2">Offene Anfragen</p>
          <p className="text-3xl font-bold text-brand">{offeneAnfragen ?? 0}</p>
        </div>
        <div className="bg-surface-raised border border-surface-border rounded-card p-5">
          <p className="text-xs text-slate-400 mb-2">Anfragen gesamt</p>
          <p className="text-3xl font-bold text-slate-100">{alleAnfragen ?? 0}</p>
        </div>
        <div className="bg-surface-raised border border-surface-border rounded-card p-5">
          <p className="text-xs text-slate-400 mb-2">Bilder in Galerie</p>
          <p className="text-3xl font-bold text-slate-100">{alleMedien ?? 0}</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          href="/admin/anfragen"
          className="group bg-surface-raised border border-surface-border hover:border-brand/40 rounded-card p-6 transition-colors"
        >
          <MessageSquare size={22} className="text-brand mb-3" />
          <h2 className="font-semibold text-slate-100 mb-1">Anfragen verwalten</h2>
          <p className="text-xs text-slate-400">
            Status ändern, Anfragen einsehen und filtern.
          </p>
        </Link>

        <Link
          href="/admin/medien"
          className="group bg-surface-raised border border-surface-border hover:border-brand/40 rounded-card p-6 transition-colors"
        >
          <Image size={22} className="text-brand mb-3" />
          <h2 className="font-semibold text-slate-100 mb-1">Medien-Manager</h2>
          <p className="text-xs text-slate-400">
            Bilder per Drag-and-Drop hochladen — erscheinen sofort in der Galerie.
          </p>
        </Link>
      </div>
    </AdminShell>
  )
}
