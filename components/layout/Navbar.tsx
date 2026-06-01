'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { href: '/#leistungen', label: 'Leistungen' },
  { href: '/#ablauf',     label: 'Ablauf'     },
  { href: '/#kontakt',    label: 'Kontakt'    },
  { href: '/impressum',   label: 'Impressum'  },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-surface-border'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
              F
            </div>
            <span className="font-semibold text-slate-100 text-sm hidden sm:block">
              Fyriz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#kontakt"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-btn bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors"
            >
              Anfrage starten
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Menü öffnen"
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>

        </nav>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  )
}
