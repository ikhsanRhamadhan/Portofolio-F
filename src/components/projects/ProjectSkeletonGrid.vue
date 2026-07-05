<template>
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="index in 3"
      :key="index"
      class="overflow-hidden rounded-[28px] border border-subtle bg-card"
    >
      <div class="aspect-[4/3] animate-pulse bg-white/10" />
      <div class="space-y-4 p-6">
        <div class="h-4 w-24 animate-pulse rounded-full bg-white/10" />
        <div class="h-7 w-2/3 animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-full animate-pulse rounded-full bg-white/10" />
        <div class="h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
        <div class="flex gap-2">
          <div class="h-8 w-20 animate-pulse rounded-full bg-white/10" />
          <div class="h-8 w-24 animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  </div>
</template>
