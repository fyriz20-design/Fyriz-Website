import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import { ANFRAGE_TYP_LABELS, type AnfrageTyp } from '@/types'

// Admin-Client mit Service-Role — umgeht RLS für Server-seitige Inserts
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, telefon, typ, nachricht } = body

    // ── Validierung ──────────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !typ) {
      return NextResponse.json(
        { error: 'Bitte Name, E-Mail und Thema ausfüllen.' },
        { status: 400 }
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Bitte eine gültige E-Mail-Adresse eingeben.' },
        { status: 400 }
      )
    }

    const typLabel = ANFRAGE_TYP_LABELS[typ as AnfrageTyp] ?? typ

    // ── In Supabase speichern ────────────────────────────────────────────────
    const { error: dbError } = await supabaseAdmin
      .from('anfragen')
      .insert({
        name:      name.trim(),
        email:     email.trim().toLowerCase(),
        typ,
        nachricht: nachricht?.trim() ?? '',
        status:    'offen',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      // Kein Hard-Fail — E-Mail-Versand trotzdem versuchen
    }

    // ── E-Mail via Resend senden ─────────────────────────────────────────────
    // HINWEIS: Für Produktion die FROM-Adresse auf deine verifizierte
    // Resend-Domain ändern (z.B. anfragen@sawazki-electronics.de).
    // Für lokale Tests funktioniert onboarding@resend.dev → deine eigene E-Mail.
    await resend.emails.send({
      from:    'Sawazki Electronics <onboarding@resend.dev>',
      to:      process.env.CONTACT_EMAIL!,
      replyTo: email.trim(),
      subject: `Neue Anfrage: ${typLabel} — ${name.trim()}`,
      html: `
        <!DOCTYPE html>
        <html lang="de">
        <body style="font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px;">
          <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background: #0a0a0f; padding: 24px 32px;">
              <p style="color: #14b8a6; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 4px;">
                Sawazki Electronics
              </p>
              <h1 style="color: #f1f5f9; font-size: 20px; font-weight: 800; margin: 0;">
                Neue Anfrage eingegangen
              </h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; width: 120px;">Thema</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${typLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Name</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${name.trim()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">E-Mail</td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #14b8a6;">${email.trim()}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase;">Telefon</td>
                  <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${telefon?.trim() || '—'}</td>
                </tr>
              </table>
              ${nachricht?.trim() ? `
              <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #14b8a6;">
                <p style="color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 8px;">Nachricht</p>
                <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${nachricht.trim()}</p>
              </div>` : ''}
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                  Diese Anfrage wurde über das Kontaktformular auf sawazki-electronics.de übermittelt.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Kontaktformular Fehler:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' },
      { status: 500 }
    )
  }
}
