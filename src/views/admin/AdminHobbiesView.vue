<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useHobbiesStore } from '@/stores/hobbies'
import { useAdminCrud } from '@/composables/useAdminCrud'
import type { Hobby } from '@/types/hobby'
import AdminTable from '@/components/admin/AdminTable.vue'
import AdminFormModal from '@/components/admin/AdminFormModal.vue'

useHead({ title: 'Hobbies - Admin Panel' })

const store = useHobbiesStore()
const crud = useAdminCrud<Hobby>({
  endpoint: '/admin/hobbies',
  fetchData: () => store.fetchHobbies(),
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'category', label: 'Category', type: 'text', required: true },
    { key: 'level', label: 'Level (1-100)', type: 'number' },
  ],
  displayFields: ['name', 'category', 'level'],
})

onMounted(() => crud.load())
</script>

<template>
  <AdminTable
    title="Hobbies"
    :items="store.hobbies as unknown as Record<string, unknown>[]"
    :columns="['Name', 'Category', 'Level']"
    :fields="['name', 'category', 'level']"
    :loading="store.isLoading"
    @create="crud.openCreate"
    @edit="crud.openEdit"
    @delete="crud.confirmDelete"
  />

  <AdminFormModal
    v-if="crud.isModalOpen.value"
    :title="crud.isEditing.value ? 'Edit Hobby' : 'Tambah Hobby'"
    :fields="crud.fields"
    :form="crud.form"
    :loading="crud.isSaving.value"
    :error="crud.errorMessage.value"
    @save="crud.save"
    @close="crud.closeModal"
  />
</template>
