import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import AnfragenCard from '@/components/admin/AnfragenCard'
import type { Anfrage, AnfrageStatus } from '@/types'

interface Props {
  searchParams: Promise<{ status?: string }>
}

const STATUS_FILTERS: { value: AnfrageStatus | 'alle'; label: string }[] = [
  { value: 'alle',        label: 'Alle'           },
  { value: 'offen',       label: 'Offen'          },
  { value: 'bearbeitung', label: 'In Bearbeitung' },
  { value: 'erledigt',    label: 'Erledigt'       },
]

export default async function AnfragenPage({ searchParams }: Props) {
  // Auth-Check via normalen Client
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { status: filterStatus } = await searchParams
  const activeFilter = (filterStatus as AnfrageStatus | 'alle') ?? 'alle'

  // Daten via Admin-Client (umgeht RLS)
  let query = supabaseAdmin
    .from('anfragen')
    .select('*')
    .order('created_at', { ascending: false })

  if (activeFilter !== 'alle') {
    query = query.eq('status', activeFilter)
  }

  const { data: anfragen, error } = await query

  // Zähler für Filter-Badges
  const { data: counts } = await supabaseAdmin
    .from('anfragen')
    .select('status')

  const countMap: Record<string, number> = { alle: counts?.length ?? 0 }
  counts?.forEach(({ status }) => {
    countMap[status] = (countMap[status] ?? 0) + 1
  })

  return (
    <AdminShell email={user.email ?? ''}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-100 mb-1">Anfragen</h1>
        <p className="text-slate-400 text-sm">Alle Kundenanfragen — klicke auf eine Karte zum Öffnen.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_FILTERS.map(({ value, label }) => (
          <a
            key={value}
            href={value === 'alle' ? '/admin/anfragen' : `/admin/anfragen?status=${value}`}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
              activeFilter === value
                ? 'bg-brand/10 border-brand/30 text-brand'
                : 'bg-surface-raised border-surface-border text-slate-400 hover:text-slate-100',
            ].join(' ')}
          >
            {label}
            {countMap[value] !== undefined && (
              <span className="px-1.5 py-0.5 rounded-full bg-surface-border text-[10px]">
                {countMap[value]}
              </span>
            )}
          </a>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 mb-4">
          Fehler beim Laden: {error.message}
        </p>
      )}

      {!anfragen?.length ? (
        <div className="text-center py-20 text-slate-500 text-sm">
          Keine Anfragen gefunden.
        </div>
      ) : (
        <div className="space-y-3">
          {(anfragen as Anfrage[]).map((a) => (
            <AnfragenCard key={a.id} anfrage={a} />
          ))}
        </div>
      )}
    </AdminShell>
  )
}
