export type ScrollbarSize = 'thin' | 'medium' | 'thick';

export interface ScrollbarOptions {
  size?: ScrollbarSize;
  trackHidden?: boolean;
  presets?: ScrollbarPresets;
}