/**
 * Look up a user by name/email and fix their plan in both applications + profiles tables.
 * Usage:
 *   node scripts/fix-plan.mjs lookup "victor onazi"
 *   node scripts/fix-plan.mjs fix <email> <plan>
 *
 * Examples:
 *   node scripts/fix-plan.mjs lookup "victor onazi"
 *   node scripts/fix-plan.mjs fix victor@example.com premium
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local (don't overwrite already-set vars)
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

const [,, command, arg1, arg2] = process.argv

if (command === 'lookup') {
  const query = arg1?.toLowerCase()
  if (!query) { console.error('Usage: fix-plan.mjs lookup "<name or email>"'); process.exit(1) }

  const { data: apps } = await supabase
    .from('applications')
    .select('id, email, full_name, status, plan, paid_at')
    .ilike('full_name', `%${query}%`)

  const { data: appsByEmail } = await supabase
    .from('applications')
    .select('id, email, full_name, status, plan, paid_at')
    .ilike('email', `%${query}%`)

  const all = [...(apps || []), ...(appsByEmail || [])]
  const unique = all.filter((a, i) => all.findIndex(b => b.id === a.id) === i)

  if (!unique.length) { console.log('No applications found for:', query); process.exit(0) }

  console.log('\n=== Applications ===')
  for (const a of unique) {
    console.log(`  ${a.full_name} <${a.email}>  status=${a.status}  plan=${a.plan}  paid_at=${a.paid_at}`)

    const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    const authUser = users?.find(u => u.email === a.email)
    if (authUser) {
      const { data: prof } = await supabase
        .from('profiles')
        .select('id, full_name, plan, cohort')
        .eq('id', authUser.id)
        .single()
      console.log(`  Profile: plan=${prof?.plan ?? '(no profile yet)'}  cohort=${prof?.cohort}  auth_id=${authUser.id}`)
    } else {
      console.log(`  Profile: (no auth account yet)`)
    }
  }

} else if (command === 'fix') {
  const email = arg1
  const plan = arg2
  if (!email || !['basic', 'premium'].includes(plan)) {
    console.error('Usage: fix-plan.mjs fix <email> basic|premium')
    process.exit(1)
  }

  // Fix applications table
  const { error: appError } = await supabase
    .from('applications')
    .update({ plan })
    .eq('email', email)

  if (appError) console.error('applications update error:', appError)
  else console.log(`✓ applications.plan set to ${plan} for ${email}`)

  // Fix profiles table (need auth user id first)
  const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  const authUser = users?.find(u => u.email === email)
  if (authUser) {
    const { error: profError } = await supabase
      .from('profiles')
      .update({ plan })
      .eq('id', authUser.id)

    if (profError) console.error('profiles update error:', profError)
    else console.log(`✓ profiles.plan set to ${plan} for ${email} (auth id: ${authUser.id})`)
  } else {
    console.log(`  No auth account found — only applications table updated`)
  }

} else {
  console.log('Usage:')
  console.log('  node scripts/fix-plan.mjs lookup "<name or email>"')
  console.log('  node scripts/fix-plan.mjs fix <email> basic|premium')
}
