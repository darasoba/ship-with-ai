/**
 * Audit all paid applications and check if their profile plan matches.
 * Reports any mismatches.
 * Usage: node scripts/audit-plans.mjs
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const envContent = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
  if (!process.env[key]) process.env[key] = value
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Get all paid applications
const { data: apps } = await supabase
  .from('applications')
  .select('id, email, full_name, status, plan, paid_at')
  .eq('status', 'paid')
  .order('paid_at', { ascending: true })

if (!apps?.length) { console.log('No paid applications found.'); process.exit(0) }

// Get all auth users
const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
const usersByEmail = Object.fromEntries(users.map(u => [u.email, u]))

const mismatches = []
const noProfile = []
const noAccount = []
const ok = []

for (const app of apps) {
  const authUser = usersByEmail[app.email]
  if (!authUser) {
    noAccount.push(app)
    continue
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', authUser.id)
    .single()

  if (!profile) {
    noProfile.push({ ...app, auth_id: authUser.id })
    continue
  }

  if (profile.plan !== app.plan) {
    mismatches.push({ ...app, auth_id: authUser.id, profile_plan: profile.plan })
  } else {
    ok.push({ ...app, profile_plan: profile.plan })
  }
}

console.log(`\n=== Plan Audit (${apps.length} paid applications) ===\n`)

if (ok.length) {
  console.log(`✓ OK (${ok.length}):`)
  for (const a of ok) console.log(`  ${a.full_name} <${a.email}>  app=${a.plan}  profile=${a.profile_plan}`)
}

if (mismatches.length) {
  console.log(`\n✗ PLAN MISMATCH (${mismatches.length}) — needs fixing:`)
  for (const a of mismatches) console.log(`  ${a.full_name} <${a.email}>  app=${a.plan}  profile=${a.profile_plan}`)
} else {
  console.log(`\n✓ No plan mismatches found`)
}

if (noProfile.length) {
  console.log(`\n⚠ HAS ACCOUNT BUT NO PROFILE (${noProfile.length}):`)
  for (const a of noProfile) console.log(`  ${a.full_name} <${a.email}>  app=${a.plan}`)
}

if (noAccount.length) {
  console.log(`\n⚠ PAID BUT NO AUTH ACCOUNT YET (${noAccount.length}):`)
  for (const a of noAccount) console.log(`  ${a.full_name} <${a.email}>  app=${a.plan}  paid_at=${a.paid_at}`)
}
