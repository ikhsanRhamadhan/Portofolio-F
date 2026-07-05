<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useEducationsStore } from '@/stores/educations'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Education } from '@/types/education'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Education - Admin Panel' })

const store = useEducationsStore()
const crud = useAdminCrud<Education>({
  endpoint: '/admin/educations',
  fetchData: () => store.fetchEducations(),
  fields: [
    { key: 'institution', label: 'Institution', type: 'text', required: true },
    { key: 'degree', label: 'Degree', type: 'text', required: true },
    { key: 'field_of_study', label: 'Field of Study', type: 'text', required: true },
    { key: 'start_date', label: 'Start Date', type: 'text' },
    { key: 'end_date', label: 'End Date', type: 'text' },
  ],
  displayFields: ['degree', 'institution', 'field_of_study'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Education"
    :items="store.educations as unknown as Record<string, unknown>[]"
    :columns="['Degree', 'Institution', 'Field']"
    :fields="['degree', 'institution', 'field_of_study']"
    :loading="store.isLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  />

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Education' : 'Tambah Education'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
