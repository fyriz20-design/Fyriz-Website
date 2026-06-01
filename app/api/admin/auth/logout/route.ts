import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // 303 See Other → Browser folgt dem Redirect mit GET statt POST
  const loginUrl = new URL('/admin/login', process.env.NEXT_PUBLIC_SITE_URL ?? request.url)
  return NextResponse.redirect(loginUrl, { status: 303 })
}
