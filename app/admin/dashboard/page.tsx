import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, MessageSquare, Image, LogOut } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  // Schnellstatistiken
  const { count: offeneAnfragen } = await supabase
    .from('anfragen')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'offen')

  const { count: alleAnfragen } = await supabase
    .from('anfragen')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Admin-Header */}
      <header className="border-b border-surface-border bg-surface px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs">
            S
          </div>
          <span className="font-semibold text-slate-100 text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:block">{user.email}</span>
          <form action="/api/admin/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-colors"
            >
              <LogOut size={14} />
              Abmelden
            </button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">Dashboard</h1>
        <p className="text-slate-400 text-sm mb-8">Willkommen zurück!</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-surface border border-surface-border rounded-card p-5">
            <p className="text-xs text-slate-400 mb-2">Offene Anfragen</p>
            <p className="text-3xl font-bold text-brand">{offeneAnfragen ?? 0}</p>
          </div>
          <div className="bg-surface border border-surface-border rounded-card p-5">
            <p className="text-xs text-slate-400 mb-2">Anfragen gesamt</p>
            <p className="text-3xl font-bold text-slate-100">{alleAnfragen ?? 0}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/admin/anfragen"
            className="group bg-surface border border-surface-border hover:border-brand rounded-card p-6 transition-colors"
          >
            <MessageSquare size={24} className="text-brand mb-3" />
            <h2 className="font-semibold text-slate-100 mb-1">Anfragen verwalten</h2>
            <p className="text-xs text-slate-400">
              Status ändern, Anfragen einsehen und filtern.
            </p>
          </Link>

          <Link
            href="/admin/medien"
            className="group bg-surface border border-surface-border hover:border-brand rounded-card p-6 transition-colors"
          >
            <Image size={24} className="text-brand mb-3" />
            <h2 className="font-semibold text-slate-100 mb-1">Medien-Manager</h2>
            <p className="text-xs text-slate-400">
              Bilder per Drag-and-Drop hochladen — erscheinen sofort in der Galerie.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
