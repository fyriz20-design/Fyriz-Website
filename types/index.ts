// ── Kontaktformular ───────────────────────────────────────────────────────────

export type AnfrageTyp =
  | 'webseite'
  | 'pc'
  | 'bildschirm'
  | 'sonstiges'

export type AnfrageStatus =
  | 'offen'
  | 'bearbeitung'
  | 'erledigt'

export interface Anfrage {
  id:         string
  name:       string
  email:      string
  typ:        AnfrageTyp
  nachricht:  string
  status:     AnfrageStatus
  created_at: string
}

// ── Medien-Manager ────────────────────────────────────────────────────────────

export interface Medium {
  id:         string
  url:        string          // Vercel Blob URL
  alt:        string
  created_at: string
}

// ── Labels (für UI-Darstellung) ───────────────────────────────────────────────

export const ANFRAGE_TYP_LABELS: Record<AnfrageTyp, string> = {
  webseite:   'Webseite erstellen',
  pc:         'PC / Notebook Reparatur',
  bildschirm: 'Bildschirm wechseln',
  sonstiges:  'Sonstiges',
}

export const ANFRAGE_STATUS_LABELS: Record<AnfrageStatus, string> = {
  offen:       'Offen',
  bearbeitung: 'In Bearbeitung',
  erledigt:    'Erledigt',
}

export const ANFRAGE_STATUS_COLORS: Record<AnfrageStatus, string> = {
  offen:       'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  bearbeitung: 'text-blue-400   bg-blue-400/10   border-blue-400/20',
  erledigt:    'text-green-400  bg-green-400/10  border-green-400/20',
}
