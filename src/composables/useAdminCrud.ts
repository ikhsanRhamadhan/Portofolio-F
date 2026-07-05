import { reactive, ref } from 'vue'
import api from '@/services/api'

export interface CrudField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'boolean'
  required?: boolean
}

interface UseAdminCrudOptions<T> {
  endpoint: string
  fetchData: () => Promise<void> | void
  fields: CrudField[]
  displayFields: string[]
}

export function useAdminCrud<T extends { id: number }>(options: UseAdminCrudOptions<T>) {
  const { endpoint, fetchData, fields } = options

  const isModalOpen = ref(false)
  const isEditing = ref(false)
  const editingId = ref<number | null>(null)
  const isSaving = ref(false)
  const errorMessage = ref('')

  const form = reactive<Record<string, unknown>>({})
  const initialFormState: Record<string, unknown> = {}

  fields.forEach((f) => {
    if (f.type === 'boolean') {
      initialFormState[f.key] = false
    } else if (f.type === 'number') {
      initialFormState[f.key] = 0
    } else {
      initialFormState[f.key] = ''
    }
  })

  const resetForm = () => {
    Object.assign(form, JSON.parse(JSON.stringify(initialFormState)))
  }

  resetForm()

  const openCreate = () => {
    isEditing.value = false
    editingId.value = null
    errorMessage.value = ''
    resetForm()
    isModalOpen.value = true
  }

  const openEdit = (item: T) => {
    isEditing.value = true
    editingId.value = item.id
    errorMessage.value = ''
    const itemData = item as Record<string, unknown>
    fields.forEach((f) => {
      form[f.key] = itemData[f.key] ?? initialFormState[f.key]
    })
    isModalOpen.value = true
  }

  const closeModal = () => {
    isModalOpen.value = false
    errorMessage.value = ''
  }

  const save = async () => {
    isSaving.value = true
    errorMessage.value = ''

    try {
      const payload = { ...form }

      fields.forEach((f) => {
        if (f.type === 'boolean') {
          payload[f.key] = Boolean(payload[f.key])
        } else if (f.type === 'number') {
          payload[f.key] = Number(payload[f.key])
        }
      })

      if (isEditing.value && editingId.value) {
        await api.put(`${endpoint}/${editingId.value}`, payload)
      } else {
        await api.post(endpoint, payload)
      }

      closeModal()
      await fetchData()
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'response' in e) {
        const err = e as { response?: { data?: { message?: string } } }
        errorMessage.value = err.response?.data?.message ?? 'Gagal menyimpan data.'
      } else {
        errorMessage.value = 'Gagal menyimpan data.'
      }
    } finally {
      isSaving.value = false
    }
  }

  const confirmDelete = async (item: T) => {
    if (!confirm(`Hapus item ini?`)) return
    try {
      await api.delete(`${endpoint}/${item.id}`)
      await fetchData()
    } catch {
      // silent
    }
  }

  const load = async () => {
    await fetchData()
  }

  return {
    isModalOpen,
    isEditing,
    isSaving,
    errorMessage,
    form,
    fields,
    openCreate,
    openEdit,
    closeModal,
    save,
    confirmDelete,
    load,
  }
}
