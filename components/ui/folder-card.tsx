import { HTMLAttributes } from 'react'
import { FolderIcon } from './folder-icon'

interface FolderCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  meta?: string
}

export function FolderCard({ title, description, meta, className = '', ...props }: FolderCardProps) {
  return (
    <div
      className={`group relative transition-transform duration-200 hover:-translate-y-1 ${className}`}
      {...props}
    >
      {/* Pixel-perfect folder SVG */}
      <FolderIcon className="w-full h-auto" />

      {/* Text overlay positioned on the front panel area */}
      <div className="absolute left-[12%] right-[6%] bottom-[8%] top-[50%] flex items-center justify-center pointer-events-none">
        <div className="text-left">
          <h3 className="font-semibold text-white/90 text-sm leading-snug">{title}</h3>
          <p className="text-[12px] text-white/50 mt-1.5 line-clamp-2 leading-relaxed">{description}</p>
          {meta && (
            <p className="text-[11px] text-white/30 mt-2">{meta}</p>
          )}
        </div>
      </div>
    </div>
  )
}
