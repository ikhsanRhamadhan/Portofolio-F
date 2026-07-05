<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useProjectsStore } from '@/stores/projects'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Project } from '@/types/project'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Projects - Admin Panel' })

const projectsStore = useProjectsStore()
const crud = useAdminCrud<Project>({
  endpoint: '/admin/projects',
  fetchData: () => projectsStore.fetchProjects(),
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'tech_stack', label: 'Tech Stack (comma separated)', type: 'text' },
    { key: 'github_url', label: 'GitHub URL', type: 'text' },
    { key: 'demo_url', label: 'Demo URL', type: 'text' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' },
  ],
  displayFields: ['title', 'category', 'is_featured'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Projects"
    :items="projectsStore.projects as unknown as Record<string, unknown>[]"
    :columns="['Title', 'Category', 'Featured']"
    :fields="['title', 'category', 'is_featured']"
    :loading="projectsStore.isListLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  >
    <template #cell-is_featured="{ item }">
      <span
        class="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]"
        :class="item.is_featured ? 'bg-amber-400/10 text-amber-200' : 'bg-muted/10 text-muted'"
      >
        {{ item.is_featured ? 'Featured' : 'Regular' }}
      </span>
    </template>
  </AdminTable>

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Project' : 'Tambah Project'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
