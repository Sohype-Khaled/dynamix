import type {DirectiveBinding, ObjectDirective} from 'vue';
import type {RippleElement} from "@/types/directives.d.ts";

export const vRipple: ObjectDirective<HTMLElement, string | boolean | undefined> = {
  mounted(el: RippleElement, binding: DirectiveBinding<string | boolean | undefined>) {
    el.style.position ||= 'relative';
    el.style.overflow = 'hidden';

    const handler = (event: MouseEvent) => {
      // Skip if disabled
      if ((el as HTMLButtonElement).disabled) return;

      // Skip if explicitly disabled via binding
      if (binding.value === false) return;

      const ripple = document.createElement('span');
      const diameter = Math.max(el.clientWidth, el.clientHeight);
      const radius = diameter / 2;

      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - radius;
      const y = event.clientY - rect.top - radius;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'dx-ripple';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'dx-ripple-animation 600ms linear';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '0';

      // Color
      if (typeof binding.value === 'string') {
        ripple.style.backgroundColor = binding.value;
      } else {
        ripple.style.backgroundColor = 'rgba(255,255,255,0.3)';
      }

      el.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    };

    el.addEventListener('click', handler);
    el._rippleHandler = handler; // store reference for cleanup
  },

  unmounted(el: RippleElement) {
    el.removeEventListener('click', el._rippleHandler!);
    delete el._rippleHandler;
  }
};
