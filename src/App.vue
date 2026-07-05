<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import { Github, Linkedin, Mail, ExternalLink, Cpu } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-app text-primary">
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
            <p class="font-tech">&copy; 2026 Muhamad Ikhsan Ramadhan. RX-78-2 class Software Engineer.</p>
            <div class="flex items-center gap-3">
              <a
                href="https://github.com/sakadev"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent font-tech"
              >
                <Github class="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sakadev"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent font-tech"
              >
                <Linkedin class="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:saka@example.com"
                class="flex items-center gap-1.5 text-muted transition hover:text-accent font-tech"
              >
                <Mail class="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <RouterLink
              to="/blog"
              class="transition hover:text-accent font-tech"
            >
              Field Logs
            </RouterLink>
            <RouterLink
              to="/admin/login"
              class="flex items-center gap-1 text-xs text-muted transition hover:text-accent font-tech"
            >
              <Cpu class="h-3 w-3" />
              Command Center
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
