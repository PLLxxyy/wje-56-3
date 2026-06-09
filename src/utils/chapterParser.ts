import { Chapter } from '../types';

const TIMESTAMP_PATTERN = /[\[\(]?(\d{1,2}:\d{2}(?::\d{2})?)[\]\)]?\s*[-:：\s]\s*(.+)/;

export function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
}

export function parseChapters(text: string): Chapter[] {
  const lines = text.split('\n').filter(line => line.trim());
  const chapters: Chapter[] = [];

  for (const line of lines) {
    const match = line.trim().match(TIMESTAMP_PATTERN);
    if (match) {
      const [, time, title] = match;
      chapters.push({
        id: `chapter-${Date.now()}-${chapters.length}`,
        time: time,
        seconds: timeToSeconds(time),
        title: title.trim(),
      });
    }
  }

  return chapters.sort((a, b) => a.seconds - b.seconds);
}

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
