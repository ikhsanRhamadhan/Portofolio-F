<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-app text-primary">
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(251,191,36,0.12),_transparent_28%)]" />
    <div class="relative">
      <SiteHeader />
      <router-view v-slot="{ Component }">
        <transition
          name="page"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <footer class="container px-6 pb-10 pt-16 text-sm text-muted">
        <div class="flex flex-col gap-6 border-t border-subtle pt-6 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-col gap-2">
            <p>&copy; 2026 Saka Developer. Built with Laravel API and Vue SPA.</p>
            <div class="flex items-center gap-3">
              <a
                href="https://github.com/sakadev"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent"
              >
                <Github class="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sakadev"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent"
              >
                <Linkedin class="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:saka@example.com"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent"
              >
                <Mail class="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <RouterLink
              to="/blog"
              class="transition hover:text-accent"
            >
              Blog
            </RouterLink>
            <RouterLink
              to="/admin/login"
              class="flex items-center gap-1 text-xs text-muted transition hover:text-accent"
            >
              Admin
              <ExternalLink class="h-3 w-3" />
            </RouterLink>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
