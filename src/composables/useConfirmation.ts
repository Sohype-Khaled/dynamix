import {type OverlayInstance, useOverlay} from "./useOverlay.ts";

import {type ComputedRef, type  Ref} from "vue";
import {DXDialogConfirmation} from "@/components";

interface UseConfirmationReturn {
  isOpen: ComputedRef<boolean>;
  overlayStack: Ref<OverlayInstance[]>;
  topOverlay: any;
  close: (id?: number) => void;
  confirm: (options?: Record<string, any>) => Promise<boolean>;
}

export function useConfirmation(): UseConfirmationReturn {
  const {open, close, overlayStack, topOverlay, isOpen} = useOverlay();

  function confirm(
    options: Record<string, any> = {}
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const overlayId = open(
        DXDialogConfirmation,
        {
          props: options,
          listeners: {
            confirm: () => {
              resolve(true);
              close(overlayId); // Close on confirm
            },
            cancel: () => {
              resolve(false);
              close(overlayId); // Close on cancel
            },
          },
          type: "confirmation",
        },
      );
    });
  }

  return {
    isOpen,
    overlayStack,
    topOverlay,
    confirm,
    close,
  };
}