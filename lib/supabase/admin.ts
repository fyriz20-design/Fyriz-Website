import { createClient } from '@supabase/supabase-js'

/**
 * Supabase Admin-Client mit Service-Role-Key.
 * Umgeht Row Level Security — NUR serverseitig verwenden!
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
