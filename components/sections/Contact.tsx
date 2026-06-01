'use client'

import { useState } from 'react'
import {
  Globe,
  Laptop,
  MonitorSmartphone,
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Wifi,
  Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AnfrageTyp } from '@/types'

// ── Typ-Auswahl ──────────────────────────────────────────────────────────────
const ANFRAGE_TYPEN: { value: AnfrageTyp; label: string; icon: React.ElementType; sub: string }[] = [
  { value: 'webseite',   icon: Globe,             label: 'Webseite erstellen',      sub: 'Für Unternehmen & Gasthäuser' },
  { value: 'pc',         icon: Laptop,            label: 'PC / Notebook Reparatur', sub: 'Diagnose, Reinigung, Reparatur' },
  { value: 'bildschirm', icon: MonitorSmartphone, label: 'Bildschirm wechseln',     sub: 'Display-Austausch & Reparatur' },
  { value: 'sonstiges',  icon: HelpCircle,        label: 'Sonstiges',               sub: 'Netzwerk, Backup, Beratung …' },
]

// ── Kontakt-Infos ────────────────────────────────────────────────────────────
const CONTACT_INFOS = [
  { icon: MapPin, label: 'Adresse',  value: 'Hirschkopfstraße 26, 72250 Freudenstadt' },
  { icon: Phone,  label: 'Telefon',  value: '0179 254 22 51',                          href: 'tel:+491792542251' },
  { icon: Mail,   label: 'E-Mail',   value: 'fyriz20@gmail.com',                       href: 'mailto:fyriz20@gmail.com' },
]

const SERVICE_PILLS = [
  { icon: Wifi, label: 'Remote-Hilfe möglich' },
  { icon: Home, label: 'Vor Ort nach Absprache' },
]

// ── Formular-State ───────────────────────────────────────────────────────────
interface FormData {
  name:      string
  email:     string
  telefon:   string
  typ:       AnfrageTyp | ''
  nachricht: string
  datenschutz: boolean
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', telefon: '', typ: '', nachricht: '', datenschutz: false,
  })
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState('')

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.typ)          return setError('Bitte ein Thema auswählen.')
    if (!form.datenschutz)  return setError('Bitte die Datenschutzerklärung bestätigen.')
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Ein Fehler ist aufgetreten.')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = cn(
    'w-full px-4 py-2.5 rounded-lg text-sm text-slate-100 placeholder:text-slate-600',
    'bg-[#0a0a0f] border border-surface-border',
    'focus:outline-none focus:border-brand transition-colors'
  )

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-max">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-surface-border bg-surface text-slate-400 text-xs font-semibold mb-5 tracking-wide uppercase">
            Kontakt
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Beschreibe kurz,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #14b8a6 0%, #38bdf8 100%)' }}
            >
              wobei du Hilfe brauchst.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Deine Anfrage landet direkt bei mir — ich melde mich so schnell wie möglich.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Formular ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 bg-surface-raised border border-surface-border rounded-card p-7 sm:p-8 relative overflow-hidden">
            {/* Glow-Linie oben */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), transparent)' }}
            />

            {success ? (
              /* ── Erfolgs-State ─────────────────────────────────────────── */
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mb-5">
                  <CheckCircle2 size={28} className="text-brand" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">Anfrage gesendet!</h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Ich habe deine Nachricht erhalten und melde mich so schnell wie möglich bei dir.
                </p>
              </div>
            ) : (
              /* ── Formular-State ────────────────────────────────────────── */
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Typ-Auswahl */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Worum geht es? <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {ANFRAGE_TYPEN.map(({ value, label, icon: Icon, sub }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => set('typ', value)}
                        className={cn(
                          'flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all',
                          form.typ === value
                            ? 'border-brand bg-brand/10 shadow-[0_0_0_1px_rgba(20,184,166,0.3)]'
                            : 'border-surface-border bg-[#0a0a0f] hover:border-brand/40'
                        )}
                      >
                        <div className={cn(
                          'w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5',
                          form.typ === value ? 'bg-brand/20' : 'bg-surface-border'
                        )}>
                          <Icon size={13} className={form.typ === value ? 'text-brand' : 'text-slate-400'} />
                        </div>
                        <div>
                          <p className={cn('text-xs font-semibold leading-tight', form.typ === value ? 'text-slate-100' : 'text-slate-300')}>
                            {label}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + E-Mail */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      required
                      placeholder="Max Mustermann"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">
                      E-Mail <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      required
                      placeholder="max@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Telefon <span className="text-slate-600">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={form.telefon}
                    onChange={(e) => set('telefon', e.target.value)}
                    placeholder="+49 123 456789"
                    className={inputClass}
                  />
                </div>

                {/* Nachricht */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Nachricht <span className="text-slate-600">(optional)</span>
                  </label>
                  <textarea
                    value={form.nachricht}
                    onChange={(e) => set('nachricht', e.target.value)}
                    rows={4}
                    placeholder="Kurze Beschreibung des Problems oder Vorhabens …"
                    className={cn(inputClass, 'resize-none')}
                  />
                </div>

                {/* Datenschutz */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="datenschutz"
                    checked={form.datenschutz}
                    onChange={(e) => set('datenschutz', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded accent-brand shrink-0 cursor-pointer"
                  />
                  <label htmlFor="datenschutz" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    Mit dem Absenden bestätige ich, dass ich die{' '}
                    <a href="/datenschutz" className="text-brand hover:underline">Datenschutzerklärung</a>{' '}
                    gelesen habe und der Verarbeitung meiner Daten zur Bearbeitung der Anfrage zustimme.
                  </label>
                </div>

                {/* Fehler */}
                {error && (
                  <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-btn bg-brand hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wird gesendet …
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Anfrage senden
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Kontakt-Info ────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Kontakt-Daten Card */}
            <div className="bg-surface-raised border border-surface-border rounded-card p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Direkter Kontakt
              </p>
              <div className="space-y-4">
                {CONTACT_INFOS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={13} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a href={href} className="text-sm text-slate-300 hover:text-brand transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-300">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service-Infos */}
            <div className="bg-surface-raised border border-surface-border rounded-card p-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                Service
              </p>
              <div className="space-y-3">
                {SERVICE_PILLS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <Icon size={12} className="text-brand" />
                    </div>
                    <span className="text-sm text-slate-300">{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                Deine Anfrage wird direkt per E-Mail weitergeleitet. Ich melde mich
                in der Regel innerhalb von 24 Stunden.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
