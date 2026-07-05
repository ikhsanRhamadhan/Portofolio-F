<script setup lang="ts">
import { Award, ExternalLink } from 'lucide-vue-next'
import type { Certification } from '@/types/certification'

defineProps<{
  certifications: Certification[]
}>()

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
}
</script>

<template>
  <section class="container px-6 pt-20">
    <div class="mb-10">
      <p class="text-sm uppercase tracking-[0.35em] text-accent">
        Sertifikasi
      </p>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Sertifikat & Kredensial
      </h2>
    </div>

    <div
      v-if="certifications.length === 0"
      class="rounded-[20px] border border-dashed border-subtle p-8 text-center text-sm text-muted"
    >
      Belum ada data sertifikasi.
    </div>

    <div
      v-else
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <a
        v-for="cert in certifications"
        :key="cert.id"
        :href="cert.credential_url || undefined"
        :target="cert.credential_url ? '_blank' : undefined"
        :rel="cert.credential_url ? 'noreferrer' : undefined"
        class="group flex items-start gap-4 rounded-[20px] border border-subtle bg-card p-5 transition hover:border-hover"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-bg">
          <Award class="h-5 w-5 text-accent" />
        </div>
        <div class="min-w-0 flex-1">
          <h3 class="text-sm font-medium text-primary">
            {{ cert.name }}
          </h3>
          <p class="text-xs text-muted">
            {{ cert.issuer }}
          </p>
          <p class="mt-0.5 text-xs text-muted">
            {{ formatDate(cert.issue_date) }}
          </p>
        </div>
        <ExternalLink
          v-if="cert.credential_url"
          class="mt-1 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent"
        />
      </a>
    </div>
  </section>
</template>
