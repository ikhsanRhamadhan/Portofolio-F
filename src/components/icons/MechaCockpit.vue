<template>
  <svg viewBox="0 0 40 36" xmlns="http://www.w3.org/2000/svg">
    <!-- Cockpit frame -->
    <path d="M4 14 L8 4 L32 4 L36 14 L36 32 L4 32 Z" fill="none" stroke="currentColor" stroke-width="1.5" />
    <!-- Screen -->
    <rect x="10" y="10" width="20" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5" />
    <!-- Screen data lines -->
    <line x1="14" y1="14" x2="26" y2="14" stroke="var(--color-gundam-yellow)" stroke-width="1" opacity="0.6" />
    <line x1="14" y1="17" x2="22" y2="17" stroke="var(--color-gundam-red)" stroke-width="1" opacity="0.5" />
    <line x1="14" y1="20" x2="20" y2="20" stroke="currentColor" stroke-width="0.8" opacity="0.3" />
    <!-- Controls bottom -->
    <rect x="10" y="25" width="6" height="3" rx="0.5" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4" />
    <rect x="18" y="25" width="6" height="3" rx="0.5" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.4" />
    <rect x="26" y="25" width="4" height="3" rx="0.5" fill="var(--color-gundam-red)" opacity="0.5" />
    <!-- Top mount -->
    <path d="M16 4 L20 1 L24 4" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4" />
    <!-- Rivets -->
    <circle cx="8" cy="7" r="1" opacity="0.3" />
    <circle cx="32" cy="7" r="1" opacity="0.3" />
  </svg>
</template>
