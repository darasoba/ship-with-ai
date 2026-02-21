'use client'

import { useCallback, useRef } from 'react'

const CARD_FILTERS = [
  'none',
  'hue-rotate(160deg)',
  'hue-rotate(270deg)',
]

function getCardFilter(name: string, plan: string): string {
  if (plan === 'premium') return 'none'
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return CARD_FILTERS[Math.abs(hash) % CARD_FILTERS.length]
}

interface BadgeCardProps {
  fullName: string
  plan: string
  cohortLabel: string
}

export function BadgeCard({ fullName, plan, cohortLabel }: BadgeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(async () => {
    try {
      const svgPath = plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'

      // Load SVG directly into an Image — bypasses html2canvas entirely
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Failed to load card SVG'))
        img.src = svgPath
      })

      const scale = 4
      const W = img.naturalWidth * scale
      const H = img.naturalHeight * scale

      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      // Apply color filter if applicable
      const cssFilter = getCardFilter(fullName, plan)
      if (cssFilter !== 'none') ctx.filter = cssFilter
      ctx.drawImage(img, 0, 0, W, H)
      ctx.filter = 'none'

      // Draw name text
      const name = (fullName || 'Cohort Member').toUpperCase()
      const cohort = `${cohortLabel}${plan === 'premium' ? ' · Premium' : ''}`

      const textX = W * 0.13
      const textY = W * 0.055 + H * 0.23
      const maxW = W * 0.58

      let nameFontSize = W * 0.055
      ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
      while (ctx.measureText(name.split(' ').sort((a, b) => b.length - a.length)[0] || name).width > maxW && nameFontSize > W * 0.03) {
        nameFontSize -= 1
        ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
      }

      const words = name.split(' ')
      const lines: string[] = []
      let currentLine = ''
      for (const word of words) {
        const test = currentLine ? `${currentLine} ${word}` : word
        if (ctx.measureText(test).width > maxW && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = test
        }
      }
      if (currentLine) lines.push(currentLine)
      const nameLines = lines.slice(0, 2)

      ctx.save()
      ctx.translate(textX, textY)
      ctx.rotate(-1.75 * Math.PI / 180)

      ctx.fillStyle = '#000000'
      ctx.textBaseline = 'top'
      const lineHeight = nameFontSize * 1.2
      nameLines.forEach((line, i) => {
        ctx.font = `700 ${nameFontSize}px Inter, sans-serif`
        ctx.fillText(line, 0, i * lineHeight)
      })

      // Draw cohort label
      const cohortY = nameLines.length * lineHeight + nameFontSize * 0.15
      const cohortFontSize = W * 0.03
      ctx.font = `500 ${cohortFontSize}px Inter, sans-serif`
      ctx.fillStyle = 'rgba(0,0,0,0.52)'
      ctx.fillText(cohort, 0, cohortY)

      ctx.restore()

      const link = document.createElement('a')
      link.download = 'ship-with-ai-card.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to download card:', err)
    }
  }, [fullName, plan, cohortLabel])

  const cohortText = `${cohortLabel}${plan === 'premium' ? ' · Premium' : ''}`

  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Your Badge</h2>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Card preview — fixed width for consistent font sizing */}
        <div className="w-full max-w-[260px] mx-auto sm:mx-0 shrink-0">
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: '784 / 931' }}
          >
            {/* SVG with color filter */}
            <div
              ref={cardRef}
              className="absolute inset-0"
              style={{ filter: getCardFilter(fullName, plan) }}
            >
              <img
                src={plan === 'premium' ? '/card/card-bg-premium.svg' : '/card/card-bg.svg'}
                alt=""
                className="absolute inset-0 w-full h-full pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            {/* Text overlay covers baked-in SVG sample text on screen */}
            <div
              data-text-overlay
              className="absolute flex flex-col justify-start pointer-events-none"
              style={{ left: '13%', top: '23.5%', width: '58%', paddingTop: '1.5%', backgroundColor: '#FBF6EE' }}
            >
              <p
                className="font-bold text-left w-full uppercase line-clamp-2"
                style={{
                  fontSize: '0.85rem',
                  transform: 'rotate(-1.75deg)',
                  lineHeight: 1.15,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.01em',
                  color: '#000000',
                }}
              >
                {fullName || 'Cohort Member'}
              </p>
              <p
                className="font-medium text-left w-full"
                style={{
                  fontSize: '0.45rem',
                  transform: 'rotate(-1.75deg)',
                  lineHeight: 1.1,
                  fontFamily: 'Inter, sans-serif',
                  color: 'rgba(0,0,0,0.52)',
                  marginTop: '2%',
                }}
              >
                {cohortText}
              </p>
            </div>
          </div>
        </div>

        {/* Info + download */}
        <div className="space-y-3 pt-1">
          <p className="text-sm text-muted">
            Your cohort badge. Share it on socials to let people know you&apos;re shipping with AI.
          </p>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-surface hover:bg-surface-raised border border-border rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download card
          </button>
        </div>
      </div>
    </div>
  )
}
