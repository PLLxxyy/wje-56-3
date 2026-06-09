import { PodcastInfo, Chapter, SizeType } from '../../types';
import { getExportDimensions } from '../../utils/exportImage';

interface KnowledgeNoteProps {
  podcast: PodcastInfo;
  chapters: Chapter[];
  size: SizeType;
}

export function KnowledgeNote({ podcast, chapters, size }: KnowledgeNoteProps) {
  const dims = getExportDimensions(size);

  return (
    <div
      className="relative overflow-hidden font-serif"
      style={{ width: dims.width, height: dims.height }}
    >
      <div className="absolute inset-0 bg-amber-50" />
      
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #cbd5e1 28px)',
          backgroundSize: '100% 28px'
        }}
      />
      
      <div className="absolute left-16 top-0 bottom-0 w-px bg-red-300/50" />

      <div className="absolute top-4 right-4 transform rotate-3">
        <div className="px-3 py-1 bg-yellow-200 shadow-md border border-yellow-300">
          <span className="text-xs text-yellow-800 font-bold">📝 学习笔记</span>
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col p-8 pl-20">
        {podcast.cover && (
          <div className="mb-6">
            <div className="relative inline-block transform -rotate-1">
              <img
                src={podcast.cover}
                alt="封面"
                className="w-24 h-24 rounded object-cover shadow-lg border-4 border-white"
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="text-sm text-blue-800 font-bold mb-1 tracking-wide">
            {podcast.episode || '第一期'}
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 mb-2 leading-tight" style={{ fontFamily: 'serif' }}>
            {podcast.name || '播客标题'}
          </h1>
          {(podcast.host || podcast.guest) && (
            <div className="flex flex-wrap gap-2 text-sm">
              {podcast.host && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-zinc-500">✎</span>
                  <span className="text-zinc-600">{podcast.host}</span>
                </span>
              )}
              {podcast.guest && (
                <span className="inline-flex items-center gap-1">
                  <span className="text-zinc-500">👤</span>
                  <span className="text-zinc-600">{podcast.guest}</span>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="w-full h-0.5 bg-blue-200 mb-4" />

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="flex items-start gap-3 relative"
            >
              <span className="text-blue-600 font-bold w-6 text-center">
                {index + 1}.
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-mono rounded">
                    {chapter.time}
                  </span>
                </div>
                <p className="text-zinc-700 mt-1 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {chapter.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-amber-200">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="transform -rotate-1" style={{ fontFamily: 'cursive' }}>
              — 于 {new Date().toLocaleDateString('zh-CN')} 整理
            </span>
            <span className="text-red-500">★ {chapters.length} 个要点</span>
          </div>
        </div>
      </div>
    </div>
  );
}
