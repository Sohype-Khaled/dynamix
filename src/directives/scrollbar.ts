import type { Directive } from 'vue';
import type {ScrollbarOptions, ScrollbarSize} from "@/types/scroll";



function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function setScrollbarStyles(el: HTMLElement, options: ScrollbarOptions = {}) {
  const size = options.size ?? 'medium';
  const presets = options.presets ?? {};

  const sizeMap = {
    thin: { track: '4px', thumb: '3px' },
    medium: { track: '8px', thumb: '6px' },
    thick: { track: '12px', thumb: '10px' },
  };

  const config = sizeMap[size];

  el.style.setProperty('--scrollbar-track-width', config.track);
  el.style.setProperty('--scrollbar-thumb-width', config.thumb);
  el.style.setProperty('--scrollbar-track-color', options.trackHidden ? 'transparent' : (presets.trackColor ?? '#f1f1f1'));
  el.style.setProperty('--scrollbar-thumb-color', presets.thumbColor ?? '#c1c1c1');
  el.style.setProperty('--scrollbar-thumb-hover-color', presets.thumbHoverColor ?? '#a8a8a8');
  el.style.setProperty('--scrollbar-track-radius', `${presets.thumbRadius ?? 4}px`);
  el.style.setProperty('--scrollbar-thumb-radius', `${presets.thumbRadius ?? 4}px`);

  el.style.scrollbarWidth = size === 'thin' ? 'thin' : 'auto';
  el.style.scrollbarColor = `${presets.thumbColor ?? '#c1c1c1'} ${options.trackHidden ? 'transparent' : (presets.trackColor ?? '#f1f1f1')}`;
  el.style.scrollBehavior = 'smooth';

  el.setAttribute('data-scrollbar', 'true');
  el.style.overflow = 'auto';

  if (!document.head.querySelector('[data-injected-scrollbar]')) {
    const style = document.createElement('style');
    style.innerHTML = `
      [data-scrollbar]::-webkit-scrollbar {
        width: var(--scrollbar-track-width);
        height: var(--scrollbar-track-width);
      }
      [data-scrollbar]::-webkit-scrollbar-track {
        background: var(--scrollbar-track-color);
        border-radius: var(--scrollbar-track-radius);
      }
      [data-scrollbar]::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-color);
        border-radius: var(--scrollbar-thumb-radius);
        min-height: var(--scrollbar-thumb-width);
      }
      [data-scrollbar]::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover-color);
      }
      [data-scrollbar]::-webkit-scrollbar-corner {
        background: transparent !important;
      }
    `;
    style.setAttribute('data-injected-scrollbar', 'true');
    document.head.appendChild(style);
  }
}

export const vScrollbar: Directive<HTMLElement, ScrollbarOptions | ScrollbarSize | undefined> = {
  mounted(el, binding) {
    if (binding.value === undefined) return;
    const value = isString(binding.value)
      ? { size: binding.value }
      : binding.value;
    setScrollbarStyles(el, value);
  },
  updated(el, binding) {
    if (binding.value === undefined) return;
    const value = isString(binding.value)
      ? { size: binding.value }
      : binding.value;
    setScrollbarStyles(el, value);
  },
};
