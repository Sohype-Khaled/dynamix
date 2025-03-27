import { RowProps } from '../types.ts';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        row: import('../types.ts').TableRow;
        value: any;
        column: import('../types.ts').TableColumn;
    }) => any>>;
    refs: {};
    rootEl: HTMLTableRowElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<RowProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "toggle:select": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<RowProps> & Readonly<{
    "onToggle:select"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLTableRowElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DXTableRow.vue.d.ts.map