<script setup lang="ts">
import { onMounted } from 'vue'
import { useSkillsStore } from '@/stores/skills'

const skillsStore = useSkillsStore()

const skillCategories = computed(() => {
  const map = new Map<string, typeof skillsStore.skills>()
  for (const skill of skillsStore.skills) {
    if (!map.has(skill.category)) {
      map.set(skill.category, [])
    }
    map.get(skill.category)!.push(skill)
  }
  return map
})

import { computed } from 'vue'
</script>

<template>
  <section class="container px-6 pt-20">
    <div class="mb-10">
      <p class="text-sm uppercase tracking-[0.35em] text-accent">
        Keahlian
      </p>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Tech Stack & Kemampuan
      </h2>
    </div>

    <div
      v-if="skillsStore.isLoading"
      class="flex items-center justify-center py-12"
    >
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>

    <div
      v-else
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="[category, items] in skillCategories"
        :key="category"
        class="rounded-[24px] border border-subtle bg-card p-6"
      >
        <h3 class="font-display text-lg text-primary">
          {{ category }}
        </h3>
        <div class="mt-4 space-y-4">
          <div
            v-for="skill in items"
            :key="skill.id"
          >
            <div class="mb-1 flex items-center justify-between">
              <span class="text-sm text-secondary">{{ skill.name }}</span>
              <span class="text-xs text-muted">{{ skill.level }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-card-hover">
              <div
                class="h-full rounded-full bg-accent transition-all duration-700"
                :style="{ width: `${skill.level}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
