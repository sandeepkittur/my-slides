<script setup>
import { useSlots } from 'vue'
const slots = useSlots()

defineProps({
  title: String,
  accent: { type: String, default: 'blue' }, // blue | teal | purple | cyan
  compact: { type: Boolean, default: false },
  cover: { type: Boolean, default: false },
  number: { type: [Number, String], default: null },
})
const accentMap = { blue: 'var(--dt-accent1)', teal: 'var(--dt-accent3)', purple: 'var(--dt-accent2)', cyan: 'var(--dt-accent6)' }
</script>

<template>
  <div :class="['dt-card', { 'dt-card--compact': compact, 'dt-card--cover': cover }]">
    <div v-if="number != null" class="dt-card__number" :style="{ background: accentMap[accent] || accentMap.blue }">{{ number }}</div>
    <div v-if="slots.icon" :class="['dt-card__icon', { 'dt-card__icon--cover': cover }]" :style="cover ? {} : { color: accentMap[accent] || accentMap.blue }">
      <slot name="icon" />
    </div>
    <div :class="['dt-card__meta', { 'dt-card__meta--cover': cover }]">
      <div v-if="title" class="dt-card__title">{{ title }}</div>
      <div class="dt-card__body"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
/* Matches PPT rounded rect containers: subtle fill, soft shadow, no decorative bars */
.dt-card {
  position: relative;
  border-radius: 10px;
  padding: 1.1em 1.2em;
  display: flex;
  flex-direction: column;
  gap: 0.35em;
  height: auto;

  /* Dark theme (default for most layouts) */
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.10), 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Light theme */
:global(.slidev-layout.default:not(.dark)) .dt-card,
:global(.slidev-layout.two-cols:not(.dark)) .dt-card {
  background: rgba(0, 9, 47, 0.04);
  box-shadow: 0 2px 18px rgba(0, 9, 47, 0.08), 0 1px 3px rgba(0, 9, 47, 0.05);
}

.dt-card__number {
  position: absolute;
  top: -0.55em;
  right: -0.55em;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: 0.75em;
  color: white;
  line-height: 1;
}

.dt-card__icon {
  display: flex;
  align-items: center;
  font-size: 1.4em;
  line-height: 1;
  margin-bottom: 0.15em;
}

.dt-card__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1.3;
}

.dt-card__body {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: 0.85em;
  line-height: 1.55;
  opacity: 0.8;
}

/* ── Cover variant ────────────────────────────────────────────────────── */
.dt-card--cover {
  padding: 0;
  gap: 0;
  overflow: hidden;
}

.dt-card__icon--cover {
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  font-size: inherit;
  margin-bottom: 0;
}

.dt-card__icon--cover :deep(img),
.dt-card__icon--cover :deep(.dt-avatar) {
  width: 100%;
  height: 100%;
  border-radius: 0;
}

.dt-card__meta--cover {
  padding: 0.6em 0.8em 0.75em;
}

.dt-card--cover .dt-card__title {
  font-size: 0.8em;
}

.dt-card--cover .dt-card__body {
  font-size: 0.72em;
  opacity: 0.65;
  margin-top: 0.1em;
}

/* ── Compact variant ────────────────────────────────────────────────────── */
.dt-card--compact {
  padding: 0.6em 0.8em;
  gap: 0.2em;
  border-radius: 8px;
}

.dt-card--compact .dt-card__icon {
  font-size: 1em;
  margin-bottom: 0;
}

.dt-card--compact .dt-card__title {
  font-size: 0.8em;
}

.dt-card--compact .dt-card__body {
  font-size: 0.75em;
  line-height: 1.4;
}
</style>
