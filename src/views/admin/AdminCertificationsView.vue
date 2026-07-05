<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useCertificationsStore } from '@/stores/certifications'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Certification } from '@/types/certification'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Certifications - Admin Panel' })

const store = useCertificationsStore()
const crud = useAdminCrud<Certification>({
  endpoint: '/admin/certifications',
  fetchData: () => store.fetchCertifications(),
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'issuer', label: 'Issuer', type: 'text', required: true },
    { key: 'issue_date', label: 'Issue Date', type: 'text' },
    { key: 'credential_url', label: 'Credential URL', type: 'text' },
  ],
  displayFields: ['name', 'issuer', 'issue_date'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Certifications"
    :items="store.certifications as unknown as Record<string, unknown>[]"
    :columns="['Name', 'Issuer', 'Date']"
    :fields="['name', 'issuer', 'issue_date']"
    :loading="store.isLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  />

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Certification' : 'Tambah Certification'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
