import { PodcastInfo, Chapter, SizeType } from '../../types';
import { getExportDimensions } from '../../utils/exportImage';

interface RetroTapeProps {
  podcast: PodcastInfo;
  chapters: Chapter[];
  size: SizeType;
}

export function RetroTape({ podcast, chapters, size }: RetroTapeProps) {
  const dims = getExportDimensions(size);

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: dims.width, height: dims.height }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-200 to-orange-300" />
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3h1v1H1V3zm2-2h1v1H3V1z' fill='%23000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 h-full flex flex-col p-6">
        <div className="bg-zinc-800 rounded-2xl p-4 mb-6 shadow-2xl">
          <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 rounded-xl p-4">
            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-600 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-zinc-400" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-500 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="flex-1 h-12 bg-zinc-950 rounded flex items-center justify-center overflow-hidden">
                <div className="whitespace-nowrap text-amber-400 font-mono text-sm animate-marquee">
                  ▶ NOW PLAYING: {podcast.name || 'RETRO PODCAST'} {podcast.episode || ''}
                </div>
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-600 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-zinc-400" />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-500 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            
            {podcast.cover && (
              <div className="flex justify-center">
                <img
                  src={podcast.cover}
                  alt="封面"
                  className="w-20 h-20 rounded object-cover border-2 border-amber-500"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4 mb-4 transform -rotate-1 shadow-lg">
          <div className="text-center">
            <div className="inline-block px-3 py-0.5 bg-red-500 text-white text-xs font-bold rounded mb-2">
              {podcast.episode || 'SIDE A'}
            </div>
            <h1 className="text-xl font-bold text-zinc-800 tracking-wide" style={{ fontFamily: 'monospace' }}>
              {podcast.name || 'RETRO MIX'}
            </h1>
            {(podcast.host || podcast.guest) && (
              <p className="text-xs text-zinc-600 mt-1" style={{ fontFamily: 'monospace' }}>
                {podcast.host} {podcast.guest && `feat. ${podcast.guest}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 bg-amber-50/80 rounded-lg p-3 border border-amber-300">
          {chapters.slice(0, 8).map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-orange-200 text-orange-800 text-xs font-bold rounded">
                {index + 1}
              </span>
              <span className="font-mono text-xs text-amber-700 w-14">
                {chapter.time}
              </span>
              <span className="flex-1 text-zinc-700 truncate" style={{ fontFamily: 'monospace' }}>
                {chapter.title}
              </span>
            </div>
          ))}
          {chapters.length > 8 && (
            <p className="text-xs text-zinc-500 text-center pt-2 border-t border-amber-200">
              ...还有 {chapters.length - 8} 个章节
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-amber-400/50 flex items-center justify-between">
          <div className="text-xs text-amber-800 font-mono">
            ⓒ {new Date().getFullYear()} TAPE RECORDS
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-700">
            <span>▶</span>
            <span>{chapters.length} TRACKS</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
