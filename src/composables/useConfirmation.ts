import {type OverlayInstance, useOverlay} from "./useOverlay";

import {type ComputedRef, type  Ref} from "vue";
import {DXDialogConfirmation} from "@/components";


interface UseConfirmationReturn {
  isOpen: ComputedRef<boolean>;
  overlayStack: Ref<OverlayInstance[]>;
  topOverlay: any;
  close: (id?: number) => void;
  confirm: (options?: Record<string, any>) => Promise<boolean>;
}

export function useConfirmation(): Omit<UseConfirmationReturn, "confirm"> & {
  confirm: (
    options?: Record<string, any>,
    callback?: (confirmed: boolean) => void
  ) => Promise<boolean> | void;
} {
  const {open, close, overlayStack, topOverlay, isOpen} = useOverlay();


  function confirm(
    options: Record<string, any> = {},
    callback?: (confirmed: boolean) => void
  ): Promise<boolean> | void {
    if (callback) {
      // ✅ Callback style
      const overlayId = open(DXDialogConfirmation, {
        props: options,
        listeners: {
          confirm: () => {
            callback(true);
            close(overlayId);
          },
          cancel: () => {
            callback(false);
            close(overlayId);
          },
        },
        type: "confirmation",
      });
      return;
    } else {
      // ✅ Promise style
      return new Promise<boolean>((resolve) => {
        const overlayId = open(DXDialogConfirmation, {
          props: options,
          listeners: {
            confirm: () => {
              resolve(true);
              close(overlayId);
            },
            cancel: () => {
              resolve(false);
              close(overlayId);
            },
          },
          type: "confirmation",
        });
      });
    }
  }


  return {
    isOpen,
    overlayStack,
    topOverlay,
    confirm,
    close,
  };
}