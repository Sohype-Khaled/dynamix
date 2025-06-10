import {type OverlayInstance, useOverlay} from "@/composables/useOverlay.ts";
import {type ComputedRef, ref, type Ref} from "vue";
import DXLightbox from "@/components/DXLightbox/DXLightbox.vue";
import type {LightboxItem} from "@/types/lightbox";

interface UseLightboxReturn {
  isOpen: ComputedRef<boolean>;
  overlayStack: Ref<OverlayInstance[]>;
  topOverlay: any;
  close: (id?: number) => void;
  show: (
    component: any,
    props?: Record<string, any>,
    dialogProps?: Record<string, any>,
    listeners?: Record<string, (payload?: any) => void>
  ) => void;
}

export function useLightbox(items: LightboxItem[]): UseLightboxReturn {
  const {open, close, overlayStack, topOverlay, isOpen} = useOverlay();
  const localItems = ref(items)

  function show(currentIndex: number) {
    const overlayId = open(DXLightbox, {
      props: {
        items: localItems,
        currentIndex},
      listeners: {
        close: () => close(overlayId),
      },
      type: "overlay",
    })
  }

  return {
    isOpen,
    overlayStack,
    topOverlay,
    show,
    close,
  }
}
