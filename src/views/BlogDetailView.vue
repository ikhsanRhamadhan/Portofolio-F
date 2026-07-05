<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowLeft, Calendar } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()

const post = computed(() => blogStore.currentPost)

onMounted(async () => {
  await blogStore.fetchPost(route.params.slug as string)
})

useHead({
  title: computed(() => post.value ? `${post.value.title} - Blog` : 'Loading...'),
  meta: computed(() => post.value
    ? [
        { name: 'description', content: post.value.excerpt || '' },
        { property: 'og:title', content: post.value.title },
        { property: 'og:description', content: post.value.excerpt || '' },
      ]
    : [],
  ),
})

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <main class="container px-6 py-10">
    <RouterLink
      to="/blog"
      class="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm text-secondary transition hover:border-hover hover:text-accent"
    >
      <ArrowLeft class="h-4 w-4" />
      Kembali ke blog
    </RouterLink>

    <div
      v-if="blogStore.isDetailLoading"
      class="mt-8 mx-auto max-w-3xl space-y-6"
    >
      <div class="h-6 w-48 animate-pulse rounded-full bg-white/10" />
      <div class="h-12 w-full animate-pulse rounded-full bg-white/10" />
      <div class="space-y-3">
        <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-4/6 animate-pulse rounded-full bg-white/10" />
      </div>
    </div>

    <div
      v-else-if="blogStore.errorMessage"
      class="mt-8 rounded-[24px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
    >
      {{ blogStore.errorMessage }}
    </div>

    <article
      v-else-if="post"
      class="mx-auto mt-8 max-w-3xl"
    >
      <div
        v-if="post.thumbnail_url"
        class="mb-8 aspect-[16/7] overflow-hidden rounded-[32px]"
      >
        <img
          :src="post.thumbnail_url"
          :alt="post.title"
          class="h-full w-full object-cover"
        >
      </div>

      <div
        v-if="post.published_at"
        class="mb-4 flex items-center gap-2 text-sm text-muted"
      >
        <Calendar class="h-4 w-4" />
        {{ formatDate(post.published_at) }}
      </div>

      <h1 class="font-display text-5xl text-primary">
        {{ post.title }}
      </h1>

      <div
        v-if="post.content"
        class="mt-8 prose prose-invert max-w-none text-base leading-8 text-secondary"
      >
        {{ post.content }}
      </div>
    </article>
  </main>
</template>
