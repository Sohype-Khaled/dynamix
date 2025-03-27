export declare function useSelection<T extends Record<string, any>>(items: T[], selectionKey?: keyof T): {
    selectedItems: import('vue').Ref<Set<import('@vue/reactivity').UnwrapRefSimple<T[keyof T]>> & Omit<Set<T[keyof T]>, keyof Set<any>>, Set<T[keyof T]> | (Set<import('@vue/reactivity').UnwrapRefSimple<T[keyof T]>> & Omit<Set<T[keyof T]>, keyof Set<any>>)>;
    toggleSelection: (item: T) => void;
    selectAll: () => void;
    clearSelection: () => void;
    isSelected: (item: T) => boolean;
    isAllSelected: import('vue').ComputedRef<boolean>;
    isIndeterminate: import('vue').ComputedRef<boolean>;
};
//# sourceMappingURL=useSelection.d.ts.map