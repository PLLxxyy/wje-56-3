import { PodcastForm } from './PodcastForm';
import { ChapterInput } from './ChapterInput';
import { CoverUpload } from './CoverUpload';
import { TemplateSelector } from './TemplateSelector';
import { SizeSelector } from './SizeSelector';
import { RotateCcw } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';

export function EditorPanel() {
  const { reset } = usePodcastStore();

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 custom-scrollbar">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">播客摘要卡片生成器</h1>
          <p className="text-sm text-zinc-400 mt-1">快速生成精美的播客章节分享卡片</p>
        </div>
        <button
          onClick={reset}
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          title="重置所有内容"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <PodcastForm />
        </div>

        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <CoverUpload />
        </div>

        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <ChapterInput />
        </div>

        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <TemplateSelector />
        </div>

        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
          <SizeSelector />
        </div>
      </div>

      <div className="text-xs text-zinc-500 text-center pt-4 border-t border-zinc-800">
        <p>💡 所有数据仅保存在本地浏览器，不会上传到服务器</p>
      </div>
    </div>
  );
}
