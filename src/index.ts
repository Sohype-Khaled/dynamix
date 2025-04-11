import "@/assets/style.css";
import type {App} from 'vue';
import DXButton from "@/components/DXButton/DXButton.vue";
import {
  DXCheckbox,
  DXFloatingLabel,
  DXInput,
  DXInputWrapper,
  DXRadio,
  DXSearchInput,
  DXTagInput,
  DXTextarea,
  DXToggle
} from "@/components/inputs";

import {
  DXPagination,
  DXPaginationControls,
  DXPaginationInfo,
  DXPaginationSize,
  DXTable,
  DXTableHead,
  DXTableListing,
  DXTableRow
} from "@/components/listing";

import {
  DXAlert,
  DXDialog,
  DXDialogBody,
  DXDialogConfirmation,
  DXDialogFooter,
  DXLoader,
  DXOverlay,
} from "@/components/index";

const components = {
  DXButton,
  DXCheckbox,
  DXRadio,
  DXToggle,
  DXFloatingLabel,
  DXInputWrapper,
  DXInput,
  DXTextarea,
  DXTagInput,
  DXSearchInput,
  DXTable,
  DXLoader,
  DXTableHead,
  DXTableRow,
  DXTableListing,
  DXPagination,
  DXPaginationInfo,
  DXPaginationControls,
  DXPaginationSize,
  DXAlert,
  DXOverlay,
  DXDialog,
  DXDialogBody,
  DXDialogFooter,
  DXDialogConfirmation,
};

const DynamixPlugin = {
  install: (app: App) => {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component);
    }
  }
};

export {
  DynamixPlugin,
  DXButton,
  DXCheckbox,
  DXRadio,
  DXToggle,
  DXFloatingLabel,
  DXInputWrapper,
  DXInput,
  DXTextarea,
  DXTagInput,
  DXSearchInput,
  DXTable,
  DXTableHead,
  DXTableRow,
  DXTableListing,
  DXPagination,
  DXPaginationInfo,
  DXPaginationControls,
  DXPaginationSize,

  DXAlert,
  DXLoader,
  DXOverlay,
  DXDialog,
  DXDialogBody,
  DXDialogFooter,
  DXDialogConfirmation,
};


export {useParsedOptions} from "@/composables/useParsedOptions";
export {useForm} from "@/composables/useForm";
export {useDialog} from "@/composables/useDialog.ts";
export {useOverlay} from "@/composables/useOverlay.ts";
export {useConfirmation} from "@/composables/useConfirmation.ts";
export {useListing} from "@/components/listing/composables/useListing.ts"