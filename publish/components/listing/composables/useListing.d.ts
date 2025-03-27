import { AxiosRequestConfig } from 'axios';
export declare function useListing(listUrl: string, axiosConfig?: AxiosRequestConfig, searchKey?: string): {
    tableData: import('vue').Ref<any[], any[]>;
    loading: import('vue').Ref<boolean, boolean>;
    error: import('vue').Ref<string | null, string | null>;
    fetchData: () => Promise<void>;
    currentPage: import('vue').Ref<number, number>;
    pageSize: import('vue').Ref<number, number>;
    totalItems: import('vue').Ref<number, number>;
    totalPages: import('vue').ComputedRef<number>;
    searchQuery: import('vue').Ref<string, string>;
    filters: import('vue').Ref<Record<string, any>, Record<string, any>>;
    updateFilters: (newFilters: Record<string, any>) => void;
};
//# sourceMappingURL=useListing.d.ts.map