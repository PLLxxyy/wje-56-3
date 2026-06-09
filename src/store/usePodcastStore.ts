import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardState, PodcastInfo, Chapter, TemplateType, SizeType } from '../types';
import { parseChapters } from '../utils/chapterParser';

const defaultPodcast: PodcastInfo = {
  name: '',
  episode: '',
  host: '',
  guest: '',
  cover: null,
};

interface PodcastStore extends CardState {
  setPodcast: (info: Partial<PodcastInfo>) => void;
  setRawChapterText: (text: string) => void;
  setChapters: (chapters: Chapter[]) => void;
  updateChapter: (id: string, updates: Partial<Chapter>) => void;
  removeChapter: (id: string) => void;
  addChapter: () => void;
  setTemplate: (template: TemplateType) => void;
  setSize: (size: SizeType) => void;
  reset: () => void;
}

const defaultRawText = `00:00 开场介绍
05:30 本期话题引入
15:20 深度讨论第一部分
32:45 嘉宾观点分享
48:10 听众问答环节
01:05:30 总结与下期预告`;

const initialChapters = parseChapters(defaultRawText);

export const usePodcastStore = create<PodcastStore>()(
  persist(
    (set) => ({
      podcast: defaultPodcast,
      chapters: initialChapters,
      template: 'dark',
      size: 'portrait',
      rawChapterText: defaultRawText,

      setPodcast: (info) =>
        set((state) => ({
          podcast: { ...state.podcast, ...info },
        })),

      setRawChapterText: (text) => {
        const chapters = parseChapters(text);
        set({ rawChapterText: text, chapters });
      },

      setChapters: (chapters) => set({ chapters }),

      updateChapter: (id, updates) =>
        set((state) => ({
          chapters: state.chapters.map((ch) =>
            ch.id === id ? { ...ch, ...updates } : ch
          ),
        })),

      removeChapter: (id) =>
        set((state) => ({
          chapters: state.chapters.filter((ch) => ch.id !== id),
        })),

      addChapter: () =>
        set((state) => ({
          chapters: [
            ...state.chapters,
            {
              id: `chapter-${Date.now()}`,
              time: '00:00',
              seconds: 0,
              title: '新章节',
            },
          ],
        })),

      setTemplate: (template) => set({ template }),

      setSize: (size) => set({ size }),

      reset: () =>
        set({
          podcast: defaultPodcast,
          chapters: [],
          template: 'dark',
          size: 'portrait',
          rawChapterText: '',
        }),
    }),
    {
      name: 'podcast-card-storage',
      partialize: (state) => ({
        podcast: state.podcast,
        rawChapterText: state.rawChapterText,
        chapters: state.chapters,
        template: state.template,
        size: state.size,
      }),
    }
  )
);
