import {onMounted, ref, type Ref, watchEffect} from "vue";
import type {AxiosResponse} from "axios";
import type {
  DjangoPaginatedResponse,
  FastAPIPaginatedResponse,
  NormalizedPagination,
  NormalizedPaginationControls,
} from "../types";


type FetcherFn<T> = (
  params: Record<string, any>
) => Promise<AxiosResponse<FastAPIPaginatedResponse<T> | DjangoPaginatedResponse<T>>>;

function normalizePagination<T>(
  response: FastAPIPaginatedResponse<T> | DjangoPaginatedResponse<T>,
  currentPage: number,
  pageSize: number
): NormalizedPagination<T> {
  if ("results" in response) {
    const total = response.count;
    const totalPages = Math.ceil(total / pageSize);

    return {
      controls: {
        total,
        page: currentPage,
        pageSize,
        totalPages,
      },
      results: response.results,
    };
  } else {
    return {
      controls: {
        total: response.total,
        page: response.page,
        pageSize: response.page_size,
        totalPages: response.total_pages,
      },
      results: response.data,
    };
  }
}

export function useListing<T>(
  fetcher: FetcherFn<T>,
  query: Ref<Record<string, any>>,
) {
  const items = ref<T[]>([]);
  const paginationControls = ref<NormalizedPaginationControls>({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  });

  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetcher({
        ...query.value,
        page: query.value.page,
        limit: query.value.pageSize,
        page_size: query.value.pageSize,
      });

      const normalized = normalizePagination<T>(
        response.data,
        query.value.page,
        query.value.pageSize
      );

      items.value = normalized.results;
      paginationControls.value = normalized.controls;
    } catch (err) {
      console.error("Error fetching listing:", err);
      error.value = "Failed to load data.";
    } finally {
      loading.value = false;
    }
  };

  // Avoid fetch loop by caching last query
  let lastQueryJSON = "";
  let isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  });

  watchEffect(() => {
    if (!isMounted.value) return;

    const currentQuery = JSON.stringify(query.value);
    if (currentQuery !== lastQueryJSON) {
      lastQueryJSON = currentQuery;
      fetchData();
    }
  });

  const updateQuery = (val: Record<string, any>) => {
    const old = JSON.stringify(query.value);
    const incoming = JSON.stringify({...query.value, ...val});

    if (old !== incoming) {
      Object.assign(query.value, val);
    }
  };

  return {
    paginationControls,
    items,
    loading,
    error,
    fetchData,
    updateQuery,
  };
}
