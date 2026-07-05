<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useBlogStore } from '@/stores/blog'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { BlogPost } from '@/types/blog'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Blog - Admin Panel' })

const blogStore = useBlogStore()
const crud = useAdminCrud<BlogPost>({
  endpoint: '/admin/blog-posts',
  fetchData: () => blogStore.fetchPosts(),
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'content', label: 'Content', type: 'textarea', required: true },
    { key: 'excerpt', label: 'Excerpt', type: 'text' },
    { key: 'published_at', label: 'Published At', type: 'text' },
  ],
  displayFields: ['title', 'published_at'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Blog Posts"
    :items="blogStore.posts as unknown as Record<string, unknown>[]"
    :columns="['Title', 'Published']"
    :fields="['title', 'published_at']"
    :loading="blogStore.isListLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  />

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Post' : 'Tambah Post'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
