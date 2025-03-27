import { computed, ref, watch } from "vue";

export function useCheckbox(
  props: { modelValue: any; value?: any; indeterminate?: boolean; id?: string },
  emit: (event: "update:modelValue", value: any) => void
) {
  const inputRef = ref<HTMLInputElement | null>(null);

  // Generate a unique ID if none is provided
  const uniqueId = ref(props.id || `toggle-${crypto.randomUUID()}`);

  // Compute whether the item is checked (supports arrays, objects, numbers, booleans)
  const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.some((item) => JSON.stringify(item) === JSON.stringify(props.value));
    }
    return JSON.stringify(props.modelValue) === JSON.stringify(props.value) || props.modelValue === true;
  });

  // Watch for indeterminate state and apply it to the input
  watch(
    () => props.indeterminate,
    (newValue) => {
      if (inputRef.value) {
        inputRef.value.indeterminate = !!newValue;
      }
    },
    { immediate: true }
  );

  // Handle value update on toggle or checkbox change
  const updateValue = () => {
    let newValue;
    if (Array.isArray(props.modelValue)) {
      // Handle array selections
      if (isChecked.value) {
        newValue = props.modelValue.filter((item) => JSON.stringify(item) !== JSON.stringify(props.value));
      } else {
        newValue = [...props.modelValue, props.value];
      }
    } else {
      // Handle boolean or single value toggling
      newValue = props.value !== undefined ? (isChecked.value ? null : props.value) : !props.modelValue;
    }
    emit("update:modelValue", newValue);
  };

  return { isChecked, inputRef, updateValue, uniqueId };
}
