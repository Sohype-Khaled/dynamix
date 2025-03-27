import { HeadProps } from '../types.ts';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        header?(_: {
            column: import('../types.ts').TableColumn;
        }): any;
    };
    refs: {};
    rootEl: HTMLTableSectionElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<HeadProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "toggle-select-all": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<HeadProps> & Readonly<{
    "onToggle-select-all"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLTableSectionElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DXTableHead.vue.d.ts.map