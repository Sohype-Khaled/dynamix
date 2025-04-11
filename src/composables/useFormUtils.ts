let globalIdCounter = 0

export function useFormUtils() {
  function getUniqueId(prefix = 'input') {
    // SSR-safe deterministic id generation
    return `${prefix}-${++globalIdCounter}`
  }

  function generateIdFromLabel(label?: string, fallbackPrefix = 'input') {
    if (label) {
      return `${fallbackPrefix}-${label.toLowerCase().replace(/\s+/g, '-')}`
    }
    return getUniqueId(fallbackPrefix)
  }

  return {
    getUniqueId,
    generateIdFromLabel
  }
}