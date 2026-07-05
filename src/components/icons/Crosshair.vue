<template>
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <!-- Outer ring -->
    <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6" />
    <!-- Inner ring -->
    <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.3" />
    <!-- Top crosshair -->
    <line x1="20" y1="1" x2="20" y2="8" stroke="currentColor" stroke-width="1.8" />
    <line x1="17" y1="3" x2="23" y2="3" stroke="currentColor" stroke-width="1.2" opacity="0.5" />
    <!-- Bottom crosshair -->
    <line x1="20" y1="32" x2="20" y2="39" stroke="currentColor" stroke-width="1.8" />
    <line x1="17" y1="37" x2="23" y2="37" stroke="currentColor" stroke-width="1.2" opacity="0.5" />
    <!-- Left crosshair -->
    <line x1="1" y1="20" x2="8" y2="20" stroke="currentColor" stroke-width="1.8" />
    <line x1="3" y1="17" x2="3" y2="23" stroke="currentColor" stroke-width="1.2" opacity="0.5" />
    <!-- Right crosshair -->
    <line x1="32" y1="20" x2="39" y2="20" stroke="currentColor" stroke-width="1.8" />
    <line x1="37" y1="17" x2="37" y2="23" stroke="currentColor" stroke-width="1.2" opacity="0.5" />
    <!-- Center dot -->
    <circle cx="20" cy="20" r="3" fill="var(--color-gundam-red)" />
    <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
  </svg>
</template>
