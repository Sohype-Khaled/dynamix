import type { Directive } from 'vue';
import type { TimeUpdateElement } from '@/types/directives';

function formatTime(date: Date, now: Date, onlyTime = false): string {
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isSameYear = date.getFullYear() === now.getFullYear();

  if (!onlyTime) {
    if (diffMins < 1) return 'Just now';

    if (!isToday && !isYesterday) {
      return date.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: isSameYear ? undefined : 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }
  }

  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export const vTimeUpdate: Directive = {
  mounted(el: HTMLElement, binding) {
    const element = el as TimeUpdateElement;
    const value = binding.value;
    const datetime = typeof value === 'object' ? value.datetime : value;
    const onlyTime = binding.modifiers.time;
    const isCustom = binding.modifiers.custom;
    const customFormatFn = typeof value === 'object' ? value.format : null;

    if (!datetime) {
      console.warn('A datetime value is required for v-time-update.');
      return;
    }

    const date = new Date(datetime);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const render = () => {
      const now = new Date();
      element.textContent = isCustom && typeof customFormatFn === 'function'
        ? customFormatFn(date, now)
        : formatTime(date, now, onlyTime);
    };

    render();

    if (isToday) {
      element.__timeUpdateInterval = setInterval(render, 60000);
    }
  },

  updated(el: HTMLElement, binding) {
    const element = el as TimeUpdateElement;
    const value = binding.value;
    const datetime = typeof value === 'object' ? value.datetime : value;
    const onlyTime = binding.modifiers.time;
    const isCustom = binding.modifiers.custom;
    const customFormatFn = typeof value === 'object' ? value.format : null;

    if (datetime) {
      const date = new Date(datetime);
      const now = new Date();
      element.textContent = isCustom && typeof customFormatFn === 'function'
        ? customFormatFn(date, now)
        : formatTime(date, now, onlyTime);
    }
  },

  unmounted(el: HTMLElement) {
    const element = el as TimeUpdateElement;
    if (element.__timeUpdateInterval) {
      clearInterval(element.__timeUpdateInterval);
    }
  },
};
