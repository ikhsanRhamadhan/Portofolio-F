<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowUpRight, Calendar } from 'lucide-vue-next'
import { useBlogStore } from '@/stores/blog'

const blogStore = useBlogStore()

useHead({
  title: 'Blog - Muhamad Ikhsan Ramadhan',
  meta: [
    { name: 'description', content: 'Blog tentang pengembangan web, Laravel, Vue, dan teknologi terkini.' },
  ],
})

onMounted(() => {
  blogStore.fetchPosts()
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
    <section class="space-y-6">
      <div class="max-w-3xl space-y-4">
        <p class="text-sm uppercase tracking-[0.35em] text-accent">
          Blog
        </p>
        <h1 class="font-display text-5xl text-primary">
          Artikel & Tulisan
        </h1>
        <p class="text-base leading-8 text-secondary">
          Berbagi pengetahuan seputar pengembangan web, teknologi, dan pengalaman.
        </p>
      </div>

      <div
        v-if="blogStore.isListLoading"
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="overflow-hidden rounded-[28px] border border-subtle bg-card"
        >
          <div class="aspect-[16/9] animate-pulse bg-white/10" />
          <div class="space-y-3 p-6">
            <div class="h-4 w-32 animate-pulse rounded-full bg-white/10" />
            <div class="h-6 w-full animate-pulse rounded-full bg-white/10" />
            <div class="h-4 w-3/4 animate-pulse rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div
        v-else-if="blogStore.errorMessage"
        class="rounded-[24px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
      >
        {{ blogStore.errorMessage }}
      </div>

      <div
        v-else-if="blogStore.posts.length === 0"
        class="rounded-[28px] border border-dashed border-subtle px-6 py-16 text-center text-sm text-muted"
      >
        Belum ada artikel blog.
      </div>

      <div
        v-else
        class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <RouterLink
          v-for="post in blogStore.posts"
          :key="post.id"
          :to="`/blog/${post.slug}`"
          class="group flex flex-col overflow-hidden rounded-[28px] border border-subtle bg-card transition hover:-translate-y-1 hover:border-hover"
        >
          <div class="aspect-[16/9] overflow-hidden bg-gradient-to-br from-cyan-400/20 via-slate-900 to-amber-400/10">
            <img
              v-if="post.thumbnail_url"
              :src="post.thumbnail_url"
              :alt="post.title"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            >
            <div
              v-else
              class="flex h-full items-end p-6"
            >
              <p class="font-display text-xl text-primary">
                {{ post.title }}
              </p>
            </div>
          </div>
          <div class="flex flex-1 flex-col gap-3 p-6">
            <div
              v-if="post.published_at"
              class="flex items-center gap-2 text-xs text-muted"
            >
              <Calendar class="h-3.5 w-3.5" />
              {{ formatDate(post.published_at) }}
            </div>
            <h3 class="font-display text-xl text-primary transition group-hover:text-accent">
              {{ post.title }}
            </h3>
            <p
              v-if="post.excerpt"
              class="flex-1 text-sm leading-7 text-secondary"
            >
              {{ post.excerpt }}
            </p>
            <div class="inline-flex items-center gap-1 text-sm text-accent">
              Baca selengkapnya
              <ArrowUpRight class="h-4 w-4" />
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>
