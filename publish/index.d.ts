import { App } from 'vue';
import { default as DXButton } from './components/DXButton/DXButton.vue';
import { DXCheckbox, DXFloatingLabel, DXInput, DXInputWrapper, DXRadio, DXSearchInput, DXTagInput, DXTextarea, DXToggle } from './components/inputs';
import { DXListing, DXPagination, DXPaginationControls, DXPaginationInfo, DXPaginationSize, DXTable, DXTableHead, DXTableRow } from './components/listing';
import { DXAlert, DXLoader } from './components/index';
declare const DynamixPlugin: {
    install: (app: App) => void;
};
export { DynamixPlugin, DXButton, DXCheckbox, DXRadio, DXToggle, DXFloatingLabel, DXInputWrapper, DXInput, DXTextarea, DXTagInput, DXSearchInput, DXTable, DXTableHead, DXTableRow, DXListing, DXPagination, DXPaginationInfo, DXPaginationControls, DXPaginationSize, DXAlert, DXLoader };
export { useParsedOptions } from './composables/useParsedOptions';
export { useForm } from './composables/useForm';
//# sourceMappingURL=index.d.ts.map