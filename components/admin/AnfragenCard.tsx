'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import StatusBadge from './StatusBadge'
import {
  ANFRAGE_TYP_LABELS,
  ANFRAGE_STATUS_LABELS,
  type Anfrage,
  type AnfrageStatus,
} from '@/types'

const STATUS_ORDER: AnfrageStatus[] = ['offen', 'bearbeitung', 'erledigt']

interface AnfragenCardProps {
  anfrage: Anfrage
}

export default function AnfragenCard({ anfrage }: AnfragenCardProps) {
  const [expanded, setExpanded]   = useState(false)
  const [loading,  setLoading]    = useState(false)
  const [status,   setStatusState] = useState<AnfrageStatus>(anfrage.status)
  const router = useRouter()

  const updateStatus = async (newStatus: AnfrageStatus) => {
    if (newStatus === status) return
    setLoading(true)
    setStatusState(newStatus)

    await fetch(`/api/admin/anfragen/${anfrage.id}`, {
      method:  'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ status: newStatus }),
    })

    setLoading(false)
    router.refresh()
  }

  return (
    <div className={cn(
      'border rounded-card bg-surface-raised transition-colors',
      status === 'offen'       ? 'border-yellow-400/20' :
      status === 'bearbeitung' ? 'border-blue-400/20'   :
                                  'border-green-400/20'
    )}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div
        className="flex items-start justify-between gap-4 p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3 min-w-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-semibold text-slate-100 text-sm">{anfrage.name}</span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface-border text-slate-400">
                {ANFRAGE_TYP_LABELS[anfrage.typ]}
              </span>
            </div>
            <p className="text-xs text-slate-500">{formatDate(anfrage.created_at)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <StatusBadge status={status} />
          {expanded
            ? <ChevronUp size={15} className="text-slate-500" />
            : <ChevronDown size={15} className="text-slate-500" />
          }
        </div>
      </div>

      {/* ── Detail ──────────────────────────────────────────────────────── */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-surface-border pt-4 space-y-4">
          {/* Kontakt */}
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${anfrage.email}`} className="flex items-center gap-1.5 text-xs text-brand hover:underline">
              <Mail size={12} /> {anfrage.email}
            </a>
          </div>

          {/* Nachricht */}
          {anfrage.nachricht && (
            <div className="p-3 rounded-lg bg-[#0a0a0f] border border-surface-border">
              <p className="text-xs text-slate-500 font-medium mb-1">Nachricht</p>
              <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                {anfrage.nachricht}
              </p>
            </div>
          )}

          {/* Status-Buttons */}
          <div>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-2">
              Status ändern
            </p>
            <div className="flex gap-2 flex-wrap">
              {STATUS_ORDER.map((s) => (
                <button
                  key={s}
                  disabled={loading}
                  onClick={() => updateStatus(s)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                    status === s
                      ? s === 'offen'       ? 'bg-yellow-400/15 border-yellow-400/40 text-yellow-400' :
                        s === 'bearbeitung' ? 'bg-blue-400/15 border-blue-400/40 text-blue-400'       :
                                              'bg-green-400/15 border-green-400/40 text-green-400'
                      : 'bg-surface border-surface-border text-slate-500 hover:text-slate-300 hover:border-slate-500'
                  )}
                >
                  {ANFRAGE_STATUS_LABELS[s]}
                </button>
              ))}

              {/* Löschen */}
              <button
                disabled={loading}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all disabled:opacity-50"
              >
                <Trash2 size={12} />
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
