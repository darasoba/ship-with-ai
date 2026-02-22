import {
  VIDEOS,
  VIDEO_CATEGORIES,
  VIDEO_CATEGORY_LABELS,
  CURRICULUM_SECTIONS,
  type VideoCategory,
} from '@/lib/videos'
import { VideoCard } from '@/components/ui/video-card'

export const metadata = {
  title: 'Videos — Ship With AI',
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
