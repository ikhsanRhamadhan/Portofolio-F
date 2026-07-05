<script setup lang="ts">
import { reactive } from 'vue'
import { useHead } from '@unhead/vue'
import { LogIn, AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

useHead({
  title: 'Login Admin - Muhamad Ikhsan Ramadhan',
})

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await authStore.login(form.email, form.password)
  if (authStore.user) {
    router.push('/admin')
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center px-6">
    <div class="w-full max-w-md">
      <div class="rounded-[32px] border border-subtle bg-card p-8">
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10">
            <span class="text-xl font-semibold text-accent">SD</span>
          </div>
          <h1 class="font-display text-2xl text-primary">
            Admin Panel
          </h1>
          <p class="mt-1 text-sm text-muted">
            Masuk untuk mengelola konten portfolio
          </p>
        </div>

        <div
          v-if="authStore.errorMessage"
          class="mb-6 flex items-center gap-3 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
        >
          <AlertCircle class="h-5 w-5 shrink-0" />
          {{ authStore.errorMessage }}
        </div>

        <form
          class="space-y-5"
          @submit.prevent="handleLogin"
        >
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm text-secondary"
            >Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="admin@example.com"
            >
          </div>
          <div>
            <label
              for="password"
              class="mb-1.5 block text-sm text-secondary"
            >Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="••••••••"
            >
          </div>
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="flex w-full items-center justify-center gap-2 rounded-full bg-inverse px-6 py-3 text-sm font-medium text-inverse transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogIn class="h-4 w-4" />
            {{ authStore.isLoading ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>
      </div>
    </div>
  </main>
</template>
