<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  categories: string[]
  selectedCategory: string
}>()

const emit = defineEmits<{
  (event: 'change', category: string): void
}>()

const options = computed(() => ['Semua', ...props.categories])
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <button
      v-for="category in options"
      :key="category"
      type="button"
      class="rounded-full border px-4 py-2 text-sm transition"
      :class="
        selectedCategory === category
          ? 'border-cyan-300 bg-cyan-300 text-slate-950'
          : 'border-subtle bg-card text-secondary hover:border-white/20 hover:bg-card-hover'
      "
      @click="emit('change', category)"
    >
      {{ category }}
    </button>
  </div>
</template>
