import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()?.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const url = new URL('/', request.url)
    url.searchParams.set('waitlist', 'invalid')
    return NextResponse.redirect(url, 303)
  }

  console.log('[waitlist]', email)

  const url = new URL('/', request.url)
  url.searchParams.set('waitlist', 'success')
  return NextResponse.redirect(url, 303)
}
