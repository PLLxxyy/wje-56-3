export interface Chapter {
  id: string;
  time: string;
  seconds: number;
  title: string;
}

export interface PodcastInfo {
  name: string;
  episode: string;
  host: string;
  guest: string;
  cover: string | null;
}

export type TemplateType = 'dark' | 'note' | 'retro' | 'minimal';
export type SizeType = 'portrait' | 'square';

export interface CardState {
  podcast: PodcastInfo;
  chapters: Chapter[];
  template: TemplateType;
  size: SizeType;
  rawChapterText: string;
}
