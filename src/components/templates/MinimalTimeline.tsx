import { PodcastInfo, Chapter, SizeType } from '../../types';
import { getExportDimensions } from '../../utils/exportImage';

interface MinimalTimelineProps {
  podcast: PodcastInfo;
  chapters: Chapter[];
  size: SizeType;
}

export function MinimalTimeline({ podcast, chapters, size }: MinimalTimelineProps) {
  const dims = getExportDimensions(size);

  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{ width: dims.width, height: dims.height }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-zinc-100 to-transparent rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-zinc-100 to-transparent rounded-full translate-y-24 -translate-x-24" />

      <div className="relative z-10 h-full flex flex-col p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            {podcast.episode && (
              <div className="text-xs tracking-[0.3em] text-zinc-400 font-light mb-2">
                {podcast.episode}
              </div>
            )}
            <h1 className="text-3xl font-extralight text-zinc-800 tracking-tight leading-tight">
              {podcast.name || 'Podcast Title'}
            </h1>
          </div>
          {podcast.cover && (
            <img
              src={podcast.cover}
              alt="封面"
              className="w-16 h-16 rounded object-cover ml-4"
            />
          )}
        </div>

        {(podcast.host || podcast.guest) && (
          <div className="flex flex-wrap gap-4 mb-8 text-sm text-zinc-500 font-light">
            {podcast.host && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-zinc-300" />
                <span>Host: {podcast.host}</span>
              </div>
            )}
            {podcast.guest && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-px bg-zinc-300" />
                <span>Guest: {podcast.guest}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex-1 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200" />
          
          <div className="space-y-6 overflow-y-auto h-full pr-2">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="relative flex items-start pl-12 group"
              >
                <div className="absolute left-0 top-1 flex items-center">
                  <div className={`w-3 h-3 rounded-full border-2 transition-all ${
                    index === 0 ? 'bg-zinc-800 border-zinc-800' : 'bg-white border-zinc-300 group-hover:border-zinc-500'
                  }`} />
                  <div className="w-4 h-px bg-zinc-200" />
                </div>
                
                <div className="flex-1">
                  <div className="text-xs font-mono text-zinc-400 mb-1 tracking-wide">
                    {chapter.time}
                  </div>
                  <p className="text-zinc-700 font-light leading-relaxed">
                    {chapter.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="font-light tracking-wider">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="font-mono">
              {chapters.length} CHAPTERS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
