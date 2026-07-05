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
      <p class="text-sm uppercase tracking-[0.35em] text-accent">
        Kontak
      </p>
      <h2 class="mt-3 font-display text-4xl text-primary">
        Hubungi Saya
      </h2>
    </div>

    <div class="mx-auto max-w-2xl">
      <div
        v-if="contactStore.successMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-emerald-300/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-200"
      >
        <CheckCircle2 class="h-5 w-5 shrink-0" />
        {{ contactStore.successMessage }}
      </div>

      <div
        v-if="contactStore.errorMessage"
        class="mb-6 flex items-center gap-3 rounded-[20px] border border-rose-300/20 bg-rose-300/10 px-5 py-4 text-sm text-rose-200"
      >
        <AlertCircle class="h-5 w-5 shrink-0" />
        {{ contactStore.errorMessage }}
      </div>

      <form
        class="space-y-5"
        @submit.prevent="submitForm"
      >
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="mb-1.5 block text-sm text-secondary"
            >Nama</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="Nama lengkap"
            >
          </div>
          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm text-secondary"
            >Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
              placeholder="email@contoh.com"
            >
          </div>
        </div>

        <div>
          <label
            for="subject"
            class="mb-1.5 block text-sm text-secondary"
          >Subjek</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            class="w-full rounded-full border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder="Subjek pesan"
          >
        </div>

        <div>
          <label
            for="message"
            class="mb-1.5 block text-sm text-secondary"
          >Pesan</label>
          <textarea
            id="message"
            v-model="form.message"
            required
            rows="4"
            class="w-full rounded-[24px] border border-subtle bg-card px-5 py-3 text-sm text-primary outline-none transition placeholder:text-muted focus:border-accent"
            placeholder="Tulis pesan Anda..."
          />
        </div>

        <button
          type="submit"
          :disabled="contactStore.isSubmitting"
          class="inline-flex items-center gap-2 rounded-full bg-inverse px-6 py-3 text-sm font-medium text-inverse transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send class="h-4 w-4" />
          {{ contactStore.isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
        </button>
      </form>
    </div>
  </section>
</template>
