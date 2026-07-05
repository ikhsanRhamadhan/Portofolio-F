<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const route = useRoute()
const projectsStore = useProjectsStore()

const project = computed(() => projectsStore.currentProject)

onMounted(() => {
  projectsStore.fetchProject(route.params.slug as string)
})
</script>

<template>
  <main class="container px-6 py-10">
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-hover hover:text-accent"
    >
      <ArrowLeft class="h-4 w-4" />
      Kembali ke daftar proyek
    </RouterLink>

    <div
      v-if="projectsStore.isDetailLoading"
      class="mt-8 overflow-hidden rounded-[32px] border border-subtle bg-card"
    >
      <div class="aspect-[16/7] animate-pulse bg-white/10" />
      <div class="space-y-4 p-8">
        <div class="h-5 w-24 animate-pulse rounded-full bg-white/10" />
        <div class="h-10 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>

    <div
      v-else-if="projectsStore.errorMessage"
      class="mt-8 rounded-[24px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
    >
      {{ projectsStore.errorMessage }}
    </div>

    <article
      v-else-if="project"
      class="mt-8 overflow-hidden rounded-[32px] border border-subtle bg-card"
    >
      <div class="aspect-[16/7] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.32),_transparent_35%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(2,6,23,0.95))]">
        <img
          v-if="project.thumbnail_url"
          :src="project.thumbnail_url"
          :alt="project.title"
          class="h-full w-full object-cover"
        >
      </div>

      <div class="grid gap-10 p-8 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-accent">
            {{ project.category }}
          </p>
          <h1 class="mt-3 font-display text-5xl text-primary">
            {{ project.title }}
          </h1>
          <p class="mt-6 text-base leading-8 text-secondary">
            {{ project.description }}
          </p>
        </div>

        <aside class="space-y-6 rounded-[28px] border border-subtle bg-elevated/60 p-6">
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-muted">
              Tech Stack
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="item in project.tech_stack"
                :key="item"
                class="rounded-full border border-subtle px-3 py-1 text-xs text-secondary"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <a
              v-if="project.demo_url"
              :href="project.demo_url"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-full bg-inverse px-4 py-2 text-sm font-medium text-inverse transition hover:bg-cyan-200"
            >
              Live Demo
              <ArrowUpRight class="h-4 w-4" />
            </a>
            <a
              v-if="project.github_url"
              :href="project.github_url"
              target="_blank"
              rel="noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-primary transition hover:border-hover hover:text-accent"
            >
              Source Code
              <Github class="h-4 w-4" />
            </a>
          </div>
        </aside>
      </div>
    </article>
  </main>
</template>
