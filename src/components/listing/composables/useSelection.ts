import {computed, ref} from 'vue';

export function useSelection<T extends Record<string, any>>(items: T[], selectionKey: keyof T = 'id' as keyof T) {
  // Reactive set to track selected item values (based on key)
  const selectedItems = ref<Set<T[keyof T]>>(new Set());

  // Toggle selection for a single item
  const toggleSelection = (item: T) => {
    const itemKey = item[selectionKey];

    if (selectedItems.value.has(itemKey)) {
      selectedItems.value.delete(itemKey);
    } else {
      selectedItems.value.add(itemKey);
    }
  };

  // Select all items
  const selectAll = () => {
    if (selectedItems.value.size === items.length) {
      selectedItems.value.clear();
    } else {
      selectedItems.value = new Set(items.map(item => item[selectionKey]));
    }
  };

  // Clear all selections
  const clearSelection = () => {
    selectedItems.value.clear();
  };

  // Check if a specific item is selected
  const isSelected = (item: T) => selectedItems.value.has(item[selectionKey]);

  // Computed property to determine if all items are selected
  const isAllSelected = computed(() => selectedItems.value.size === items.length && items.length > 0);

  // Computed property for indeterminate state (some selected, but not all)
  const isIndeterminate = computed(() => selectedItems.value.size > 0 && selectedItems.value.size < items.length);

  return {
    selectedItems,
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,
    isAllSelected,
    isIndeterminate,
  };
}
