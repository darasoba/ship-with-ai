import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Admin client that bypasses RLS — only use in API routes
// Lazy-initialized to avoid build-time errors with missing env vars
let _admin: SupabaseClient | null = null

export function getSupabaseAdmin() {
  if (!_admin) {
    _admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _admin
}
