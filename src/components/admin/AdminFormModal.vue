<script setup lang="ts">
import { X, Save, AlertCircle } from 'lucide-vue-next'
import type { CrudField } from '@/composables/useAdminCrud'

defineProps<{
  title: string
  fields: CrudField[]
  form: Record<string, unknown>
  loading: boolean
  error: string
}>()

const emit = defineEmits<{
  save: []
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-black/60 backdrop-blur-sm"
        @click="emit('close')"
      />
      <div class="relative z-10 w-full max-w-lg rounded-[32px] border border-subtle bg-elevated p-8 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <h2 class="font-display text-xl text-primary">
            {{ title }}
          </h2>
          <button
            type="button"
            class="rounded-full p-2 text-muted transition hover:bg-card-hover hover:text-primary"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div
          v-if="error"
          class="mb-6 flex items-center gap-3 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
        >
          <AlertCircle class="h-5 w-5 shrink-0" />
          {{ error }}
        </div>

        <form
          class="space-y-5"
          @submit.prevent="emit('save')"
        >
          <div
            v-for="field in fields"
            :key="field.key"
          >
            <label
              :for="field.key"
              class="mb-1.5 block text-sm text-secondary"
            >
              {{ field.label }}
              <span
                v-if="field.required"
                class="text-rose-300"
              >*</span>
            </label>

            <textarea
              v-if="field.type === 'textarea'"
              :id="field.key"
              v-model="(form[field.key] as string)"
              :required="field.required"
              rows="4"
              class="w-full rounded-[20px] border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            />

            <div
              v-else-if="field.type === 'boolean'"
              class="flex items-center gap-3"
            >
              <input
                :id="field.key"
                v-model="(form[field.key] as boolean)"
                type="checkbox"
                class="h-5 w-5 rounded-lg border border-subtle bg-card text-accent focus:ring-accent"
              >
              <label
                :for="field.key"
                class="text-sm text-secondary"
              >{{ field.label }}</label>
            </div>

            <input
              v-else
              :id="field.key"
              v-model="(form[field.key] as string | number)"
              :type="field.type === 'number' ? 'number' : 'text'"
              :required="field.required"
              class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            >
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              class="rounded-full border border-subtle px-5 py-2.5 text-sm text-secondary transition hover:border-hover hover:text-primary"
              @click="emit('close')"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center gap-2 rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-inverse transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save class="h-4 w-4" />
              {{ loading ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>
