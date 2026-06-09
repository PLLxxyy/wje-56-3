import { List, Plus, Trash2 } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';
import { timeToSeconds } from '../utils/chapterParser';

export function ChapterInput() {
  const { rawChapterText, chapters, setRawChapterText, updateChapter, removeChapter, addChapter } =
    usePodcastStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
        <List className="w-4 h-4" />
        章节列表
      </h3>
      
      <div>
        <label className="block text-xs text-zinc-400 mb-1">粘贴带时间戳的章节</label>
        <textarea
          value={rawChapterText}
          onChange={(e) => setRawChapterText(e.target.value)}
          placeholder={`00:00 开场\n05:30 话题一\n15:20 话题二`}
          rows={5}
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className="flex items-center gap-2 p-2 bg-zinc-800/30 rounded-lg border border-zinc-700/50 group"
          >
            <span className="text-xs text-zinc-500 w-5">{index + 1}</span>
            <input
              type="text"
              value={chapter.time}
              onChange={(e) => {
                const newTime = e.target.value;
                updateChapter(chapter.id, {
                  time: newTime,
                  seconds: timeToSeconds(newTime),
                });
              }}
              className="w-20 px-2 py-1 bg-zinc-900/50 border border-zinc-600 rounded text-white text-sm font-mono focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              value={chapter.title}
              onChange={(e) => updateChapter(chapter.id, { title: e.target.value })}
              className="flex-1 px-2 py-1 bg-zinc-900/50 border border-zinc-600 rounded text-white text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => removeChapter(chapter.id)}
              className="p-1 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addChapter}
        className="w-full py-2 border border-dashed border-zinc-600 rounded-lg text-zinc-400 hover:text-purple-400 hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Plus className="w-4 h-4" />
        添加章节
      </button>
    </div>
  );
}
