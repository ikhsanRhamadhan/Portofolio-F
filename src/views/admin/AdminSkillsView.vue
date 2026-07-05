<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useSkillsStore } from '@/stores/skills'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Skill } from '@/types/skill'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Skills - Admin Panel' })

const skillsStore = useSkillsStore()
const crud = useAdminCrud<Skill>({
  endpoint: '/admin/skills',
  fetchData: () => skillsStore.fetchSkills(),
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'level', label: 'Level (0-100)', type: 'number', required: true },
  ],
  displayFields: ['name', 'category', 'level'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Skills"
    :items="skillsStore.skills as unknown as Record<string, unknown>[]"
    :columns="['Name', 'Category', 'Level']"
    :fields="['name', 'category', 'level']"
    :loading="skillsStore.isLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  />

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Skill' : 'Tambah Skill'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
