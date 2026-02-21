import {
  VIDEOS,
  VIDEO_CATEGORIES,
  VIDEO_CATEGORY_LABELS,
  getVideoThumbnail,
  getVideoUrl,
  type VideoCategory,
} from '@/lib/videos'

export const metadata = {
  title: 'Videos — Ship With AI',
}

export default function VideosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Videos</h1>
        <p className="text-muted mt-1">
          Curated YouTube videos covering everything in the curriculum.
        </p>
      </div>

      {VIDEO_CATEGORIES.map((category: VideoCategory) => {
        const categoryVideos = VIDEOS.filter((v) => v.category === category)
        if (categoryVideos.length === 0) return null

        return (
          <section key={category}>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {VIDEO_CATEGORY_LABELS[category]}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryVideos.map((video) => (
                <a
                  key={video.id}
                  href={getVideoUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface-raised">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getVideoThumbnail(video.id)}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted mt-1">{video.channel}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
