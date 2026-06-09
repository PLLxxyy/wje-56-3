import { Maximize2 } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';
import { SizeType } from '../types';

const sizes: { id: SizeType; name: string; desc: string }[] = [
  { id: 'portrait', name: '竖版 9:16', desc: '微博、小红书' },
  { id: 'square', name: '方形 1:1', desc: '朋友圈、Instagram' },
];

export function SizeSelector() {
  const { size, setSize } = usePodcastStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
        <Maximize2 className="w-4 h-4" />
        卡片尺寸
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => setSize(s.id)}
            className={`p-3 rounded-xl border-2 transition-all text-left ${
              size === s.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`border-2 ${
                  size === s.id ? 'border-purple-400' : 'border-zinc-500'
                } rounded-sm ${
                  s.id === 'portrait' ? 'w-4 h-7' : 'w-5 h-5'
                }`}
              />
              <span className={`text-sm font-medium ${size === s.id ? 'text-purple-300' : 'text-zinc-300'}`}>
                {s.name}
              </span>
            </div>
            <p className="text-xs text-zinc-500 ml-6">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
