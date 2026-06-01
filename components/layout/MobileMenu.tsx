'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen:  boolean
  onClose: () => void
  links:   { href: string; label: string }[]
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Body-Scroll sperren wenn Menü offen
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer — von rechts einfahren */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-l border-surface-border',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-border">
          <span className="font-semibold text-slate-100 text-sm">Menü</span>
          <button
            onClick={onClose}
            aria-label="Menü schließen"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="px-4 py-3 text-sm text-slate-300 hover:text-slate-100 hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* CTA */}
          <div className="mt-4 pt-4 border-t border-surface-border">
            <Link
              href="#kontakt"
              onClick={onClose}
              className="flex items-center justify-center px-4 py-3 rounded-btn bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-colors"
            >
              Anfrage starten
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
