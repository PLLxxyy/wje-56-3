import { useRef } from 'react';
import { EditorPanel } from '../components/EditorPanel';
import { PreviewPanel } from '../components/PreviewPanel';

export default function Home() {
  const exportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-900/10 via-transparent to-transparent" />
      
      <div className="relative h-screen flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
          <EditorPanel />
        </div>
        
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full overflow-hidden">
          <PreviewPanel exportRef={exportRef} ref={exportRef} />
        </div>
      </div>
    </div>
  );
}
