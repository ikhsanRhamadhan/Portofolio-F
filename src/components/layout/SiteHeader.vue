<script setup lang="ts">
import { ref } from 'vue'
import { MoonStar, SunMedium, Menu, X, Cpu } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const route = useRoute()
const { isDark, toggleTheme } = useTheme()

const isMobileOpen = ref(false)

const links = [
  { label: 'Beranda', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
]

const isActive = (to: string) => route.path === to

const closeMobile = () => {
  isMobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-subtle bg-header backdrop-blur">
    <div class="container flex items-center justify-between px-6 py-4">
      <RouterLink
        to="/"
        class="flex items-center gap-3"
        @click="closeMobile"
      >
        <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-accent/50 bg-accent/10 text-sm font-bold text-accent">
          <Cpu class="h-5 w-5" />
        </span>
        <div>
          <p class="font-display text-lg tracking-wide text-primary">
            Saka<span class="text-gundam-red">.</span>Dev
          </p>
          <p class="text-[10px] uppercase tracking-[0.35em] text-muted font-tech">
            Mobile Suit Developer
          </p>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3">
        <!-- Desktop nav -->
        <nav class="hidden items-center gap-2 rounded-full border border-subtle bg-card px-2 py-2 md:flex">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-4 py-2 text-sm transition font-tech"
            :class="isActive(link.to) ? 'bg-accent text-white' : 'text-secondary hover:bg-card-hover hover:text-primary'"
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-card text-secondary transition hover:bg-card-hover"
          @click="toggleTheme"
        >
          <SunMedium
            v-if="isDark"
            class="h-5 w-5"
          />
          <MoonStar
            v-else
            class="h-5 w-5"
          />
        </button>

        <!-- Mobile menu toggle -->
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-subtle bg-card text-secondary transition hover:bg-card-hover md:hidden"
          @click="isMobileOpen = !isMobileOpen"
        >
          <Menu
            v-if="!isMobileOpen"
            class="h-5 w-5"
          />
          <X
            v-else
            class="h-5 w-5"
          />
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <div
      v-if="isMobileOpen"
      class="border-t border-subtle bg-elevated px-6 py-4 md:hidden"
    >
      <nav class="flex flex-col gap-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-xl px-4 py-3 text-sm transition font-tech"
          :class="isActive(link.to) ? 'bg-accent-bg text-accent' : 'text-secondary hover:bg-card-hover hover:text-primary'"
          @click="closeMobile"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
