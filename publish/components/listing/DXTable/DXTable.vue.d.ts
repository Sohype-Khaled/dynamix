import { TableColumn, TableProps } from '../types.ts';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        row: import('../types.ts').TableRow;
        value: any;
        column: TableColumn;
    }) => any>> & {
        header?(_: {
            column: TableColumn;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<TableProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:selected": (...args: any[]) => void;
    "update:rows": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<TableProps> & Readonly<{
    "onUpdate:selected"?: ((...args: any[]) => any) | undefined;
    "onUpdate:rows"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DXTable.vue.d.ts.map