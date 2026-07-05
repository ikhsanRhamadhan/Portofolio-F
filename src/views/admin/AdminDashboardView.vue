<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { FolderKanban, Code2, FileText, MessageSquare, ArrowRight } from 'lucide-vue-next'
import api from '@/services/api'
import type { DashboardStats } from '@/types/api'
import { useRouter } from 'vue-router'

useHead({
  title: 'Dashboard - Admin Panel',
})

const router = useRouter()
const stats = ref<DashboardStats | null>(null)
const isLoading = ref(true)

type StatKey = 'projects' | 'skills' | 'blog_posts' | 'unread_messages'

const statCards: { key: StatKey; label: string; icon: object; color: string; bg: string; link: string }[] = [
  { key: 'projects', label: 'Projects', icon: FolderKanban, color: 'text-cyan-300', bg: 'bg-cyan-400/10', link: '/admin/projects' },
  { key: 'skills', label: 'Skills', icon: Code2, color: 'text-amber-300', bg: 'bg-amber-400/10', link: '/admin/skills' },
  { key: 'blog_posts', label: 'Blog Posts', icon: FileText, color: 'text-emerald-300', bg: 'bg-emerald-400/10', link: '/admin/blog' },
  { key: 'unread_messages', label: 'Pesan Baru', icon: MessageSquare, color: 'text-rose-300', bg: 'bg-rose-400/10', link: '/admin/messages' },
]

onMounted(async () => {
  try {
    const { data } = await api.get('/admin/dashboard')
    stats.value = data.data
  } catch {
    // silent
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="font-display text-3xl text-primary">
        Dashboard
      </h1>
      <p class="mt-1 text-sm text-muted">
        Ringkasan konten portfolio Anda.
      </p>
    </div>

    <div
      v-if="isLoading"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="rounded-[24px] border border-subtle bg-card p-6"
      >
        <div class="mb-3 h-10 w-10 animate-pulse rounded-xl bg-white/10" />
        <div class="h-8 w-16 animate-pulse rounded-full bg-white/10" />
        <div class="mt-2 h-4 w-20 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>

    <div
      v-else-if="stats"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <button
        v-for="card in statCards"
        :key="card.key"
        type="button"
        class="rounded-[24px] border border-subtle bg-card p-6 text-left transition hover:border-hover"
        @click="router.push(card.link)"
      >
        <div
          class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
          :class="card.bg"
        >
          <component :is="card.icon" class="h-5 w-5" :class="card.color" />
        </div>
        <p class="text-3xl font-semibold text-primary">
          {{ (stats.stats as any)[card.key] }}
        </p>
        <p class="mt-1 text-sm text-muted">
          {{ card.label }}
        </p>
      </button>
    </div>

    <!-- Recent Messages -->
    <div
      v-if="stats?.recent_messages?.length"
      class="rounded-[24px] border border-subtle bg-card"
    >
      <div class="flex items-center justify-between border-b border-subtle px-6 py-4">
        <h2 class="font-display text-lg text-primary">
          Pesan Terbaru
        </h2>
        <button
          type="button"
          class="flex items-center gap-1 text-sm text-accent transition hover:text-cyan-200"
          @click="router.push('/admin/messages')"
        >
          Lihat semua
          <ArrowRight class="h-4 w-4" />
        </button>
      </div>
      <div class="divide-y divide-subtle">
        <div
          v-for="msg in stats.recent_messages.slice(0, 5)"
          :key="msg.id"
          class="flex items-center justify-between px-6 py-4"
        >
          <div>
            <p class="text-sm font-medium text-primary">
              {{ msg.name }}
            </p>
            <p class="text-sm text-muted">
              {{ msg.subject }}
            </p>
          </div>
          <span
            class="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]"
            :class="msg.is_read ? 'bg-muted/10 text-muted' : 'bg-accent-bg text-accent'"
          >
            {{ msg.is_read ? 'Dibaca' : 'Baru' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
