import { Palette } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';
import { TemplateType } from '../types';

const templates: { id: TemplateType; name: string; preview: string }[] = [
  { id: 'dark', name: '深色播客风', preview: 'bg-gradient-to-br from-zinc-900 via-purple-900/20 to-zinc-900' },
  { id: 'note', name: '知识笔记风', preview: 'bg-amber-50' },
  { id: 'retro', name: '复古磁带风', preview: 'bg-gradient-to-br from-orange-200 to-amber-300' },
  { id: 'minimal', name: '极简时间轴风', preview: 'bg-white' },
];

export function TemplateSelector() {
  const { template, setTemplate } = usePodcastStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        卡片模板
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`relative p-3 rounded-xl border-2 transition-all ${
              template === t.id
                ? 'border-purple-500 ring-2 ring-purple-500/30'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className={`h-16 rounded-lg ${t.preview} mb-2 overflow-hidden`}>
              <div className="w-full h-full flex items-center justify-center">
                {t.id === 'dark' && (
                  <div className="w-full h-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20" />
                )}
                {t.id === 'note' && (
                  <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 19px, #94a3b8 20px)' }} />
                )}
                {t.id === 'retro' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border-4 border-amber-600" />
                )}
                {t.id === 'minimal' && (
                  <div className="w-24 h-0.5 bg-zinc-300 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-800" />
                    <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-800" />
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs text-zinc-300">{t.name}</span>
            {template === t.id && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
