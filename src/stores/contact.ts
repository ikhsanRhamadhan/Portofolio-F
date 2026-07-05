import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'
import type { ContactForm } from '@/types/contact'

export const useContactStore = defineStore('contact', () => {
  const isSubmitting = ref(false)
  const successMessage = ref('')
  const errorMessage = ref('')

  const submit = async (form: ContactForm) => {
    isSubmitting.value = true
    successMessage.value = ''
    errorMessage.value = ''

    try {
      await api.post('/contact', form)
      successMessage.value = 'Pesan berhasil dikirim! Terima kasih.'
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'response' in e) {
        const err = e as { response?: { data?: { message?: string } } }
        errorMessage.value = err.response?.data?.message ?? 'Gagal mengirim pesan. Silakan coba lagi.'
      } else {
        errorMessage.value = 'Gagal mengirim pesan. Silakan coba lagi.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  return { isSubmitting, successMessage, errorMessage, submit }
})
