<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useAuthStore } from '@/stores/auth'
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  BriefcaseBusiness,
  GraduationCap,
  Award,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const isSidebarOpen = ref(false)

useHead({
  title: 'Admin Panel - Saka Developer',
})

const sidebarLinks = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Skills', to: '/admin/skills', icon: Code2 },
  { label: 'Experiences', to: '/admin/experiences', icon: BriefcaseBusiness },
  { label: 'Education', to: '/admin/educations', icon: GraduationCap },
  { label: 'Certifications', to: '/admin/certifications', icon: Award },
  { label: 'Blog', to: '/admin/blog', icon: FileText },
  { label: 'Messages', to: '/admin/messages', icon: MessageSquare },
]

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}

const isActive = (to: string) => {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

onMounted(() => {
  authStore.fetchUser()
})
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Mobile overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
      @click="closeSidebar"
    />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-subtle bg-elevated transition-transform lg:static lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between border-b border-subtle px-6 py-4">
        <div class="flex items-center gap-3">
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-accent">
            SD
          </span>
          <div>
            <p class="font-display text-sm text-primary">
              Admin Panel
            </p>
            <p class="text-[10px] uppercase tracking-[0.3em] text-muted">
              Portfolio CMS
            </p>
          </div>
        </div>
        <button
          type="button"
          class="text-muted hover:text-primary lg:hidden"
          @click="closeSidebar"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-4 py-4">
        <RouterLink
          v-for="link in sidebarLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition"
          :class="isActive(link.to) ? 'bg-accent-bg text-accent' : 'text-secondary hover:bg-card-hover hover:text-primary'"
          @click="closeSidebar"
        >
          <component :is="link.icon" class="h-4 w-4 shrink-0" />
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="border-t border-subtle px-4 py-4">
        <div
          v-if="authStore.user"
          class="mb-3 px-4 text-xs text-muted"
        >
          {{ authStore.user.email }}
        </div>
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-rose-300 transition hover:bg-rose-400/10"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex flex-1 flex-col">
      <!-- Top bar (mobile) -->
      <header class="sticky top-0 z-30 flex items-center justify-between border-b border-subtle bg-header backdrop-blur px-6 py-4 lg:hidden">
        <button
          type="button"
          class="text-secondary hover:text-primary"
          @click="isSidebarOpen = true"
        >
          <Menu class="h-6 w-6" />
        </button>
        <p class="text-sm font-medium text-primary">
          Admin Panel
        </p>
        <div class="w-6" />
      </header>

      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
