import {type OverlayInstance, useOverlay} from "./useOverlay.ts";
import {type ComputedRef, type Ref} from "vue";

interface UseDialogReturn {
  isOpen: ComputedRef<boolean>;
  overlayStack: Ref<OverlayInstance[]>;
  topOverlay: any;
  close: (id?: number) => void;
  open: (
    component: any,
    props?: Record<string, any>,
    dialogProps?: Record<string, any>,
    listeners?: Record<string, (payload?: any) => void>
  ) => void;
}

export function useDialog(): UseDialogReturn {
  const {open, close, overlayStack, topOverlay, isOpen} = useOverlay();

  function openDialog(
    component: any,
    props: Record<string, any> = {},
    dialogProps: Record<string, any> = {},
    listeners: Record<string, (payload?: any) => void> = {}
  ) {
    open(
      component,
      {
        props,
        listeners: {
          ...listeners,
          close
        },
        type: "dialog",
      },
      dialogProps
    );
  }

  return {
    isOpen,
    overlayStack,
    topOverlay,
    open: openDialog,
    close,
  };
}
