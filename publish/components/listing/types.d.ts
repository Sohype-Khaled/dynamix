import { AxiosRequestConfig } from 'axios';
export interface TableRow {
    [key: string]: any;
}
export interface TableColumn {
    name: string;
    label: string;
    sortable?: boolean;
    extraClass?: string;
}
export interface TableProps {
    rows: TableRow[];
    columns?: TableColumn[];
    selectable?: boolean;
    orderable?: boolean;
    selectionKey?: keyof TableRow;
    selectedRows?: number[];
}
export interface RowProps {
    row: TableRow;
    columns: TableColumn[];
    selectable?: boolean;
    isSelected?: boolean;
    orderable?: boolean;
}
export interface HeadProps {
    columns: TableColumn[];
    selectable?: boolean;
    orderable?: boolean;
    isAllSelected?: boolean;
}
export interface PaginationProps {
    currentPage: number;
    pageSize: number;
    totalItems: number;
}
export interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}
export interface PaginationInfoProps {
    currentPage: number;
    pageSize: number;
    totalItems: number;
}
export interface PaginationSizeProps {
    pageSize: number;
}
export type ListingType = 'table' | 'list';
export interface ListingProps {
    type: ListingType;
    listUrl: string;
    axiosConfig: AxiosRequestConfig;
    selectable?: boolean;
    orderingUrl?: string;
    orderable?: boolean;
    columns?: TableColumn[];
}
//# sourceMappingURL=types.d.ts.map