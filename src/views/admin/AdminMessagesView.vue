<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { Trash2 } from 'lucide-vue-next'
import api from '@/services/api'
import type { ContactMessage } from '@/types/contact'

useHead({ title: 'Messages - Admin Panel' })

const messages = ref<ContactMessage[]>([])
const isLoading = ref(true)

const fetchMessages = async () => {
  isLoading.value = true
  try {
    const { data } = await api.get('/admin/contact-messages')
    messages.value = data.data ?? []
  } catch {
    // silent
  } finally {
    isLoading.value = false
  }
}

const deleteMessage = async (id: number) => {
  if (!confirm('Hapus pesan ini?')) return
  try {
    await api.delete(`/admin/contact-messages/${id}`)
    messages.value = messages.value.filter((m) => m.id !== id)
  } catch {
    // silent
  }
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(fetchMessages)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="font-display text-3xl text-primary">
        Contact Messages
      </h1>
      <p class="mt-1 text-sm text-muted">
        Pesan yang dikirim pengunjung melalui form kontak.
      </p>
    </div>

    <div
      v-if="isLoading"
      class="space-y-4"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="h-24 animate-pulse rounded-[24px] border border-subtle bg-card"
      />
    </div>

    <div
      v-else-if="messages.length === 0"
      class="rounded-[28px] border border-dashed border-subtle px-6 py-16 text-center text-sm text-muted"
    >
      Belum ada pesan masuk.
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="rounded-[24px] border border-subtle bg-card p-6"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 space-y-3">
            <div class="flex items-center gap-3">
              <h3 class="font-medium text-primary">
                {{ msg.name }}
              </h3>
              <span
                class="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]"
                :class="msg.is_read ? 'bg-muted/10 text-muted' : 'bg-accent-bg text-accent'"
              >
                {{ msg.is_read ? 'Dibaca' : 'Baru' }}
              </span>
            </div>
            <p class="text-sm text-accent">
              {{ msg.email }}
            </p>
            <p class="text-sm font-medium text-primary">
              {{ msg.subject }}
            </p>
            <p class="text-sm leading-7 text-secondary">
              {{ msg.message }}
            </p>
            <p class="text-xs text-muted">
              {{ formatDate(msg.created_at) }}
            </p>
          </div>
          <button
            type="button"
            class="shrink-0 rounded-full p-2 text-rose-300 transition hover:bg-rose-400/10"
            @click="deleteMessage(msg.id)"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
