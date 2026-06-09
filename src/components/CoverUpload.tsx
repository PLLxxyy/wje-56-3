import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';

export function CoverUpload() {
  const { podcast, setPodcast } = usePodcastStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPodcast({ cover: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setPodcast({ cover: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        封面图片
      </h3>

      {podcast.cover ? (
        <div className="relative group">
          <img
            src={podcast.cover}
            alt="封面预览"
            className="w-full h-40 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragging
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-zinc-600 hover:border-zinc-500 bg-zinc-800/30'
          }`}
        >
          <Upload className={`w-8 h-8 mb-2 ${isDragging ? 'text-purple-400' : 'text-zinc-500'}`} />
          <p className="text-sm text-zinc-400">点击或拖拽上传封面</p>
          <p className="text-xs text-zinc-500 mt-1">支持 JPG、PNG 格式</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
