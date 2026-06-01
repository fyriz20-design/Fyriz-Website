import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Kombiniert clsx + tailwind-merge.
 * Standardmäßig von shadcn/ui erwartet — hier manuell definiert.
 *
 * Verwendung:
 *   cn('px-4 py-2', isActive && 'bg-brand', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatiert ein ISO-Datum auf Deutsch.
 *   formatDate('2024-06-01T10:00:00Z') → '1. Juni 2024'
 */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  })
}
