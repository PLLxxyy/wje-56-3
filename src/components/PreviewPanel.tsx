import { forwardRef } from 'react';
import { usePodcastStore } from '../store/usePodcastStore';
import { DarkPodcast } from './templates/DarkPodcast';
import { KnowledgeNote } from './templates/KnowledgeNote';
import { RetroTape } from './templates/RetroTape';
import { MinimalTimeline } from './templates/MinimalTimeline';
import { ExportButton } from './ExportButton';
import { Eye } from 'lucide-react';

interface PreviewPanelProps {
  exportRef: React.RefObject<HTMLDivElement>;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ exportRef }, ref) => {
    const { template, podcast, chapters, size } = usePodcastStore();

    const renderTemplate = () => {
      const props = { podcast, chapters, size };
      switch (template) {
        case 'dark':
          return <DarkPodcast {...props} />;
        case 'note':
          return <KnowledgeNote {...props} />;
        case 'retro':
          return <RetroTape {...props} />;
        case 'minimal':
          return <MinimalTimeline {...props} />;
        default:
          return <DarkPodcast {...props} />;
      }
    };

    const scale = size === 'portrait' ? 0.55 : 0.6;

    return (
      <div className="h-full flex flex-col p-6 bg-zinc-900/30">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg font-semibold text-white">实时预览</h2>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div
            className="relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              ref={exportRef}
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              }}
            >
              {renderTemplate()}
            </div>

            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl -z-10 blur-xl opacity-50" />
          </div>
        </div>

        <div className="mt-4">
          <ExportButton targetRef={exportRef as React.RefObject<HTMLDivElement>} />
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = 'PreviewPanel';
