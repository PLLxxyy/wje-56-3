import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';
import { exportCardAsImage } from '../utils/exportImage';

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export function ExportButton({ targetRef }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false);
  const { size, podcast } = usePodcastStore();

  const handleExport = async () => {
    if (!targetRef.current) return;

    setExporting(true);
    try {
      const filename = podcast.name
        ? `${podcast.name}-${podcast.episode || 'card'}`.replace(/\s+/g, '-')
        : 'podcast-card';
      await exportCardAsImage(targetRef.current, size, filename);
    } catch (error) {
      console.error('导出失败:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {exporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          生成中...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          导出图片
        </>
      )}
    </button>
  );
}
