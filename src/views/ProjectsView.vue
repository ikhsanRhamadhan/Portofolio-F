<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectFilterBar from '@/components/projects/ProjectFilterBar.vue'
import ProjectSkeletonGrid from '@/components/projects/ProjectSkeletonGrid.vue'
import { useProjectsStore } from '@/stores/projects'

const projectsStore = useProjectsStore()
const selectedCategory = ref('Semua')

const activeCategory = computed(() =>
  selectedCategory.value === 'Semua' ? undefined : selectedCategory.value
)

const loadProjects = () => {
  projectsStore.fetchProjects({
    category: activeCategory.value,
  })
}

watch(activeCategory, loadProjects)

onMounted(() => {
  loadProjects()
})
</script>

<template>
  <main class="container px-6 py-10">
    <section class="space-y-6">
      <div class="max-w-3xl space-y-4">
        <p class="text-sm uppercase tracking-[0.35em] text-accent">
          Portfolio Projects
        </p>
        <h1 class="font-display text-5xl text-primary">
          Implementasi frontend Vue untuk modul `Projects`
        </h1>
        <p class="text-base leading-8 text-secondary">
          Halaman ini mengambil data langsung dari endpoint `GET /api/projects`, mendukung filter kategori, loading state, dan detail route per slug.
        </p>
      </div>

      <ProjectFilterBar
        :categories="projectsStore.categories"
        :selected-category="selectedCategory"
        @change="selectedCategory = $event"
      />

      <div
        v-if="projectsStore.errorMessage"
        class="rounded-[24px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
      >
        {{ projectsStore.errorMessage }}
      </div>

      <ProjectSkeletonGrid v-else-if="projectsStore.isListLoading" />

      <div
        v-else-if="projectsStore.hasProjects"
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <ProjectCard
          v-for="project in projectsStore.projects"
          :key="project.id"
          :project="project"
        />
      </div>

      <div
        v-else
        class="rounded-[28px] border border-dashed border-subtle px-6 py-12 text-center text-sm text-muted"
      >
        Belum ada proyek yang cocok dengan filter saat ini.
      </div>
    </section>
  </main>
</template>
