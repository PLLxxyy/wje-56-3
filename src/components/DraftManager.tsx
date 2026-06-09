import { useState, useRef, useEffect } from 'react';
import { FileText, Plus, Trash2, Pencil, Check, X, ChevronDown } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';

export function DraftManager() {
  const {
    drafts,
    currentDraftId,
    createNewDraft,
    switchDraft,
    deleteDraft,
    renameDraft,
  } = usePodcastStore();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDraft = drafts.find((d) => d.id === currentDraftId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setEditingId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingId]);

  const handleRename = (id: string) => {
    if (editName.trim()) {
      renameDraft(id, editName.trim());
    }
    setEditingId(null);
    setEditName('');
  };

  const handleStartRename = (draft: { id: string; name: string }) => {
    setEditingId(draft.id);
    setEditName(draft.name);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-300">草稿管理</span>
          <span className="text-xs text-zinc-500">({drafts.length})</span>
        </div>
        <button
          onClick={() => createNewDraft()}
          className="flex items-center gap-1 px-2 py-1 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
          title="新建草稿"
        >
          <Plus className="w-3.5 h-3.5" />
          新建
        </button>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-left transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">
              {currentDraft?.name || '未选择草稿'}
            </div>
            <div className="text-xs text-zinc-500">
              更新于 {currentDraft ? formatDate(currentDraft.updatedAt) : '-'}
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className={`px-3 py-2 border-b border-zinc-800 last:border-b-0 ${
                  draft.id === currentDraftId ? 'bg-indigo-500/10' : 'hover:bg-zinc-800/50'
                }`}
              >
                {editingId === draft.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(draft.id);
                        if (e.key === 'Escape') {
                          setEditingId(null);
                          setEditName('');
                        }
                      }}
                      className="flex-1 px-2 py-1 text-sm bg-zinc-800 text-white border border-zinc-600 rounded focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleRename(draft.id)}
                      className="p-1 text-green-400 hover:text-green-300"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditName('');
                      }}
                      className="p-1 text-zinc-400 hover:text-zinc-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        switchDraft(draft.id);
                        setIsOpen(false);
                      }}
                      className="flex-1 text-left min-w-0"
                    >
                      <div
                        className={`text-sm font-medium truncate ${
                          draft.id === currentDraftId ? 'text-indigo-400' : 'text-white'
                        }`}
                      >
                        {draft.name}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {formatDate(draft.updatedAt)}
                      </div>
                    </button>
                    <button
                      onClick={() => handleStartRename(draft)}
                      className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 rounded transition-colors"
                      title="重命名"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteDraft(draft.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="删除"
                      disabled={drafts.length <= 1}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {drafts.length <= 1 && (
        <p className="text-xs text-zinc-600 mt-2">至少需要保留一个草稿</p>
      )}
    </div>
  );
}
