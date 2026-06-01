import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Sawazki Electronics — Webdesign & IT-Reparaturen',
    template: '%s | Sawazki Electronics',
  },
  description:
    'Professionelles Webdesign für Kleinunternehmen, Gasthäuser und Hotels. IT-Reparaturen: Notebooks, PCs, Bildschirmaustausch.',
  keywords: [
    'Webdesign', 'IT-Reparatur', 'Notebook Reparatur', 'PC Reparatur',
    'Bildschirm wechseln', 'Webseite erstellen lassen',
  ],
  authors: [{ name: 'Jakob Sawazki' }],
  openGraph: {
    type:     'website',
    locale:   'de_DE',
    siteName: 'Sawazki Electronics',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={GeistSans.variable}>
      <body className="bg-[#0a0a0f] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
