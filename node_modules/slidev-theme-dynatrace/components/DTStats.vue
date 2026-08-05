<script setup>
defineProps({
  value: String,
  label: String,
  trend: { type: String, default: '' }, // '↑ 12%' or '↓ 3%'
  accent: { type: String, default: 'blue' },
})
// PPT chart palette cycle order: accent1 → accent6
const accentMap = {
  blue:           'var(--dt-accent1)',
  purple:         'var(--dt-accent2)',
  teal:           'var(--dt-accent3)',
  'light-blue':   'var(--dt-accent4)',
  'light-purple': 'var(--dt-accent5)',
  cyan:           'var(--dt-accent6)',
}
</script>
<template>
  <div class="dt-stat">
    <div class="dt-stat__value" :style="{ color: accentMap[accent] || accentMap.blue }">{{ value }}</div>
    <div v-if="trend" class="dt-stat__trend">{{ trend }}</div>
    <div class="dt-stat__label">{{ label }}</div>
  </div>
</template>
<style scoped>
.dt-stat { text-align: center; padding: 0.5em; }
.dt-stat__value { font-family: 'DTFlow', sans-serif; font-weight: 700; font-size: 3.5em; line-height: 1; }
.dt-stat__trend { font-family: 'DTFlow', sans-serif; font-weight: 300; font-size: 1em; opacity: 0.8; margin-top: 0.1em; }
.dt-stat__label { font-family: 'DTFlow', sans-serif; font-weight: 300; font-size: 0.85em; opacity: 0.65; margin-top: 0.3em; letter-spacing: 0.05em; text-transform: uppercase; }
</style>
