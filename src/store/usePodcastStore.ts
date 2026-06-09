import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardState, PodcastInfo, Chapter, TemplateType, SizeType, Draft } from '../types';
import { parseChapters } from '../utils/chapterParser';

const defaultPodcast: PodcastInfo = {
  name: '',
  episode: '',
  host: '',
  guest: '',
  cover: null,
};

interface PodcastStore extends CardState {
  drafts: Draft[];
  currentDraftId: string | null;
  setPodcast: (info: Partial<PodcastInfo>) => void;
  setRawChapterText: (text: string) => void;
  setChapters: (chapters: Chapter[]) => void;
  updateChapter: (id: string, updates: Partial<Chapter>) => void;
  removeChapter: (id: string) => void;
  addChapter: () => void;
  setTemplate: (template: TemplateType) => void;
  setSize: (size: SizeType) => void;
  reset: () => void;
  createNewDraft: (name?: string) => void;
  switchDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  renameDraft: (id: string, name: string) => void;
  saveCurrentDraft: () => void;
}

const defaultRawText = `00:00 开场介绍
05:30 本期话题引入
15:20 深度讨论第一部分
32:45 嘉宾观点分享
48:10 听众问答环节
01:05:30 总结与下期预告`;

const initialChapters = parseChapters(defaultRawText);

const createDraft = (name: string, state?: Partial<CardState>): Draft => {
  const now = Date.now();
  return {
    id: `draft-${now}`,
    name,
    createdAt: now,
    updatedAt: now,
    podcast: state?.podcast ?? { ...defaultPodcast },
    chapters: state?.chapters ?? initialChapters,
    template: state?.template ?? 'dark',
    size: state?.size ?? 'portrait',
    rawChapterText: state?.rawChapterText ?? defaultRawText,
  };
};

const initialDraft = createDraft('草稿 1');

const getCurrentCardState = (state: PodcastStore): CardState => ({
  podcast: state.podcast,
  chapters: state.chapters,
  template: state.template,
  size: state.size,
  rawChapterText: state.rawChapterText,
});

export const usePodcastStore = create<PodcastStore>()(
  persist(
    (set, get) => ({
      podcast: initialDraft.podcast,
      chapters: initialDraft.chapters,
      template: initialDraft.template,
      size: initialDraft.size,
      rawChapterText: initialDraft.rawChapterText,
      drafts: [initialDraft],
      currentDraftId: initialDraft.id,

      setPodcast: (info) =>
        set((state) => {
          const podcast = { ...state.podcast, ...info };
          if (state.currentDraftId) {
            return {
              podcast,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, podcast, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { podcast };
        }),

      setRawChapterText: (text) => {
        const chapters = parseChapters(text);
        set((state) => {
          if (state.currentDraftId) {
            return {
              rawChapterText: text,
              chapters,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, rawChapterText: text, chapters, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { rawChapterText: text, chapters };
        });
      },

      setChapters: (chapters) =>
        set((state) => {
          if (state.currentDraftId) {
            return {
              chapters,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, chapters, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { chapters };
        }),

      updateChapter: (id, updates) =>
        set((state) => {
          const chapters = state.chapters.map((ch) =>
            ch.id === id ? { ...ch, ...updates } : ch
          );
          if (state.currentDraftId) {
            return {
              chapters,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, chapters, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { chapters };
        }),

      removeChapter: (id) =>
        set((state) => {
          const chapters = state.chapters.filter((ch) => ch.id !== id);
          if (state.currentDraftId) {
            return {
              chapters,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, chapters, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { chapters };
        }),

      addChapter: () =>
        set((state) => {
          const chapters = [
            ...state.chapters,
            {
              id: `chapter-${Date.now()}`,
              time: '00:00',
              seconds: 0,
              title: '新章节',
            },
          ];
          if (state.currentDraftId) {
            return {
              chapters,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, chapters, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { chapters };
        }),

      setTemplate: (template) =>
        set((state) => {
          if (state.currentDraftId) {
            return {
              template,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, template, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { template };
        }),

      setSize: (size) =>
        set((state) => {
          if (state.currentDraftId) {
            return {
              size,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, size, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return { size };
        }),

      reset: () =>
        set((state) => {
          const resetState = {
            podcast: defaultPodcast,
            chapters: [] as Chapter[],
            template: 'dark' as TemplateType,
            size: 'portrait' as SizeType,
            rawChapterText: '',
          };
          if (state.currentDraftId) {
            return {
              ...resetState,
              drafts: state.drafts.map((d) =>
                d.id === state.currentDraftId
                  ? { ...d, ...resetState, updatedAt: Date.now() }
                  : d
              ),
            };
          }
          return resetState;
        }),

      createNewDraft: (name) => {
        const state = get();
        const draftNumber = state.drafts.length + 1;
        const draftName = name || `草稿 ${draftNumber}`;
        const newDraft = createDraft(draftName);
        set({
          drafts: [...state.drafts, newDraft],
          currentDraftId: newDraft.id,
          podcast: newDraft.podcast,
          chapters: newDraft.chapters,
          template: newDraft.template,
          size: newDraft.size,
          rawChapterText: newDraft.rawChapterText,
        });
      },

      switchDraft: (id) => {
        const state = get();
        const draft = state.drafts.find((d) => d.id === id);
        if (!draft) return;
        set({
          currentDraftId: draft.id,
          podcast: draft.podcast,
          chapters: draft.chapters,
          template: draft.template,
          size: draft.size,
          rawChapterText: draft.rawChapterText,
        });
      },

      deleteDraft: (id) => {
        const state = get();
        if (state.drafts.length <= 1) return;
        const newDrafts = state.drafts.filter((d) => d.id !== id);
        let newCurrentId = state.currentDraftId;
        if (state.currentDraftId === id) {
          const targetIndex = Math.max(0, state.drafts.findIndex((d) => d.id === id) - 1);
          newCurrentId = newDrafts[targetIndex]?.id ?? newDrafts[0].id;
          const targetDraft = newDrafts.find((d) => d.id === newCurrentId)!;
          set({
            drafts: newDrafts,
            currentDraftId: newCurrentId,
            podcast: targetDraft.podcast,
            chapters: targetDraft.chapters,
            template: targetDraft.template,
            size: targetDraft.size,
            rawChapterText: targetDraft.rawChapterText,
          });
        } else {
          set({ drafts: newDrafts });
        }
      },

      renameDraft: (id, name) =>
        set((state) => ({
          drafts: state.drafts.map((d) =>
            d.id === id ? { ...d, name, updatedAt: Date.now() } : d
          ),
        })),

      saveCurrentDraft: () => {
        const state = get();
        if (!state.currentDraftId) return;
        const cardState = getCurrentCardState(state);
        set({
          drafts: state.drafts.map((d) =>
            d.id === state.currentDraftId
              ? { ...d, ...cardState, updatedAt: Date.now() }
              : d
          ),
        });
      },
    }),
    {
      name: 'podcast-card-storage',
      partialize: (state) => ({
        podcast: state.podcast,
        rawChapterText: state.rawChapterText,
        chapters: state.chapters,
        template: state.template,
        size: state.size,
        drafts: state.drafts,
        currentDraftId: state.currentDraftId,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const s = state as PodcastStore;
        if (!s.drafts || s.drafts.length === 0) {
          const cardState: CardState = {
            podcast: s.podcast,
            chapters: s.chapters,
            template: s.template,
            size: s.size,
            rawChapterText: s.rawChapterText,
          };
          const initialDraft = createDraft('草稿 1', cardState);
          s.drafts = [initialDraft];
          s.currentDraftId = initialDraft.id;
        } else if (!s.currentDraftId) {
          s.currentDraftId = s.drafts[0].id;
        }
      },
    }
  )
);
