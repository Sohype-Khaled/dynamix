import type { Directive } from 'vue';
import type { TimeUpdateElement } from '@/types/directives';

/**
 * Format a given Date object to a user-friendly time string.
 */
function formatTime(date: Date, now: Date): string {
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isSameYear = date.getFullYear() === now.getFullYear();

  if (diffMins < 1) {
    return 'Just now';
  }

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

  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Vue directive for updating time-related content like "Just now", "10:30 AM", etc.
 */
export const vTimeUpdate: Directive = {
  mounted(el: HTMLElement, binding) {
    const element = el as TimeUpdateElement;
    const datetime = binding.value;

    if (!datetime) {
      console.warn('A datetime value is required for v-time-update.');
      return;
    }

    const updateTime = () => {
      const date = new Date(binding.value);
      const now = new Date();
      element.textContent = formatTime(date, now);
    };

    updateTime();
    element.__timeUpdateInterval = setInterval(updateTime, 60000);
  },

  updated(el: HTMLElement, binding) {
    if (binding.value === binding.oldValue) return;

    const datetime = binding.value;
    if (datetime) {
      const elementTime = new Date(datetime);
      el.textContent = formatTime(elementTime, new Date());
    }
  },

  unmounted(el: HTMLElement) {
    const element = el as TimeUpdateElement;
    if (element.__timeUpdateInterval) {
      clearInterval(element.__timeUpdateInterval);
    }
  },
};
