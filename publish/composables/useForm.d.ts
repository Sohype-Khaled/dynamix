import { ObjectSchema } from 'yup';
interface UseFormOptions<T> {
    initialValues: T;
    validationSchema?: ObjectSchema<any>;
    transformResponse?: (data: any) => Partial<T>;
}
export declare function useForm<T extends Record<string, any>>(options: UseFormOptions<T>): {
    form: [T] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<T, import('vue').Ref<T, T>, T> : import('vue').Ref<import('vue').UnwrapRef<T>, T | import('vue').UnwrapRef<T>>;
    loading: import('vue').Ref<boolean, boolean>;
    success: import('vue').Ref<boolean, boolean>;
    serverError: import('vue').Ref<string, string>;
    errors: [Partial<Record<string | keyof T, string>>] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<import('vue').Ref<any, any> & Partial<Record<string | keyof T, string>>, import('vue').Ref<import('vue').Ref<any, any> & Partial<Record<string | keyof T, string>>, import('vue').Ref<any, any> & Partial<Record<string | keyof T, string>>>, import('vue').Ref<any, any> & Partial<Record<string | keyof T, string>>> : import('vue').Ref<import('vue').UnwrapRef<Partial<Record<string | keyof T, string>>>, Partial<Record<string | keyof T, string>> | import('vue').UnwrapRef<Partial<Record<string | keyof T, string>>>>;
    isEditMode: import('vue').Ref<boolean, boolean>;
    fetchInitialData: (getEndpoint: string) => Promise<void>;
    handleSubmit: (endpoint: string, method?: "post" | "put") => Promise<void>;
};
export {};
//# sourceMappingURL=useForm.d.ts.map