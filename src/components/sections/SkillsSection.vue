<script setup lang="ts">
import { computed } from 'vue'
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

onMounted(() => {
  if (!skillsStore.skills.length) {
    skillsStore.fetchSkills()
  }
})
</script>

<template>
  <section class="container px-6 pt-20">
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-2">
        <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
          <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
        </svg>
        <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
          Weapon Systems
        </p>
      </div>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Tech Arsenal
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
        class="relative overflow-hidden rounded-[24px] border border-subtle bg-card p-6 panel-line"
      >
        <div class="corner-bracket corner-tl" style="width:14px;height:14px;" />
        <div class="corner-bracket corner-br" style="width:14px;height:14px;" />
        <div class="absolute top-0 right-0 h-10 w-10 caution-stripe opacity-40" />
        <h3 class="font-display text-lg text-primary">
          {{ category }}
        </h3>
        <div class="mt-4 space-y-4">
          <div
            v-for="skill in items"
            :key="skill.id"
          >
            <div class="mb-1 flex items-center justify-between">
              <span class="text-sm text-secondary font-tech">{{ skill.name }}</span>
              <span class="text-xs text-muted font-tech">{{ skill.level }}%</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-card-hover">
              <div
                class="beam-saber h-full rounded-full transition-all duration-700"
                :class="skill.level >= 80 ? 'bg-accent' : skill.level >= 50 ? 'bg-gundam-yellow' : 'bg-gundam-red'"
                :style="{ width: `${skill.level}%` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
