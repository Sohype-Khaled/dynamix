import {computed, type Ref} from "vue";

export function useParsedOptions<T extends object>(
  optionsProp: T | string,
  validateFn?: (options: T) => void
) {
  const parsedOptions = computed<T>(() => {
    if (typeof optionsProp === "string") {
      try {
        return JSON.parse(optionsProp) as T;
      } catch (error) {
        throw new Error("Invalid JSON format for options: " + error);
      }
    }
    return optionsProp as T;
  });

  if (validateFn) {
    validateFn(parsedOptions.value);
  }

  return {
    parsedOptions,
  };
}
