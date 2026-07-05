<script setup lang="ts">
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'

defineProps<{
  title: string
  items: Record<string, unknown>[]
  columns: string[]
  fields: string[]
  loading: boolean
}>()

const emit = defineEmits<{
  create: []
  edit: [item: Record<string, unknown>]
  delete: [item: Record<string, unknown>]
}>()
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-3xl text-primary">
          {{ title }}
        </h1>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-inverse transition hover:brightness-110 active:brightness-90"
        @click="emit('create')"
      >
        <Plus class="h-4 w-4" />
        Tambah
      </button>
    </div>

    <div
      v-if="loading"
      class="space-y-4"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="h-16 animate-pulse rounded-[20px] border border-subtle bg-card"
      />
    </div>

    <div
      v-else-if="items.length === 0"
      class="rounded-[28px] border border-dashed border-subtle px-6 py-16 text-center text-sm text-muted"
    >
      Belum ada data.
    </div>

    <div
      v-else
      class="overflow-hidden rounded-[24px] border border-subtle"
    >
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-subtle bg-elevated">
            <th
              v-for="col in columns"
              :key="col"
              class="px-6 py-4 text-left text-xs uppercase tracking-[0.2em] text-muted"
            >
              {{ col }}
            </th>
            <th class="px-6 py-4 text-right text-xs uppercase tracking-[0.2em] text-muted">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-subtle">
          <tr
            v-for="item in items"
            :key="String(item.id)"
            class="transition hover:bg-card-hover"
          >
            <td
              v-for="field in fields"
              :key="field"
              class="px-6 py-4 text-primary"
            >
              <slot
                :name="`cell-${field}`"
                :item="item"
              >
                {{ item[field] != null ? String(item[field]) : '' }}
              </slot>
            </td>
            <td class="px-6 py-4 text-right">
              <div class="inline-flex items-center gap-1">
                <button
                  type="button"
                  class="rounded-full p-2 text-muted transition hover:bg-accent-bg hover:text-accent"
                  @click="emit('edit', item)"
                >
                  <Pencil class="h-4 w-4" />
                </button>
                <button
                  type="button"
                  class="rounded-full p-2 text-muted transition hover:bg-rose-400/10 hover:text-rose-300"
                  @click="emit('delete', item)"
                >
                  <Trash2 class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
