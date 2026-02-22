'use client'

import { useState } from 'react'
import { getVideoThumbnail, getVideoUrl } from '@/lib/videos'

interface VideoCardProps {
  id: string
  title: string
  channel?: string
}

export function VideoCard({ id, title, channel }: VideoCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={getVideoUrl(id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-raised">
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-raised">
            <svg className="w-10 h-10 text-muted/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getVideoThumbnail(id)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        )}
        {!imgError && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
          {title}
        </p>
        {channel && <p className="text-xs text-muted mt-1">{channel}</p>}
      </div>
    </a>
  )
}
