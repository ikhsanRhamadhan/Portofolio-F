<template>
  <svg
    viewBox="0 0 200 260"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Gundam RX-78-2 Head"
  >
    <!-- V-Fin -->
    <polygon points="100,10 94,58 106,58" fill="#f0b800" stroke="#b88a00" stroke-width="0.8"/>
    <polygon points="100,28 95,58 48,82 44,75" fill="#f0b800" stroke="#b88a00" stroke-width="0.8"/>
    <polygon points="100,28 105,58 152,82 156,75" fill="#f0b800" stroke="#b88a00" stroke-width="0.8"/>
    <rect x="88" y="72" width="24" height="7" rx="1" fill="#1a3470"/>

    <!-- Helm Dome -->
    <path d="M 42,222 L 42,108 C 42,78 100,72 100,72 C 100,72 158,78 158,108 L 158,222 Z"
          fill="#162855" stroke="#0a1930" stroke-width="1.2"/>
    <path d="M 75,79 Q 100,74 125,79 L 128,122 L 72,122 Z" fill="#1e3a7a" opacity="0.7"/>

    <!-- Cheek Vents -->
    <rect x="44" y="148" width="24" height="30" rx="1" fill="#1a2e60" stroke="#0a1930" stroke-width="0.5"/>
    <line v-for="y in [155,161,167,173]" :key="y" x1="48" :y1="y" x2="64" :y2="y" stroke="#0a1930" stroke-width="0.5" opacity="0.6"/>
    <rect x="132" y="148" width="24" height="30" rx="1" fill="#1a2e60" stroke="#0a1930" stroke-width="0.5"/>
    <line v-for="y in [155,161,167,173]" :key="'r'+y" x1="136" :y1="y" x2="152" :y2="y" stroke="#0a1930" stroke-width="0.5" opacity="0.6"/>

    <!-- Red Stripe -->
    <rect x="70" y="120" width="60" height="7" fill="#cc1122"/>
    <rect x="42" y="120" width="28" height="5" fill="#cc1122" opacity="0.5"/>
    <rect x="130" y="120" width="28" height="5" fill="#cc1122" opacity="0.5"/>

    <!-- Face Plate -->
    <path d="M 70,127 L 130,127 L 133,145 L 133,207 L 67,207 L 67,145 Z"
          fill="#dce4ef" stroke="#b0bcd0" stroke-width="0.8"/>
    <path d="M 70,127 L 130,127 L 133,140 L 67,140 Z" fill="#c8d2e0" opacity="0.5"/>

    <!-- Twin Eyes -->
    <circle cx="88" cy="157" r="14" fill="#f5c500" stroke="#0a1930" stroke-width="0.8"/>
    <circle cx="112" cy="157" r="14" fill="#f5c500" stroke="#0a1930" stroke-width="0.8"/>
    <circle cx="88" cy="157" r="9" fill="#d4a000"/>
    <circle cx="112" cy="157" r="9" fill="#d4a000"/>
    <circle cx="88" cy="157" r="5" fill="#050a0f"/>
    <circle cx="112" cy="157" r="5" fill="#050a0f"/>
    <circle cx="85" cy="154" r="2" fill="rgba(255,255,255,0.35)"/>
    <circle cx="109" cy="154" r="2" fill="rgba(255,255,255,0.35)"/>

    <!-- Nose Bridge -->
    <rect x="97" y="168" width="6" height="22" rx="1" fill="#c0cad8"/>

    <!-- Chin Vent -->
    <rect x="74" y="196" width="52" height="14" rx="1.5" fill="#f0b800" stroke="#b88a00" stroke-width="0.8"/>
    <rect v-for="x in [80,89,98,107,116]" :key="x" :x="x" y="198" width="5" height="10" rx="0.5" fill="#0a1930" opacity="0.55"/>

    <!-- Neck -->
    <rect x="78" y="222" width="44" height="22" rx="2" fill="#0d1628" stroke="#162855" stroke-width="1"/>
    <rect x="83" y="226" width="34" height="4" rx="1" fill="#1a2a55"/>
    <rect x="83" y="234" width="34" height="4" rx="1" fill="#1a2a55"/>

    <!-- Glow outline -->
    <path d="M 42,222 L 42,108 C 42,78 100,72 100,72 C 100,72 158,78 158,108 L 158,222 Z"
          fill="none" stroke="#00d4ff" stroke-width="0.5" opacity="0.3"/>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>
