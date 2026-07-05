<script setup lang="ts">
import { ArrowUpRight, Github } from 'lucide-vue-next'
import type { Project } from '@/types/project'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-[28px] border border-subtle bg-card shadow-[0_20px_60px_-30px_rgba(8,145,178,0.45)] transition hover:-translate-y-1 hover:border-hover">
    <div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cyan-400/20 via-slate-900 to-amber-400/10">
      <img
        v-if="project.thumbnail_url"
        :src="project.thumbnail_url"
        :alt="project.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      >
      <div
        v-else
        class="flex h-full items-end bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.35),_transparent_55%),linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(2,6,23,1))] p-6"
      >
        <p class="font-display text-2xl text-primary">
          {{ project.title }}
        </p>
      </div>
      <span class="absolute left-5 top-5 rounded-full border border-subtle bg-elevated/80 px-3 py-1 text-xs uppercase tracking-[0.25em] text-accent">
        {{ project.category }}
      </span>
    </div>

    <div class="flex flex-1 flex-col gap-5 p-6">
      <div class="space-y-3">
        <div class="flex items-start justify-between gap-4">
          <h3 class="font-display text-2xl text-primary">
            {{ project.title }}
          </h3>
          <span
            v-if="project.is_featured"
            class="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-amber-200"
          >
            Featured
          </span>
        </div>
        <p class="text-sm leading-7 text-secondary">
          {{ project.description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="item in project.tech_stack"
          :key="item"
          class="rounded-full border border-subtle px-3 py-1 text-xs text-secondary"
        >
          {{ item }}
        </span>
      </div>

      <div class="mt-auto flex flex-wrap items-center gap-3 pt-2">
        <RouterLink
          :to="`/projects/${project.slug}`"
          class="inline-flex items-center gap-2 rounded-full bg-inverse px-4 py-2 text-sm font-medium text-inverse transition hover:brightness-110 active:brightness-90"
        >
          Lihat Detail
          <ArrowUpRight class="h-4 w-4" />
        </RouterLink>

        <a
          v-if="project.demo_url"
          :href="project.demo_url"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-primary transition hover:border-hover hover:text-accent"
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
    </div>
  </article>
</template>
