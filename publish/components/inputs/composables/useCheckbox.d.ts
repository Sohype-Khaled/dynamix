export declare function useCheckbox(props: {
    modelValue: any;
    value?: any;
    indeterminate?: boolean;
    id?: string;
}, emit: (event: "update:modelValue", value: any) => void): {
    isChecked: import('vue').ComputedRef<boolean>;
    inputRef: import('vue').Ref<HTMLInputElement | null, HTMLInputElement | null>;
    updateValue: () => void;
    uniqueId: import('vue').Ref<string, string>;
};
//# sourceMappingURL=useCheckbox.d.ts.map