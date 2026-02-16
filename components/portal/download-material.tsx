'use client'

import { useState } from 'react'

interface DownloadMaterialProps {
  title: string
  slug: string
  contentHtml: string
}

export function DownloadMaterial({ title, slug, contentHtml }: DownloadMaterialProps) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)

    try {
      const html2pdf = (await import('html2pdf.js')).default

      // Get user name from Supabase (if available)
      let userName = 'Licensed Student'
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single()
          userName = profile?.full_name || user.email?.split('@')[0] || 'Licensed Student'
        }
      } catch {
        // Supabase not configured, use default
      }

      // Build a visible container — must be position:absolute (not fixed) so
      // html2canvas can measure and capture the full scrollable height
      const container = document.createElement('div')
      container.style.cssText = 'position:absolute;top:0;left:0;width:700px;background:#fff;z-index:-1;'

      // Scoped styles
      const style = document.createElement('style')
      style.textContent = [
        '#pdf-root { position: relative; font-family: system-ui, -apple-system, sans-serif; color: #171717; padding: 40px 24px; background: #fff; }',
        '#pdf-watermark { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; overflow: hidden; pointer-events: none; }',
        '#pdf-watermark span { display: block; font-size: 42px; font-weight: 700; color: rgba(0,0,0,0.04); white-space: nowrap; transform: rotate(-35deg); line-height: 1; }',
        '#pdf-root .pdf-header, #pdf-root .pdf-body, #pdf-root .pdf-footer { position: relative; z-index: 1; }',
        '#pdf-root .pdf-header { display: flex; justify-content: space-between; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #E0E0E0; }',
        '#pdf-root .pdf-brand { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #9CA3AF; margin-bottom: 4px; }',
        '#pdf-root .pdf-title { font-size: 24px; font-weight: 700; letter-spacing: -0.03em; color: #171717; }',
        '#pdf-root .pdf-license-label { font-size: 10px; color: #9CA3AF; }',
        '#pdf-root .pdf-license-name { font-size: 12px; font-weight: 600; color: #2563EB; }',
        '#pdf-root .pdf-body { font-size: 14px; line-height: 1.7; }',
        '#pdf-root .pdf-body h1 { font-size: 22px; font-weight: 700; margin: 28px 0 12px; color: #171717; }',
        '#pdf-root .pdf-body h2 { font-size: 18px; font-weight: 600; margin: 24px 0 10px; padding-bottom: 8px; border-bottom: 1px solid #E0E0E0; color: #171717; }',
        '#pdf-root .pdf-body h3 { font-size: 15px; font-weight: 600; margin: 18px 0 8px; color: #171717; }',
        '#pdf-root .pdf-body h4 { font-size: 14px; font-weight: 600; margin: 14px 0 6px; color: #171717; }',
        '#pdf-root .pdf-body p { margin: 0 0 12px; color: #525252; }',
        '#pdf-root .pdf-body a { color: #2563EB; text-decoration: none; }',
        '#pdf-root .pdf-body strong { font-weight: 600; color: #171717; }',
        '#pdf-root .pdf-body ul, #pdf-root .pdf-body ol { padding-left: 20px; margin: 0 0 12px; }',
        '#pdf-root .pdf-body li { margin-bottom: 4px; color: #525252; }',
        '#pdf-root .pdf-body code { font-family: monospace; font-size: 0.85em; background: #F5F5F4; border-radius: 3px; padding: 1px 4px; }',
        '#pdf-root .pdf-body pre { background: #F5F5F4; border: 1px solid #E0E0E0; border-radius: 8px; padding: 14px 16px; overflow: hidden; margin: 16px 0; font-size: 12px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }',
        '#pdf-root .pdf-body pre code { background: none; border: none; padding: 0; }',
        '#pdf-root .pdf-body blockquote { border-left: 3px solid #2563EB; padding-left: 12px; margin: 14px 0; color: #9CA3AF; font-style: italic; }',
        '#pdf-root .pdf-body table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }',
        '#pdf-root .pdf-body thead th { text-align: left; font-weight: 600; padding: 8px; border-bottom: 1px solid #E0E0E0; }',
        '#pdf-root .pdf-body tbody td { padding: 8px; border-bottom: 1px solid #EBEBEB; color: #525252; }',
        '#pdf-root .pdf-body hr { border: none; border-top: 1px solid #E0E0E0; margin: 24px 0; }',
        '#pdf-root .pdf-body img { max-width: 100%; }',
        '#pdf-root .pdf-body .heading-link { color: inherit; text-decoration: none; }',
        '#pdf-root .pdf-footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; }',
        '#pdf-root .pdf-footer span { font-size: 10px; color: #9CA3AF; }',
      ].join('\n')
      container.appendChild(style)

      const root = document.createElement('div')
      root.id = 'pdf-root'

      // Watermark layer (behind content via z-index: 0)
      const watermark = document.createElement('div')
      watermark.id = 'pdf-watermark'
      // Fill with repeating @darasoba text spread across the page
      for (let i = 0; i < 80; i++) {
        const line = document.createElement('span')
        line.textContent = '@darasoba    @darasoba    @darasoba    @darasoba    @darasoba'
        line.style.marginTop = (i === 0 ? '40' : '100') + 'px'
        line.style.marginLeft = (i % 2 === 0 ? '-40' : '60') + 'px'
        watermark.appendChild(line)
      }
      root.appendChild(watermark)

      // Header
      const header = document.createElement('div')
      header.className = 'pdf-header'
      const hl = document.createElement('div')
      const brand = document.createElement('div')
      brand.className = 'pdf-brand'
      brand.textContent = 'Ship With AI'
      const ttl = document.createElement('div')
      ttl.className = 'pdf-title'
      ttl.textContent = title
      hl.appendChild(brand)
      hl.appendChild(ttl)
      const hr = document.createElement('div')
      hr.style.textAlign = 'right'
      const ll = document.createElement('div')
      ll.className = 'pdf-license-label'
      ll.textContent = 'Licensed to'
      const ln = document.createElement('div')
      ln.className = 'pdf-license-name'
      ln.textContent = userName
      hr.appendChild(ll)
      hr.appendChild(ln)
      header.appendChild(hl)
      header.appendChild(hr)
      root.appendChild(header)

      // Body content
      const body = document.createElement('div')
      body.className = 'pdf-body'
      body.innerHTML = contentHtml
      root.appendChild(body)

      // Footer
      const footer = document.createElement('div')
      footer.className = 'pdf-footer'
      const fl = document.createElement('span')
      fl.textContent = 'Ship With AI \u2014 Build and ship your project in 4 weeks'
      const fr = document.createElement('span')
      fr.textContent = 'Licensed to ' + userName + ' \u2014 Do not distribute'
      footer.appendChild(fl)
      footer.appendChild(fr)
      root.appendChild(footer)

      container.appendChild(root)
      document.body.appendChild(container)

      // Wait for browser to layout and paint
      await new Promise((r) => setTimeout(r, 300))

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html2pdf() as any)
        .set({
          margin: [15, 15, 20, 15],
          filename: slug + '-ship-with-ai.pdf',
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollY: -window.scrollY,
            height: root.scrollHeight,
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(root)
        .toPdf()
        .get('pdf')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((pdf: any) => {
          const totalPages = pdf.internal.getNumberOfPages()
          const pageWidth = pdf.internal.pageSize.getWidth()
          const pageHeight = pdf.internal.pageSize.getHeight()

          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)

            // Footer on each page
            pdf.setFontSize(8)
            pdf.setTextColor(160, 160, 160)
            pdf.setFont('helvetica', 'normal')
            pdf.text(
              'Ship With AI  |  Licensed to ' + userName + '  |  Do not distribute',
              pageWidth / 2,
              pageHeight - 8,
              { align: 'center' }
            )

            // Page number
            pdf.text(
              i + ' / ' + totalPages,
              pageWidth - 15,
              pageHeight - 8,
              { align: 'right' }
            )

            // Top line
            pdf.setDrawColor(230, 230, 230)
            pdf.setLineWidth(0.3)
            pdf.line(15, 10, pageWidth - 15, 10)
          }
        })
        .save()

      document.body.removeChild(container)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-muted hover:text-foreground bg-surface border border-border rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-muted/30 border-t-muted rounded-full animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </>
      )}
    </button>
  )
}
