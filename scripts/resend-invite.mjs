/**
 * One-off script: resend invite email to a specific applicant.
 * Usage: node scripts/resend-invite.mjs mrdavidfabiyi@gmail.com
 *
 * Reads .env.local for credentials.
 */

import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local')
const envContent = readFileSync(envPath, 'utf8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx === -1) continue
  const key = trimmed.slice(0, idx).trim()
  const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
  // Don't overwrite vars already set in the environment
  if (!process.env[key]) process.env[key] = value
}

const email = process.argv[2]
if (!email) {
  console.error('Usage: node scripts/resend-invite.mjs <email>')
  process.exit(1)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const resend = new Resend(process.env.RESEND_API_KEY)
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ship.darasoba.com'

// 1. Look up the application
const { data: application, error: appError } = await supabase
  .from('applications')
  .select('id, email, full_name, status, plan')
  .eq('email', email)
  .single()

if (appError || !application) {
  console.error('Application not found for', email)
  process.exit(1)
}

console.log('Found application:', application)

// 2. Generate a fresh invite token (7-day expiry)
const token = crypto.randomBytes(32).toString('hex')
const expiresAt = new Date()
expiresAt.setDate(expiresAt.getDate() + 7)

const { error: tokenError } = await supabase.from('invite_tokens').insert({
  token,
  email: application.email,
  application_id: application.id,
  expires_at: expiresAt.toISOString(),
})

if (tokenError) {
  console.error('Failed to create invite token:', tokenError)
  process.exit(1)
}

// 3. Send the email
const signupUrl = `${baseUrl}/signup?token=${token}`
const plan = application.plan || 'basic'
const planLabel = plan === 'premium' ? 'Premium' : 'Basic'
const cardImage = plan === 'premium'
  ? `${baseUrl}/card/card-bg-premium.svg`
  : `${baseUrl}/card/card-bg.svg`
const starterPackUrl = `${baseUrl}/starter-pack`

const { error: emailError } = await resend.emails.send({
  from: 'Ship With AI <hello@darasoba.com>',
  to: application.email,
  subject: 'Your Ship With AI access is ready',
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 8px;">
        Welcome to Ship With AI
      </h1>
      <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">
        Hi ${application.full_name},<br><br>
        Your payment has been confirmed. You're in the March '26 Cohort (${planLabel} plan). Click the button below to create your account and get started.
      </p>
      <a href="${signupUrl}" style="display: inline-block; background: #111; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Create your account
      </a>

      <div style="margin-top: 32px; border-radius: 12px; overflow: hidden;">
        <img src="${cardImage}" alt="Your Ship With AI cohort badge" style="width: 100%; height: auto; display: block; border-radius: 12px;" />
      </div>
      <p style="font-size: 13px; color: #777; margin-top: 8px; text-align: center;">
        Your cohort badge — share it on socials!
      </p>

      <div style="margin-top: 28px; padding: 20px; background: #f7f7f6; border-radius: 10px;">
        <p style="font-size: 14px; font-weight: 600; color: #111; margin: 0 0 6px;">
          Get a head start
        </p>
        <p style="font-size: 13px; color: #555; line-height: 1.5; margin: 0 0 12px;">
          Check out the starter pack — curriculum, tools, templates, and everything you need before we kick off.
        </p>
        <a href="${starterPackUrl}" style="font-size: 13px; color: #2563EB; text-decoration: none; font-weight: 500;">
          View starter pack →
        </a>
      </div>

      <p style="font-size: 13px; color: #999; margin-top: 32px; line-height: 1.5;">
        Your signup link expires in 7 days. If you have any issues, reply to this email.
      </p>
    </div>
  `,
})

if (emailError) {
  console.error('Failed to send email:', emailError)
  process.exit(1)
}

console.log(`✓ Invite sent to ${application.email} (${planLabel})`)
console.log(`  Signup URL: ${signupUrl}`)
