import {computed, markRaw, ref, watch} from "vue";

type OverlayType = "dialog" | "overlay" | "confirmation";

interface OverlayOptions {
  props?: Record<string, any>;
  listeners?: Record<string, (payload?: any) => void>;
  type?: OverlayType;
}

export interface OverlayInstance {
  id: number;
  component: any;
  props: Record<string, any>;
  listeners: Record<string, (payload?: any) => void>;
  type?: OverlayType;
  overlayProps?: Record<string, any>; // ✅ Ensure overlayProps is handled
}

const overlayStack = ref<OverlayInstance[]>([]); // ✅ Stores multiple overlays
let overlayId = 0; // Unique ID for each overlay

export function useOverlay() {
  function open(
    newComponent: any,
    options: OverlayOptions = {},
    overlayProps: Record<string, any> = {} // ✅ Explicit overlayProps parameter
  ) {
    const newID = ++overlayId;
    overlayStack.value.push({
      id: newID,
      component: markRaw(newComponent),
      props: options.props || {},
      listeners: options.listeners || {},
      type: options.type || "overlay",
      overlayProps, // ✅ Assign overlayProps properly
    });
    return newID
  }

  function close(id?: number) {
    if (id) {
      overlayStack.value = overlayStack.value.filter((overlay) => overlay.id !== id);
    } else {
      overlayStack.value.pop();
    }
  }

  const topOverlay = computed(() => overlayStack.value[overlayStack.value.length - 1]);
  const isOpen = computed(() => overlayStack.value.length > 0);

  watch(
    isOpen,
    (open) => {
      document.body.style.overflow = open ? "hidden" : "";
    },
    { immediate: true }
  );

  return {
    isOpen,
    overlayStack,
    topOverlay,
    open,
    close,
  };
}
