<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { Home, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

useHead({
  title: '404 - Halaman Tidak Ditemukan',
})
</script>

<template>
  <main class="flex min-h-[calc(100vh-200px)] items-center justify-center px-6">
    <div class="text-center">
      <p class="text-8xl font-display font-bold text-accent">
        404
      </p>
      <h1 class="mt-4 font-display text-3xl text-primary">
        Halaman Tidak Ditemukan
      </h1>
      <p class="mt-3 text-secondary">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <div class="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm text-secondary transition hover:border-hover hover:text-accent"
          @click="router.back()"
        >
          <ArrowLeft class="h-4 w-4" />
          Kembali
        </button>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-full bg-inverse px-5 py-3 text-sm font-medium text-inverse transition hover:bg-cyan-200"
        >
          <Home class="h-4 w-4" />
          Ke Beranda
        </RouterLink>
      </div>
    </div>
  </main>
</template>
