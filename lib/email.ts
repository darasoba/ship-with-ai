import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSignupEmail({
  to,
  fullName,
  signupUrl,
  plan = 'basic',
}: {
  to: string
  fullName: string
  signupUrl: string
  plan?: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ship.darasoba.com'
  const cardImage = plan === 'premium'
    ? `${baseUrl}/card/card-bg-premium.svg`
    : `${baseUrl}/card/card-bg.svg`
  const starterPackUrl = `${baseUrl}/starter-pack`
  const planLabel = plan === 'premium' ? 'Premium' : 'Basic'

  const { error } = await resend.emails.send({
    from: 'Ship With AI <hello@darasoba.com>',
    to,
    subject: "Your Ship With AI access is ready",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 8px;">
          Welcome to Ship With AI
        </h1>
        <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">
          Hi ${fullName},<br><br>
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

  if (error) {
    console.error('Failed to send signup email:', error)
    throw new Error('Failed to send signup email')
  }
}
