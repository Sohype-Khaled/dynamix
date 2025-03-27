import { ref, computed, watch, onMounted } from "vue";
import axios, { type AxiosRequestConfig } from "axios";

export function useListing(listUrl: string, axiosConfig?: AxiosRequestConfig, searchKey = "search") {
  const tableData = ref<any[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<string | null>(null);

  // Pagination state
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(10);
  const totalItems = ref<number>(0);
  const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));

  // Search & Filters state
  const searchQuery = ref<string>("");
  const filters = ref<Record<string, any>>({});

  // Fetch data from API with pagination, filters & search
  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(listUrl, {
        ...axiosConfig,
        params: {
          page: currentPage.value,
          limit: pageSize.value,
          [searchKey]: searchQuery.value, // Fixed search key
          ...filters.value, // Additional filters
        },
      });

      tableData.value = response.data.data;
      totalItems.value = response.data.total;
    } catch (err) {
      console.error("Error fetching data:", err);
      error.value = "Failed to load data.";
    } finally {
      loading.value = false;
    }
  };

  // Fetch data when mounted
  onMounted(fetchData);

  // Watch for changes in pagination, search, or filters
  watch([currentPage, pageSize, searchQuery, filters], fetchData);

  // Function to update filters & reset page
  const updateFilters = (newFilters: Record<string, any>) => {
    filters.value = { ...filters.value, ...newFilters };
    currentPage.value = 1; // Reset to first page when filters change
  };

  return {
    tableData,
    loading,
    error,
    fetchData,
    // Pagination
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    // Search & Filtering
    searchQuery,
    filters,
    updateFilters,
  };
}
