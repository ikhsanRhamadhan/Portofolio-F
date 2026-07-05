<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useHead } from '@unhead/vue'
import { Save, AlertCircle, Loader2, Cpu } from 'lucide-vue-next'
import api from '@/services/api'
import type { Profile } from '@/types/profile'

useHead({ title: 'Pilot Profile - Admin Panel' })

const profile = ref<Profile | null>(null)
const isLoading = ref(true)
const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  name: '',
  title: '',
  bio: '',
  location: '',
  languages: '',
  email: '',
  phone: '',
  motto: '',
  stats: '',
  social_links: '',
})

onMounted(async () => {
  try {
    const { data } = await api.get('/admin/profile')
    const p = data.data as Profile
    profile.value = p
    form.name = p.name || ''
    form.title = p.title || ''
    form.bio = p.bio || ''
    form.location = p.location || ''
    form.languages = p.languages?.join(', ') || ''
    form.email = p.email || ''
    form.phone = p.phone || ''
    form.motto = p.motto || ''
    form.stats = JSON.stringify(p.stats || [])
    form.social_links = JSON.stringify(p.social_links || [])
  } catch {
    errorMessage.value = 'Gagal memuat data profil.'
  } finally {
    isLoading.value = false
  }
})

const save = async () => {
  isSaving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  let parsedStats: { label: string; value: string }[] = []
  let parsedSocialLinks: { platform: string; url: string; icon: string | null }[] = []

  try {
    parsedStats = form.stats ? JSON.parse(form.stats) : []
  } catch {
    errorMessage.value = 'Format JSON Stats tidak valid.'
    isSaving.value = false
    return
  }

  try {
    parsedSocialLinks = form.social_links ? JSON.parse(form.social_links) : []
  } catch {
    errorMessage.value = 'Format JSON Social Links tidak valid.'
    isSaving.value = false
    return
  }

  try {
    await api.put('/admin/profile', {
      name: form.name,
      title: form.title,
      bio: form.bio,
      location: form.location,
      languages: form.languages.split(',').map((s) => s.trim()).filter(Boolean),
      email: form.email,
      phone: form.phone,
      motto: form.motto,
      stats: parsedStats,
      social_links: parsedSocialLinks,
    })
    successMessage.value = 'Profil berhasil disimpan.'
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'response' in e) {
      const err = e as { response?: { data?: { message?: string } } }
      errorMessage.value = err.response?.data?.message ?? 'Gagal menyimpan profil.'
    } else {
      errorMessage.value = 'Gagal menyimpan profil.'
    }
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-3xl text-primary">
          Pilot Profile
        </h1>
        <p class="mt-1 text-sm text-muted">
          Kelola data profil personal.
        </p>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="space-y-6"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="h-12 animate-pulse rounded-full border border-subtle bg-card"
      />
    </div>

    <template v-else>
      <div
        v-if="successMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-700 dark:text-emerald-200"
      >
        <Loader2 class="h-5 w-5 shrink-0" />
        {{ successMessage }}
      </div>

      <div
        v-if="errorMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-700 dark:text-rose-200"
      >
        <AlertCircle class="h-5 w-5 shrink-0" />
        {{ errorMessage }}
      </div>

      <form
        class="rounded-[28px] border border-subtle bg-card p-8 panel-line"
        @submit.prevent="save"
      >
        <div class="corner-bracket corner-tl" />
        <div class="corner-bracket corner-br" />

        <div class="mb-8 flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent-bg">
            <Cpu class="h-5 w-5 text-accent" />
          </span>
          <div>
            <h2 class="font-display text-lg text-primary">
              Data Diri
            </h2>
            <p class="text-xs text-muted font-tech">
              RX-78-2 Pilot Record
            </p>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Nama *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Nama lengkap"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Title *</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Full Stack Web Developer"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Location</label>
            <input
              v-model="form.location"
              type="text"
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Indonesia"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Languages</label>
            <input
              v-model="form.languages"
              type="text"
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Indonesia, English"
            >
            <p class="mt-1 text-xs text-muted">Pisahkan dengan koma</p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="email@contoh.com"
            >
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-secondary font-tech">Phone</label>
            <input
              v-model="form.phone"
              type="text"
              class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="+62 812 3456 7890"
            >
          </div>
        </div>

        <div class="mt-5">
          <label class="mb-1.5 block text-sm text-secondary font-tech">Motto</label>
          <input
            v-model="form.motto"
            type="text"
            class="w-full rounded-full border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder='"Clean code, clean deployment."'
          >
        </div>

        <div class="mt-5">
          <label class="mb-1.5 block text-sm text-secondary font-tech">Bio</label>
          <textarea
            v-model="form.bio"
            rows="5"
            class="w-full rounded-[24px] border border-subtle bg-elevated px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder="Deskripsi diri..."
          />
        </div>

        <div class="mt-5">
          <label class="mb-1.5 block text-sm text-secondary font-tech">Stats (JSON)</label>
          <textarea
            v-model="form.stats"
            rows="3"
            class="w-full rounded-[20px] border border-subtle bg-elevated px-5 py-3 text-sm font-mono text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder='[{"label": "Years", "value": "5+"}, ...]'
          />
        </div>

        <div class="mt-5">
          <label class="mb-1.5 block text-sm text-secondary font-tech">Social Links (JSON)</label>
          <textarea
            v-model="form.social_links"
            rows="3"
            class="w-full rounded-[20px] border border-subtle bg-elevated px-5 py-3 text-sm font-mono text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder='[{"platform": "GitHub", "url": "..."}, ...]'
          />
        </div>

        <div class="mt-8 flex justify-end">
          <button
            type="submit"
            :disabled="isSaving"
            class="inline-flex items-center gap-2 rounded-full bg-inverse px-6 py-3 text-sm font-medium text-inverse transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save class="h-4 w-4" />
            {{ isSaving ? 'Menyimpan...' : 'Simpan Profil' }}
          </button>
        </div>
      </form>
    </template>
  </div>
</template>
