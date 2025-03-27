interface Props {
    label: string;
    state?: 'default' | 'success' | 'error';
    message?: string;
    modelValue?: any;
}
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'outer-left'?(_: {}): any;
        'inner-left'?(_: {}): any;
        control?(_: {
            value: any;
            class: string[];
            id: string;
            onInput: (event: Event) => void;
        }): any;
        'inner-right'?(_: {}): any;
        'outer-right'?(_: {}): any;
        bottom?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DXFloatingLabel.vue.d.ts.map