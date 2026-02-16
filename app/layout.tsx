import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shipwithai.com'),
  title: "Ship With AI — Build and ship your project in 4 weeks",
  description:
    "A 4-week mentorship for designers, developers, and product people who want to build real products with AI coding tools. Small cohorts. Hands-on mentorship. You ship something real.",
  openGraph: {
    title: "Ship With AI — Build and ship your project in 4 weeks",
    description:
      "A 4-week mentorship for designers, developers, and product people who want to build real products with AI coding tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ship With AI — Build and ship your project in 4 weeks",
    description:
      "Bring your project idea. Ship it in 4 weeks with AI tools and hands-on mentorship.",
    creator: "@darasoba",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
