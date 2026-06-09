import { Mic, User, Users, Hash } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';

export function PodcastForm() {
  const { podcast, setPodcast } = usePodcastStore();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
        <Mic className="w-4 h-4" />
        播客信息
      </h3>
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">播客名称</label>
          <input
            type="text"
            value={podcast.name}
            onChange={(e) => setPodcast({ name: e.target.value })}
            placeholder="例如：科技前沿"
            className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
              <Hash className="w-3 h-3" /> 集数
            </label>
            <input
              type="text"
              value={podcast.episode}
              onChange={(e) => setPodcast({ episode: e.target.value })}
              placeholder="EP.123"
              className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> 主持人
            </label>
            <input
              type="text"
              value={podcast.host}
              onChange={(e) => setPodcast({ host: e.target.value })}
              placeholder="张三"
              className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
            <Users className="w-3 h-3" /> 嘉宾
          </label>
          <input
            type="text"
            value={podcast.guest}
            onChange={(e) => setPodcast({ guest: e.target.value })}
            placeholder="李四、王五"
            className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
