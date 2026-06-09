import { PodcastInfo, Chapter, SizeType } from '../../types';
import { getExportDimensions } from '../../utils/exportImage';

interface DarkPodcastProps {
  podcast: PodcastInfo;
  chapters: Chapter[];
  size: SizeType;
}

export function DarkPodcast({ podcast, chapters, size }: DarkPodcastProps) {
  const dims = getExportDimensions(size);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: dims.width, height: dims.height }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-purple-950/30 to-zinc-950" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
        }} />
      </div>

      <div className="absolute top-10 left-0 right-0 flex justify-center gap-1 opacity-60">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
            style={{
              height: `${Math.random() * 30 + 10}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.8 + Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col p-8">
        {podcast.cover && (
          <div className="relative mx-auto mb-6">
            <img
              src={podcast.cover}
              alt="封面"
              className="w-32 h-32 rounded-xl object-cover shadow-2xl shadow-purple-500/30 border border-purple-500/30"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl -z-10 opacity-75 blur-md" />
          </div>
        )}

        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-3">
            <span className="text-xs text-purple-300 font-mono tracking-wider">
              {podcast.episode || 'EPISODE'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            {podcast.name || '播客名称'}
          </h1>
          {(podcast.host || podcast.guest) && (
            <p className="text-sm text-zinc-400">
              {podcast.host && `主持人: ${podcast.host}`}
              {podcast.host && podcast.guest && ' · '}
              {podcast.guest && `嘉宾: ${podcast.guest}`}
            </p>
          )}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-6" />

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-start gap-3 group"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-purple-400 w-14 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-center">
                  {chapter.time}
                </span>
                {index < chapters.length - 1 && (
                  <div className="w-px h-full min-h-[24px] bg-gradient-to-b from-purple-500/50 to-transparent" />
                )}
              </div>
              <div className="flex-1 pb-3">
                <p className="text-sm text-zinc-200 leading-relaxed group-hover:text-white transition-colors">
                  {chapter.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-zinc-500 font-mono">LIVE</span>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              {chapters.length} 个章节
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
