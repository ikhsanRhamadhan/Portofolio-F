<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Download, Mail, Github, Linkedin } from 'lucide-vue-next'
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
import { useScrollReveal } from '@/composables/useScrollReveal'

useHead({
  title: 'Saka Developer | Full Stack Web Developer',
  meta: [
    { name: 'description', content: 'Portfolio Saka Developer - Full Stack Web Developer spesialisasi Laravel, Vue, dan aplikasi web modern.' },
  ],
})

const projectsStore = useProjectsStore()
const skillsStore = useSkillsStore()
const experiencesStore = useExperiencesStore()
const educationsStore = useEducationsStore()
const certificationsStore = useCertificationsStore()

const stats = [
  { label: 'Tahun Pengalaman', value: '5+' },
  { label: 'Proyek Selesai', value: '28' },
  { label: 'Klien & Tim', value: '14' },
]

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/sakadev', icon: Github },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/sakadev', icon: Linkedin },
  { label: 'Email', url: 'mailto:saka@example.com', icon: Mail },
]

const { elRef: projectsRef, isVisible: projectsVisible } = useScrollReveal(0.05)
const { elRef: skillsRef, isVisible: skillsVisible } = useScrollReveal(0.05)
const { elRef: timelineRef, isVisible: timelineVisible } = useScrollReveal(0.05)
const { elRef: certsRef, isVisible: certsVisible } = useScrollReveal(0.05)
const { elRef: contactRef, isVisible: contactVisible } = useScrollReveal(0.05)

const downloadCV = () => {
  window.open('/cv-saka-dev.pdf', '_blank')
}

onMounted(() => {
  if (!projectsStore.featuredProjects.length) {
    projectsStore.fetchFeaturedProjects()
  }
  if (!skillsStore.skills.length) {
    skillsStore.fetchSkills()
  }
  if (!experiencesStore.experiences.length) {
    experiencesStore.fetchExperiences()
  }
  if (!educationsStore.educations.length) {
    educationsStore.fetchEducations()
  }
  if (!certificationsStore.certifications.length) {
    certificationsStore.fetchCertifications()
  }
})
</script>

<template>
  <main class="pb-20">
    <!-- Hero -->
    <section class="container px-6 pt-10 reveal">
      <div class="grid gap-10 rounded-[36px] border border-subtle bg-elevated px-8 py-10 shadow-[0_40px_120px_-60px_rgba(6,182,212,0.55)] lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-accent-bg px-4 py-2 text-xs uppercase tracking-[0.35em] text-accent">
            <Code2 class="h-4 w-4" />
            Software Developer Portfolio
          </div>

          <div class="space-y-5">
            <p class="text-sm uppercase tracking-[0.4em] text-muted">
              Halo, saya
            </p>
            <h1 class="font-display text-5xl leading-none text-primary md:text-6xl">
              Saka Developer
            </h1>
            <p class="text-2xl font-medium text-accent md:text-3xl">
              Full Stack Web Developer
            </p>
            <p class="max-w-2xl text-base leading-8 text-secondary md:text-lg">
              Saya membangun aplikasi web modern berbasis Laravel dan Vue dengan fokus pada performa, pengalaman pengguna, dan kemudahan maintenance jangka panjang.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 rounded-full bg-inverse px-5 py-3 text-sm font-medium text-inverse transition hover:bg-cyan-200"
            >
              Lihat Proyek
              <ArrowDownRight class="h-4 w-4" />
            </a>
            <a
              href="#contact"
              class="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm text-primary transition hover:border-cyan-400/30 hover:text-accent"
            >
              Hubungi Saya
              <Mail class="h-4 w-4" />
            </a>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-full border border-subtle px-5 py-3 text-sm text-primary transition hover:border-cyan-400/30 hover:text-accent"
              @click="downloadCV"
            >
              Download CV
              <Download class="h-4 w-4" />
            </button>
          </div>

          <div class="flex items-center gap-4 pt-2">
            <a
              v-for="link in socialLinks"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noreferrer"
              class="flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-cyan-400/30 hover:text-accent"
            >
              <component :is="link.icon" class="h-4 w-4" />
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="grid gap-4 self-end md:grid-cols-3 lg:grid-cols-1">
          <!-- Profile Photo -->
          <div class="overflow-hidden rounded-[28px] border border-subtle bg-card p-6">
            <div class="flex items-center gap-4">
              <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 to-amber-400/10">
                <span class="text-3xl font-semibold text-accent">SD</span>
              </div>
              <div>
                <p class="text-sm font-medium text-primary">
                  Saka Developer
                </p>
                <p class="text-xs text-muted">
                  Full Stack Web Developer
                </p>
              </div>
            </div>
          </div>

          <div class="grid gap-4 md:col-span-2 lg:col-span-1">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-[28px] border border-subtle bg-card p-5"
            >
              <p class="text-4xl font-semibold text-primary">
                {{ stat.value }}
              </p>
              <p class="mt-2 text-sm text-muted">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section
      id="projects"
      ref="projectsRef"
      class="container px-6 pt-20"
      :class="projectsVisible ? 'reveal visible' : 'reveal'"
    >
      <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="text-sm uppercase tracking-[0.35em] text-accent">
            Proyek Pilihan
          </p>
          <h2 class="mt-3 font-display text-4xl text-primary">
            Featured Projects
          </h2>
        </div>
        <RouterLink
          to="/projects"
          class="inline-flex items-center gap-2 self-start rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-hover hover:text-accent"
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

    <!-- Skills -->
    <div
      ref="skillsRef"
      :class="skillsVisible ? 'reveal visible' : 'reveal'"
    >
      <SkillsSection />
    </div>

    <!-- Timeline -->
    <div
      ref="timelineRef"
      :class="timelineVisible ? 'reveal visible' : 'reveal'"
    >
      <TimelineSection
        :experiences="experiencesStore.experiences"
        :educations="educationsStore.educations"
      />
    </div>

    <!-- Certifications -->
    <div
      ref="certsRef"
      :class="certsVisible ? 'reveal visible' : 'reveal'"
    >
      <CertificationsSection :certifications="certificationsStore.certifications" />
    </div>

    <!-- Contact -->
    <div
      ref="contactRef"
      :class="contactVisible ? 'reveal visible' : 'reveal'"
    >
      <ContactSection />
    </div>
  </main>
</template>
