export interface TableRow {
  [key: string]: any
}

export interface TableColumn {
  name: string;
  label: string;
  sortable?: boolean,
  extraClass?: string
}

export interface TableProps {
  rows: TableRow[];
  columns?: TableColumn[];
  selectable?: boolean;
  orderable?: boolean;
  selectionKey?: keyof TableRow;
  selectedRows?: number[]
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
  controls: NormalizedPaginationControls
  pageSizeOptions?: number[]
  hidePageSize?: boolean
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

export type DjangoPaginatedResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
export type FastAPIPaginatedResponse<T> = {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  data: T[];
}

export type NormalizedPaginationControls = {
  total: number
  page: number
  pageSize: number
  totalPages: number
}
export type NormalizedPagination<T> = {
  controls: NormalizedPaginationControls
  results: T[]
}


export type ListingQuery = {
  page: number
  pageSize: number
  [key: string]: any
}

export interface TableListingProps {
  paginationControls: NormalizedPaginationControls;
  loading: boolean;
  error: string | null;
  query: ListingQuery;
  items: any[];
  selectable?: boolean; // for selection
  orderingUrl?: string;
  orderable?: boolean; // for reordering
  columns?: TableColumn[]; // for table
}