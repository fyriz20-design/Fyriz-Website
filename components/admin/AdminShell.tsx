'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Image, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { href: '/admin/anfragen',  icon: MessageSquare,   label: 'Anfragen'   },
  { href: '/admin/medien',    icon: Image,           label: 'Medien'     },
]

interface AdminShellProps {
  email:    string
  children: React.ReactNode
}

export default function AdminShell({ email, children }: AdminShellProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs">
              F
            </div>
            <span className="font-semibold text-slate-100 text-sm">Admin</span>
          </div>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  pathname === href
                    ? 'bg-brand/10 text-brand'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                )}
              >
                <Icon size={13} />
                {label}
              </Link>
            ))}
          </nav>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden md:block truncate max-w-[160px]">{email}</span>
            <form action="/api/admin/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-100 transition-colors"
              >
                <LogOut size={13} />
                Abmelden
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ── Mobile Nav ──────────────────────────────────────────────────── */}
      <nav className="sm:hidden border-b border-surface-border bg-surface px-4 py-2 flex gap-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] font-medium transition-colors',
              pathname === href ? 'text-brand' : 'text-slate-500'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  )
}
