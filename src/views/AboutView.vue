<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { MapPin, Globe, Quote, Mail, Github, Linkedin, Gamepad2, Music, Dumbbell, Palette, Users, Coffee } from 'lucide-vue-next'
import GundamHead from '@/components/icons/GundamHead.vue'
import Crosshair from '@/components/icons/Crosshair.vue'
import MechaDatapad from '@/components/icons/MechaDatapad.vue'
import { useProfileStore } from '@/stores/profile'
import { useHobbiesStore } from '@/stores/hobbies'
import { useScrollReveal } from '@/composables/useScrollReveal'

useHead({
  title: 'Pilot Profile | Muhamad Ikhsan Ramadhan',
  meta: [
    { name: 'description', content: 'Profil Muhamad Ikhsan Ramadhan - RX-78-2 class Full Stack Web Developer.' },
  ],
})

const profileStore = useProfileStore()
const hobbiesStore = useHobbiesStore()

const { elRef: bioRef, isVisible: bioVisible } = useScrollReveal(0.05)
const { elRef: hobbiesRef, isVisible: hobbiesVisible } = useScrollReveal(0.05)

const categoryIcons: Record<string, object> = {
  coding: Crosshair,
  gaming: Gamepad2,
  reading: MechaDatapad,
  music: Music,
  sports: Dumbbell,
  art: Palette,
  community: Users,
  other: Coffee,
}

const categoryColors: Record<string, string> = {
  coding: 'from-blue-500/20 to-cyan-500/10',
  gaming: 'from-rose-500/20 to-orange-500/10',
  reading: 'from-amber-500/20 to-yellow-500/10',
  music: 'from-purple-500/20 to-pink-500/10',
  sports: 'from-emerald-500/20 to-teal-500/10',
  art: 'from-fuchsia-500/20 to-rose-500/10',
  community: 'from-sky-500/20 to-indigo-500/10',
  other: 'from-slate-500/20 to-gray-500/10',
}

onMounted(() => {
  if (!profileStore.profile) profileStore.fetchProfile()
  if (!hobbiesStore.hobbies.length) hobbiesStore.fetchHobbies()
})
</script>

<template>
  <main class="pb-20">
    <!-- Pilot Profile Hero -->
    <section class="container px-6 pt-10 pb-6 lg:pb-8">
      <div class="relative overflow-hidden rounded-[36px] border border-subtle bg-elevated px-8 py-10 hero-glow lg:px-12 lg:py-14 hex-grid">
        <div class="caution-solid absolute top-0 left-0 right-0 h-1.5 opacity-60 dark:opacity-100" />
        <div class="caution-solid absolute bottom-0 left-0 right-0 h-1.5 opacity-60 dark:opacity-100" />

        <!-- Gundam head watermark -->
        <div class="pointer-events-none absolute right-0 bottom-0 h-48 w-48 opacity-[0.04] dark:opacity-[0.07] lg:h-64 lg:w-64">
          <GundamHead />
        </div>

        <div class="corner-bracket corner-tl" />
        <div class="corner-bracket corner-tr" />
        <div class="corner-bracket corner-bl" />
        <div class="corner-bracket corner-br" />

        <div class="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <!-- Avatar -->
          <div class="flex shrink-0 justify-center lg:justify-start">
            <div class="relative flex h-36 w-36 items-center justify-center rounded-[28px] border-2 border-accent/50 bg-gradient-to-br from-accent/20 to-gundam-red/10 lg:h-44 lg:w-44">
              <span class="text-5xl font-bold text-accent font-display lg:text-6xl">SD</span>
              <div class="corner-bracket corner-tl" style="width:12px;height:12px;" />
              <div class="corner-bracket corner-br" style="width:12px;height:12px;" />
            </div>
          </div>

          <!-- Info -->
          <div class="flex-1 space-y-5">
            <div class="flex items-center gap-3">
              <div class="v-fin">
                <svg width="28" height="12" viewBox="0 0 40 18">
                  <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
                </svg>
              </div>
              <span class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-bg px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-accent">
                <GundamHead class="h-3.5 w-auto" />
                Pilot Profile
              </span>
            </div>

            <div v-if="profileStore.isLoading" class="space-y-3">
              <div class="h-10 w-64 animate-pulse rounded-full bg-card-hover" />
              <div class="h-6 w-48 animate-pulse rounded-full bg-card-hover" />
              <div class="h-5 w-72 animate-pulse rounded-full bg-card-hover" />
            </div>

            <template v-else-if="profileStore.profile">
              <div>
                <h1 class="font-display text-3xl text-primary md:text-4xl lg:text-5xl">
                  {{ profileStore.profile.name }}
                  <span class="text-gundam-red">.</span>
                </h1>
                <p class="mt-1 text-lg text-accent font-tech tracking-wide md:text-xl">
                  {{ profileStore.profile.title }}
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted font-tech">
                <span v-if="profileStore.profile.location" class="inline-flex items-center gap-1.5">
                  <MapPin class="h-4 w-4" />
                  {{ profileStore.profile.location }}
                </span>
                <span v-if="profileStore.profile.languages?.length" class="inline-flex items-center gap-1.5">
                  <Globe class="h-4 w-4" />
                  {{ profileStore.profile.languages.join(', ') }}
                </span>
              </div>

              <div v-if="profileStore.profile.motto" class="border-l-2 border-gundam-yellow/50 pl-4">
                <p class="text-sm italic text-gundam-yellow/80 font-tech leading-relaxed">
                  <Quote class="mr-1 inline h-3.5 w-3.5 opacity-60" />
                  "{{ profileStore.profile.motto }}"
                </p>
              </div>
            </template>

            <!-- Social links -->
            <div v-if="profileStore.profile?.social_links?.length" class="flex flex-wrap gap-2">
              <a
                v-for="link in profileStore.profile.social_links"
                :key="link.platform"
                :href="link.url"
                target="_blank"
                rel="noreferrer"
                class="inline-flex items-center gap-1.5 rounded-full border border-subtle px-3.5 py-1.5 text-xs text-secondary transition hover:border-hover hover:text-accent"
              >
                <Github v-if="link.platform.toLowerCase() === 'github'" class="h-3.5 w-3.5" />
                <Linkedin v-else-if="link.platform.toLowerCase() === 'linkedin'" class="h-3.5 w-3.5" />
                <Mail v-else-if="link.platform.toLowerCase() === 'email'" class="h-3.5 w-3.5" />
                {{ link.platform }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pilot File (Bio) -->
    <section
      ref="bioRef"
      class="container px-6 pt-24"
      :class="bioVisible ? 'reveal visible' : 'reveal'"
    >
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
            <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
          </svg>
          <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
            Pilot File
          </p>
        </div>
        <h2 class="mt-3 font-display text-4xl text-primary">
          Service Record
        </h2>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <!-- Bio text -->
        <div v-if="profileStore.isLoading" class="space-y-3">
          <div v-for="i in 4" :key="i" class="h-5 animate-pulse rounded-full bg-card-hover" :style="{ width: `${60 + i * 10}%` }" />
        </div>
        <div v-else-if="profileStore.profile?.bio" class="relative rounded-[28px] border border-subtle bg-card p-6 md:p-8 panel-line card-accent">
          <div class="corner-bracket corner-tl" style="width:14px;height:14px;" />
          <div class="corner-bracket corner-br" style="width:14px;height:14px;" />
          <p class="text-base leading-8 text-secondary font-tech whitespace-pre-line">
            {{ profileStore.profile.bio }}
          </p>
        </div>

        <!-- Mission Stats -->
        <div v-if="profileStore.profile?.stats?.length" class="flex flex-col gap-4">
          <p class="text-xs uppercase tracking-[0.3em] text-muted font-display">
            Mission Stats
          </p>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(stat, idx) in profileStore.profile.stats"
              :key="idx"
              class="relative overflow-hidden rounded-[20px] border border-subtle bg-card p-4 panel-line card-accent"
            >
              <div class="absolute right-0 top-0 w-10 h-10 bg-accent/5 rounded-bl-full" />
              <div class="corner-bracket corner-tl" style="width:10px;height:10px;" />
              <p class="text-3xl font-bold text-primary font-display">
                {{ stat.value }}
              </p>
              <p class="mt-0.5 text-xs text-muted font-tech">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Off-Duty / Hobbies -->
    <section
      ref="hobbiesRef"
      class="container px-6 pt-24"
      :class="hobbiesVisible ? 'reveal visible' : 'reveal'"
    >
      <div class="mb-10">
        <div class="flex items-center gap-3 mb-2">
          <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
            <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
          </svg>
          <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
            Off-Duty Activities
          </p>
        </div>
        <h2 class="mt-3 font-display text-4xl text-primary">
          Hangar Log
        </h2>
      </div>

      <div
        v-if="hobbiesStore.isLoading"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="h-48 animate-pulse rounded-[24px] border border-subtle bg-card"
        />
      </div>

      <div
        v-else-if="hobbiesStore.hobbies.length === 0"
        class="rounded-[28px] border border-dashed border-subtle px-6 py-16 text-center"
      >
        <p class="text-sm text-muted">Belum ada data kegiatan.</p>
      </div>

      <div
        v-else
        class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="hobby in hobbiesStore.hobbies"
          :key="hobby.id"
          class="group relative flex flex-col overflow-hidden rounded-[24px] border border-subtle bg-card p-6 transition hover:border-hover hover:shadow-[0_0_30px_-12px_var(--color-hero-glow)] panel-line"
        >
          <div class="absolute right-0 top-0 h-20 w-20 rounded-bl-full transition"
            :class="categoryColors[hobby.category] || categoryColors.other"
          />
          <div class="corner-bracket corner-tl" style="width:12px;height:12px;" />
          <div class="corner-bracket corner-br" style="width:12px;height:12px;" />

          <div class="relative z-[1] flex items-center gap-3 mb-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-bg">
              <component :is="categoryIcons[hobby.category] || categoryIcons.other" class="h-5 w-5 text-accent" />
            </div>
            <div class="flex min-w-0 flex-col">
              <h3 class="text-base font-semibold text-primary font-tech truncate">
                {{ hobby.name }}
              </h3>
              <span class="text-[10px] uppercase tracking-[0.2em] text-accent font-display">
                {{ hobby.category }}
              </span>
            </div>
          </div>

          <p v-if="hobby.description" class="relative z-[1] text-sm text-secondary font-tech leading-6 flex-1">
            {{ hobby.description }}
          </p>

          <div v-if="hobby.level != null" class="relative z-[1] mt-4 pt-3 border-t border-subtle">
            <div class="mb-1.5 flex items-center justify-between text-xs">
              <span class="text-muted font-tech">Proficiency</span>
              <span class="text-muted font-tech">{{ hobby.level }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-card-hover">
              <div
                class="h-full rounded-full transition-all duration-700"
                :class="hobby.level >= 80 ? 'bg-accent' : hobby.level >= 50 ? 'bg-gundam-yellow' : 'bg-gundam-red'"
                :style="{ width: `${hobby.level}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="container px-6 pt-24">
      <div class="relative overflow-hidden rounded-[32px] border border-subtle bg-elevated px-8 py-12 text-center hex-grid">
        <div class="caution-solid absolute top-0 left-0 right-0 h-1 opacity-40 dark:opacity-80" />
        <div class="corner-bracket corner-tl" />
        <div class="corner-bracket corner-br" />

        <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
          Hailing Frequency
        </p>
        <h2 class="mt-3 font-display text-3xl text-primary">
          Ready for Deployment
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-base text-secondary font-tech">
          Tertarik bekerja sama? Kirim pesan langsung melalui Command Center.
        </p>
        <RouterLink
          to="/#contact"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:brightness-90 btn-glow"
        >
          Hubungi Saya
        </RouterLink>
      </div>
    </section>
  </main>
</template>
