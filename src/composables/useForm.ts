import { ref } from 'vue'
import type { ObjectSchema } from 'yup'
import axios from 'axios'

interface UseFormOptions<T> {
  initialValues: T
  validationSchema?: ObjectSchema<any>
  transformResponse?: (data: any) => Partial<T>
}

export function useForm<T extends Record<string, any>>(options: UseFormOptions<T>) {
  const form = ref<T>({ ...options.initialValues })
  const loading = ref(false)
  const success = ref(false)
  const serverError = ref('')
  const errors = ref<Partial<Record<keyof T | string, string>>>({})

  const isEditMode = ref(false)

  const fetchInitialData = async (getEndpoint: string) => {
    try {
      const res = await axios.get(getEndpoint)
      const data = options.transformResponse
        ? options.transformResponse(res.data)
        : res.data
      form.value = { ...form.value, ...data }
      isEditMode.value = true
    } catch (err) {
      serverError.value = 'Failed to load data'
    }
  }

  const handleSubmit = async (endpoint: string, method: 'post' | 'put' = 'post') => {
    errors.value = {}
    serverError.value = ''
    success.value = false

    try {
      if (options.validationSchema) {
        const validated = await options.validationSchema.validate(form.value, {
          abortEarly: false
        })
        form.value = { ...validated }
      }

      loading.value = true
      await axios[method](endpoint, form.value)
      success.value = true
    } catch (err: any) {
      if (err.name === 'ValidationError') {
        for (const e of err.inner) {
          errors.value[e.path] = e.message
        }
      } else {
        serverError.value = err.response?.data?.detail || 'Something went wrong'
      }
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
    isEditMode,
    fetchInitialData,
    handleSubmit
  }
}