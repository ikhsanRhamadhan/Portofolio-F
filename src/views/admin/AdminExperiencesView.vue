<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useExperiencesStore } from '@/stores/experiences'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Experience } from '@/types/experience'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Experiences - Admin Panel' })

const store = useExperiencesStore()
const crud = useAdminCrud<Experience>({
  endpoint: '/admin/experiences',
  fetchData: () => store.fetchExperiences(),
  fields: [
    { key: 'company', label: 'Company', type: 'text', required: true },
    { key: 'position', label: 'Position', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'start_date', label: 'Start Date', type: 'text' },
    { key: 'end_date', label: 'End Date', type: 'text' },
    { key: 'is_current', label: 'Current Position', type: 'boolean' },
  ],
  displayFields: ['position', 'company', 'is_current'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Experiences"
    :items="store.experiences as unknown as Record<string, unknown>[]"
    :columns="['Position', 'Company', 'Current']"
    :fields="['position', 'company', 'is_current']"
    :loading="store.isLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  >
    <template #cell-is_current="{ item }">
      <span
        v-if="item.is_current"
        class="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-emerald-300"
      >Aktif</span>
    </template>
  </AdminTable>

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Experience' : 'Tambah Experience'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
