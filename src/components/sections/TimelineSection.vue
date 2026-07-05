<script setup lang="ts">
import { BriefcaseBusiness, GraduationCap } from 'lucide-vue-next'
import type { Experience } from '@/types/experience'
import type { Education } from '@/types/education'

defineProps<{
  experiences: Experience[]
  educations: Education[]
}>()

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return 'Sekarang'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}
</script>

<template>
  <section class="container px-6 pt-20">
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-2">
        <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
          <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
        </svg>
        <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
          Battle Record
        </p>
      </div>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Deployment History
      </h2>
    </div>

    <div class="grid gap-10 lg:grid-cols-2">
      <div>
        <div class="mb-6 flex items-center gap-3">
          <BriefcaseBusiness class="h-5 w-5 text-accent" />
          <h3 class="font-display text-xl text-primary">
            Combat Missions
          </h3>
        </div>

        <div
          v-if="experiences.length === 0"
          class="rounded-[20px] border border-dashed border-subtle p-6 text-center text-sm text-muted"
        >
          Belum ada data pengalaman.
        </div>

        <div
          v-for="exp in experiences"
          v-else
          :key="exp.id"
          class="relative border-l-2 border-accent/30 pl-6 pb-8 last:pb-0"
        >
          <div class="absolute left-[-6.5px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-elevated" />
          <div class="relative overflow-hidden rounded-[20px] border border-subtle bg-card p-5 panel-line">
            <div class="mb-1 flex items-center gap-2">
              <span
                v-if="exp.is_current"
                class="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300 font-display"
              >
                Active
              </span>
            </div>
            <h4 class="text-lg font-medium text-primary font-tech">
              {{ exp.position }}
            </h4>
            <p class="text-sm text-accent font-tech">
              {{ exp.company }}
            </p>
            <p class="mt-1 text-xs text-muted font-tech">
              {{ formatDate(exp.start_date) }} — {{ formatDate(exp.end_date) }}
            </p>
            <p class="mt-3 text-sm leading-7 text-secondary font-tech">
              {{ exp.description }}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div class="mb-6 flex items-center gap-3">
          <GraduationCap class="h-5 w-5 text-accent" />
          <h3 class="font-display text-xl text-primary">
            Training Academy
          </h3>
        </div>

        <div
          v-if="educations.length === 0"
          class="rounded-[20px] border border-dashed border-subtle p-6 text-center text-sm text-muted"
        >
          Belum ada data pendidikan.
        </div>

        <div
          v-for="edu in educations"
          v-else
          :key="edu.id"
          class="relative border-l-2 border-accent/30 pl-6 pb-8 last:pb-0"
        >
          <div class="absolute left-[-6.5px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-elevated" />
          <div class="relative overflow-hidden rounded-[20px] border border-subtle bg-card p-5 panel-line">
            <h4 class="text-lg font-medium text-primary font-tech">
              {{ edu.degree }}
            </h4>
            <p class="text-sm text-accent font-tech">
              {{ edu.institution }}
            </p>
            <p class="mt-1 text-xs text-muted font-tech">
              {{ edu.field_of_study }}
            </p>
            <p class="mt-1 text-xs text-muted font-tech">
              {{ formatDate(edu.start_date) }} — {{ formatDate(edu.end_date) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
