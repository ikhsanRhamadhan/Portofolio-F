<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowDownRight, ArrowUpRight, Code2, Download, Mail, Github, Linkedin } from 'lucide-vue-next'
import GundamHead from '@/components/icons/GundamHead.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectSkeletonGrid from '@/components/projects/ProjectSkeletonGrid.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import TimelineSection from '@/components/sections/TimelineSection.vue'
import CertificationsSection from '@/components/sections/CertificationsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { useProjectsStore } from '@/stores/projects'
import { useSkillsStore } from '@/stores/skills'
import { useExperiencesStore } from '@/stores/experiences'
import { useEducationsStore } from '@/stores/educations'
import { useCertificationsStore } from '@/stores/certifications'
import { useProfileStore } from '@/stores/profile'
import { useScrollReveal } from '@/composables/useScrollReveal'

useHead({
  title: 'Muhamad Ikhsan Ramadhan | Software Engineer',
  meta: [
    { name: 'description', content: 'Portfolio Muhamad Ikhsan Ramadhan - Software Engineer. Laravel & Vue Developer.' },
  ],
})

const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()
const experiencesStore = useExperiencesStore()
const educationsStore = useEducationsStore()
const certificationsStore = useCertificationsStore()
const profileStore = useProfileStore()

const { elRef: projectsRef, isVisible: projectsVisible } = useScrollReveal(0.05)
const { elRef: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.05)
const { elRef: timelineRef, isVisible: timelineVisible } = useScrollReveal(0.05)
const { elRef: certsRef, isVisible: certsVisible } = useScrollReveal(0.05)
const { elRef: contactRef, isVisible: contactVisible } = useScrollReveal(0.05)

const downloadCV = () => {
  window.open('/cv-saka-dev.pdf', '_blank')
}

onMounted(() => {
  if (!projectsStore.featuredProjects.length) projectsStore.fetchFeaturedProjects()
  if (!skillsStore.skills.length) skillsStore.fetchSkills()
  if (!experiencesStore.experiences.length) experiencesStore.fetchExperiences()
  if (!educationsStore.educations.length) educationsStore.fetchEducations()
  if (!certificationsStore.certifications.length) certificationsStore.fetchCertifications()
  if (!profileStore.profile) profileStore.fetchProfile()
})
</script>

<template>
  <main class="pb-20">
    <!-- Hero - Pilot Profile -->
    <section class="container px-6 pt-10">
      <div class="relative overflow-hidden rounded-[36px] border border-subtle bg-elevated px-8 py-10 hero-glow lg:px-12 lg:py-14 hex-grid">
        <!-- Top caution stripe -->
        <div class="caution-solid absolute top-0 left-0 right-0 h-1.5 opacity-60 dark:opacity-100" />

        <!-- Gundam head watermark -->
        <div class="pointer-events-none absolute right-0 bottom-0 h-48 w-48 opacity-[0.04] dark:opacity-[0.07] lg:h-64 lg:w-64">
          <GundamHead />
        </div>

        <!-- Corner brackets -->
        <div class="corner-bracket corner-tl" />
        <div class="corner-bracket corner-tr" />
        <div class="corner-bracket corner-bl" />
        <div class="corner-bracket corner-br" />

        <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="space-y-8">
            <!-- RX-78-2 Badge with V-fin -->
            <div class="flex items-center gap-3">
              <div class="v-fin">
                <svg width="40" height="18" viewBox="0 0 40 18">
                  <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
                  <polygon points="20,0 6,16 12,16 20,6 28,16 34,16" fill="var(--color-gundam-yellow)" opacity="0.5" />
                </svg>
              </div>
              <span class="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-bg px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent">
                <GundamHead class="h-3.5 w-auto" />
                RX-78-2 | Mobile Suit Developer
              </span>
            </div>

            <div class="space-y-5">
              <p class="text-sm uppercase tracking-[0.4em] text-muted font-tech">
                Pilot ID: SAKA-DEV-001
              </p>

              <div v-if="profileStore.isLoading" class="space-y-3">
                <div class="h-14 w-72 animate-pulse rounded-full bg-card-hover md:h-20 md:w-96" />
                <div class="h-8 w-56 animate-pulse rounded-full bg-card-hover" />
                <div class="h-6 w-96 animate-pulse rounded-full bg-card-hover" />
              </div>

              <template v-else-if="profileStore.profile">
                <h1 class="font-display text-5xl leading-none text-primary md:text-7xl">
                  {{ profileStore.profile.name }}<span class="text-gundam-red">.</span>
                </h1>
                <div class="flex items-center gap-3">
                  <p class="text-2xl font-medium text-accent md:text-3xl font-tech tracking-wide">
                    {{ profileStore.profile.title }}
                  </p>
                  <span class="hidden md:inline-flex items-center gap-1 rounded-full border border-gundam-yellow/30 bg-gundam-yellow/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gundam-yellow font-display">
                    RX-78-2
                  </span>
                </div>
                <p v-if="profileStore.profile.bio" class="max-w-2xl text-base leading-8 text-secondary md:text-lg font-tech">
                  {{ profileStore.profile.bio }}
                </p>
              </template>
            </div>

            <div class="flex flex-wrap gap-3">
              <a
                href="#projects"
                class="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:brightness-90 btn-glow"
              >
                Lihat Proyek
                <ArrowDownRight class="h-4 w-4" />
              </a>
              <a
                href="#contact"
                class="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm text-primary transition hover:border-hover hover:text-accent"
              >
                Hubungi Saya
                <Mail class="h-4 w-4" />
              </a>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm text-primary transition hover:border-hover hover:text-accent"
                @click="downloadCV"
              >
                Download CV
                <Download class="h-4 w-4" />
              </button>
            </div>

            <div v-if="profileStore.profile?.social_links?.length" class="flex items-center gap-4 pt-2">
              <a
                v-for="link in profileStore.profile.social_links"
                :key="link.platform"
                :href="link.url"
                target="_blank"
                rel="noreferrer"
                class="flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-hover hover:text-accent"
              >
                <Github v-if="link.platform.toLowerCase() === 'github'" class="h-4 w-4" />
                <Linkedin v-else-if="link.platform.toLowerCase() === 'linkedin'" class="h-4 w-4" />
                <Mail v-else-if="link.platform.toLowerCase() === 'email'" class="h-4 w-4" />
                {{ link.platform }}
              </a>
            </div>
          </div>

          <div class="grid gap-4 self-end md:grid-cols-3 lg:grid-cols-1">
            <!-- Profile card -->
            <div class="relative overflow-hidden rounded-[28px] border border-subtle bg-card p-6 panel-line">
              <div class="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-accent via-gundam-red to-gundam-yellow" />
              <div class="corner-bracket corner-tl" style="width:12px;height:12px;" />
              <div class="corner-bracket corner-br" style="width:12px;height:12px;" />
              <div class="flex items-center gap-4">
                <div class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-accent/50 bg-gradient-to-br from-accent/20 to-gundam-red/10">
                  <span class="text-3xl font-bold text-accent font-display">SD</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-primary">
                    {{ profileStore.profile?.name || 'Muhamad Ikhsan Ramadhan' }}
                  </p>
                  <p class="text-xs font-tech text-muted">
                    Pilot Rank: {{ profileStore.profile?.title || 'Full Stack' }}
                  </p>
                  <div class="flex items-center gap-1.5 mt-1">
                    <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span class="text-xs font-tech text-gundam-yellow">Status: Online</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 md:col-span-2 lg:col-span-1">
              <div
                v-for="(stat, idx) in (profileStore.profile?.stats || [])"
                :key="idx"
                class="relative rounded-[28px] border border-subtle bg-card p-5 overflow-hidden group hover:border-hover transition card-accent"
              >
                <div class="absolute right-0 top-0 w-16 h-16 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition" />
                <div class="flex items-center gap-3">
                  <span class="text-xs font-display text-muted tracking-wider">{{ String(idx + 1).padStart(2, '0') }}</span>
                  <p class="text-4xl font-bold text-primary font-display">
                    {{ stat.value }}
                  </p>
                </div>
                <p class="mt-1 text-sm text-muted font-tech">
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom caution stripe -->
        <div class="caution-solid absolute bottom-0 left-0 right-0 h-1.5 opacity-60 dark:opacity-100" />
      </div>
    </section>

    <!-- Armory (Projects) -->
    <section
      id="projects"
      ref="projectsRef"
      class="container px-6 pt-20"
      :class="projectsVisible ? 'reveal visible' : 'reveal'"
    >
      <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
              <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
            </svg>
            <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
              Armory
            </p>
          </div>
          <h2 class="mt-3 font-display text-4xl text-primary">
            Mobile Suits
          </h2>
        </div>
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 self-start rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-hover hover:text-accent font-tech"
        >
          Semua Proyek
          <ArrowUpRight class="h-4 w-4" />
        </RouterLink>
      </div>

      <ProjectSkeletonGrid v-if="projectsStore.isFeaturedLoading" />

      <div
        v-else
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <ProjectCard
          v-for="project in projectsStore.featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </section>

    <!-- Weapon Systems (Skills) -->
    <div
      ref="skillsRef"
      :class="skillsVisible ? 'reveal visible' : 'reveal'"
    >
      <SkillsSection />
    </div>

    <!-- Battle Record (Timeline) -->
    <div
      ref="timelineRef"
      :class="timelineVisible ? 'reveal visible' : 'reveal'"
    >
      <TimelineSection
        :experiences="experiencesStore.experiences"
        :educations="educationsStore.educations"
      />
    </div>

    <!-- Combat Credentials (Certifications) -->
    <div
      ref="certsRef"
      :class="certsVisible ? 'reveal visible' : 'reveal'"
    >
      <CertificationsSection :certifications="certificationsStore.certifications" />
    </div>

    <!-- Hailing Frequency (Contact) -->
    <div
      ref="contactRef"
      :class="contactVisible ? 'reveal visible' : 'reveal'"
    >
      <ContactSection />
    </div>
  </main>
</template>
