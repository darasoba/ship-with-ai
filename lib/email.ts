import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSignupEmail({
  to,
  fullName,
  signupUrl,
}: {
  to: string
  fullName: string
  signupUrl: string
}) {
  const { error } = await resend.emails.send({
    from: 'Ship With AI <onboarding@resend.dev>',
    to,
    subject: 'Your Ship With AI access is ready',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 8px;">
          Welcome to Ship With AI
        </h1>
        <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 24px;">
          Hi ${fullName},<br><br>
          Your payment has been confirmed. Click the button below to create your account and get started.
        </p>
        <a href="${signupUrl}" style="display: inline-block; background: #111; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
          Create your account
        </a>
        <p style="font-size: 13px; color: #999; margin-top: 32px; line-height: 1.5;">
          This link expires in 7 days. If you have any issues, reply to this email.
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Failed to send signup email:', error)
    throw new Error('Failed to send signup email')
  }
}
