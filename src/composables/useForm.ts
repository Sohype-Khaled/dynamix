import { ref } from 'vue'
import type { ObjectSchema } from 'yup'

interface UseFormOptions<T> {
  initialValues: T
  validationSchema?: ObjectSchema<any>
  multipart?: boolean
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>) {
  const form = ref<T>({ ...options.initialValues })
  const loading = ref(false)
  const success = ref(false)
  const serverError = ref('')
  const errors = ref<Partial<Record<keyof T | string, string>>>({})

  const resetForm = () => {
    form.value = { ...options.initialValues }
    errors.value = {}
    serverError.value = ''
    success.value = false
    loading.value = false
  }
  const setForm = (data: Partial<T>) => {
    Object.assign(form.value, data)
  }
  const toFormData = (obj: Record<string, any>): FormData => {
    const formData = new FormData()
    for (const key in obj) {
      const value = obj[key]
      if (value === undefined || value === null) continue

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        value.forEach((item, idx) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(`${key}[${idx}]`, item)
          } else {
            formData.append(`${key}[${idx}]`, JSON.stringify(item))
          }
        })
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, value)
      }
    }
    return formData
  }

  const validate = async (): Promise<boolean> => {
    if (!options.validationSchema) return true
    try {
      const validated = await options.validationSchema.validate(form.value, {
        abortEarly: false
      })
      form.value = { ...validated }
      return true
    } catch (err: any) {
      errors.value = {}
      for (const e of err.inner) {
        errors.value[e.path] = e.message
      }
      return false
    }
  }

  const handleSubmit = async (
    submitFn: (payload: T | FormData) => Promise<any>,
    callbacks?: {
      onSuccess?: () => void
      onError?: (err: any) => void
    }
  ) => {
    errors.value = {}
    serverError.value = ''
    success.value = false

    const isValid = await validate()
    if (!isValid) return

    loading.value = true
    try {
      const payload = options.multipart ? toFormData(form.value) : form.value
      await submitFn(payload)
      success.value = true
      callbacks?.onSuccess?.()
    } catch (err: any) {
      const responseData = err.response?.data

      // ✅ If response has field-level errors (e.g. { name: ["Already exists"] })
      if (responseData && typeof responseData === 'object') {
        if (typeof responseData.detail === 'string') {
          serverError.value = responseData.detail
        } else {
          // Try merging field errors
          for (const key in responseData) {
            const messages = responseData[key]
            if (Array.isArray(messages)) {
              errors.value[key] = messages.join(', ')
            } else if (typeof messages === 'string') {
              errors.value[key] = messages
            }
          }

          // Optionally fallback if no known field errors
          if (Object.keys(errors.value).length === 0) {
            serverError.value = 'Something went wrong'
          }
        }
      } else {
        serverError.value = 'Something went wrong'
      }

      callbacks?.onError?.(err)
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    loading,
    success,
    serverError,
    errors,
    validate,
    resetForm,
    handleSubmit,
    setForm
  }
}
