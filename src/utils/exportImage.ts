import html2canvas from 'html2canvas';
import { SizeType } from '../types';

export async function exportCardAsImage(
  element: HTMLElement,
  size: SizeType,
  filename: string = 'podcast-card'
): Promise<void> {
  const scale = size === 'portrait' ? 2.25 : 2;
  
  const canvas = await html2canvas(element, {
    scale: scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
}

export function getExportDimensions(size: SizeType): { width: number; height: number } {
  switch (size) {
    case 'portrait':
      return { width: 480, height: 854 };
    case 'square':
      return { width: 540, height: 540 };
    default:
      return { width: 480, height: 854 };
  }
}
