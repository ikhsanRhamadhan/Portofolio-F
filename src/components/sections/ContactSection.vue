<script setup lang="ts">
import { reactive } from 'vue'
import { Send, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitForm = async () => {
  if (!form.name || !form.email || !form.subject || !form.message) return
  await contactStore.submit({ ...form })
  if (contactStore.successMessage) {
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }
}
</script>

<template>
  <section class="container px-6 pt-20">
    <div class="mb-10">
      <div class="flex items-center gap-3 mb-2">
        <svg width="24" height="12" viewBox="0 0 40 18" class="opacity-60">
          <polygon points="20,2 8,16 14,16 20,8 26,16 32,16" fill="var(--color-gundam-yellow)" />
        </svg>
        <p class="text-sm uppercase tracking-[0.35em] text-accent font-display">
          Hailing Frequency
        </p>
      </div>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Kirim Pesan
      </h2>
    </div>

    <div class="mx-auto max-w-2xl">
      <div
        v-if="contactStore.successMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-700 dark:text-emerald-200"
      >
        <CheckCircle2 class="h-5 w-5 shrink-0" />
        {{ contactStore.successMessage }}
      </div>

      <div
        v-if="contactStore.errorMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-700 dark:text-rose-200"
      >
        <AlertCircle class="h-5 w-5 shrink-0" />
        {{ contactStore.errorMessage }}
      </div>

      <form
        class="relative space-y-5 rounded-[32px] border border-subtle bg-elevated p-8 panel-line overflow-hidden"
        @submit.prevent="submitForm"
      >
        <div class="caution-solid absolute top-0 left-0 right-0 h-1.5 opacity-30 dark:opacity-100" />
        <div class="corner-bracket corner-tl" />
        <div class="corner-bracket corner-br" />

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="mb-1.5 block text-sm text-secondary font-tech"
            >Nama Pilot</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent font-tech"
              placeholder="Nama lengkap"
            >
          </div>
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm text-secondary font-tech"
            >Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent font-tech"
              placeholder="email@contoh.com"
            >
          </div>
        </div>

        <div>
          <label
            for="subject"
            class="mb-1.5 block text-sm text-secondary font-tech"
          >Subjek</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent font-tech"
            placeholder="Subjek pesan"
          >
        </div>

        <div>
          <label
            for="message"
            class="mb-1.5 block text-sm text-secondary font-tech"
          >Pesan</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="4"
            class="w-full rounded-[24px] border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent font-tech"
            placeholder="Tulis pesan Anda..."
          />
        </div>

        <button
          type="submit"
          :disabled="contactStore.isSubmitting"
          class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 active:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 btn-glow"
        >
          <Send class="h-4 w-4" />
          {{ contactStore.isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
        </button>
      </form>
    </div>
  </section>
</template>
