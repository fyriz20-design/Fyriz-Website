import { cn } from '@/lib/utils'
import { ANFRAGE_STATUS_LABELS, ANFRAGE_STATUS_COLORS, type AnfrageStatus } from '@/types'

interface StatusBadgeProps {
  status: AnfrageStatus
  className?: string
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border',
        ANFRAGE_STATUS_COLORS[status],
        className
      )}
    >
      {ANFRAGE_STATUS_LABELS[status]}
    </span>
  )
}
