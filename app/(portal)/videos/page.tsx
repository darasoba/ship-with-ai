import {
  VIDEOS,
  VIDEO_CATEGORIES,
  VIDEO_CATEGORY_LABELS,
  CURRICULUM_SECTIONS,
  getVideoThumbnail,
  getVideoUrl,
  type VideoCategory,
  type CurriculumVideo,
} from '@/lib/videos'

export const metadata = {
  title: 'Videos — Ship With AI',
}

function VideoCard({ id, title, channel }: CurriculumVideo & { channel?: string }) {
  return (
    <a
      href={getVideoUrl(id)}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-border bg-surface overflow-hidden hover:border-accent/40 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden bg-surface-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getVideoThumbnail(id)}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
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
          {title}
        </p>
        {channel && <p className="text-xs text-muted mt-1">{channel}</p>}
      </div>
    </a>
  )
}

export default function VideosPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Videos</h1>
        <p className="text-muted mt-1">
          Curated videos aligned to each part of the curriculum.
        </p>
      </div>

      {/* Curriculum-aligned sections */}
      {CURRICULUM_SECTIONS.map((section) => (
        <section key={section.week}>
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {section.label}
          </h2>
          <div className="space-y-8">
            {section.topics.map((topic) => (
              <div key={topic.topic}>
                <h3 className="text-sm font-medium text-muted mb-3 uppercase tracking-wide">
                  {topic.topic}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {topic.videos.map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* More Videos */}
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-6">More Videos</h2>
        <div className="space-y-10">
          {VIDEO_CATEGORIES.map((category: VideoCategory) => {
            const categoryVideos = VIDEOS.filter((v) => v.category === category)
            if (categoryVideos.length === 0) return null

            return (
              <div key={category}>
                <h3 className="text-sm font-medium text-muted mb-3 uppercase tracking-wide">
                  {VIDEO_CATEGORY_LABELS[category]}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryVideos.map((video) => (
                    <VideoCard key={video.id} {...video} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
