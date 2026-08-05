<script setup>
import { provide, computed } from 'vue'

const props = defineProps({
  color:   { type: String,  default: 'teal' }, // blue | teal | purple | cyan | #hex
  showAll: { type: Boolean, default: false },
})

const accentMap = { blue: 'var(--dt-accent1)', teal: 'var(--dt-accent3)', purple: 'var(--dt-accent2)', cyan: 'var(--dt-accent6)' }
const resolvedColor = computed(() => accentMap[props.color] ?? props.color)

provide('dt-timeline-color', resolvedColor)
</script>

<template>
  <div class="dt-timeline" :class="{ 'dt-timeline--show-all': showAll }">
    <slot />
  </div>
</template>

<style scoped>
.dt-timeline {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin: 1.5em 0;
  counter-reset: dt-tl-counter;
}
</style>

<style>
.dt-timeline--show-all .dt-tl-item {
  opacity: 1 !important;
}
.dt-timeline--show-all .dt-tl-line__fill {
  transform: scaleX(1) !important;
}
</style>
