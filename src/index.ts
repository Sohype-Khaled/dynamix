import "@/assets/style.css";
import type {App} from 'vue';
import DXButton from "@/components/DXButton/DXButton.vue";
import DXAlert from '@/components/DXAlert.vue';
import DXLoader from '@/components/DXLoader.vue';
import DXOverlay from '@/components/overlays/DXOverlay.vue';
import DXDialog from "@/components/overlays/DXDialog/DXDialog.vue";
import DXDialogBody from "@/components/overlays/DXDialog/DXDialogBody.vue";
import DXDialogFooter from "@/components/overlays/DXDialog/DXDialogFooter.vue";
import DXDialogConfirmation from "@/components/overlays/DXDialog/DXDialogConfirmation.vue";
import DXTable from "@/components/listing/DXTable/DXTable.vue";
import DXTableHead from "@/components/listing/DXTable/DXTableHead.vue";
import DXTableRow from "@/components/listing/DXTable/DXTableRow.vue";
import DXTableListing from "@/components/listing/DXTable/DXTableListing.vue";
import DXPagination from "@/components/listing/DXPagination/DXPagination.vue";
import DXPaginationInfo from "@/components/listing/DXPagination/DXPaginationInfo.vue";
import DXPaginationControls from "@/components/listing/DXPagination/DXPaginationControls.vue";
import DXPaginationSize from "@/components/listing/DXPagination/DXPaginationSize.vue";
import DXCheckbox from "@/components/inputs/DXCheckbox.vue";
import DXRadio from "@/components/inputs/DXRadio.vue";
import DXToggle from "@/components/inputs/DXToggle.vue";
import DXFloatingLabel from "@/components/inputs/DXFloatingLabel.vue";
import DXSearchInput from "@/components/inputs/DXSearchInput.vue";
import DXInput from "@/components/inputs/DXInput.vue";
import DXTextarea from "@/components/inputs/DXTextarea.vue";
import DXTagInput from "@/components/inputs/DXTagInput.vue";
import DXInputWrapper from "@/components/inputs/DXInputWrapper.vue";
import DXTipTapEditor from "@/components/inputs/DXTipTapEditor/DXTipTapEditor.vue";

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
  DXTipTapEditor,

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
  DXTipTapEditor,

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

export * from "@/components/listing/types.ts";