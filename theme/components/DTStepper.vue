<script setup>
import { provide, ref, computed } from 'vue'

const props = defineProps({
  compact: { type: Boolean, default: false },
  color:   { type: String,  default: null },
  loop:    { type: Boolean, default: false },
  showAll: { type: Boolean, default: false },
})

const accentMap = { blue: 'var(--dt-accent1)', teal: 'var(--dt-accent3)', purple: 'var(--dt-accent2)', cyan: 'var(--dt-accent6)' }
const resolvedColor = computed(() => props.color ? (accentMap[props.color] ?? props.color) : accentMap.blue)

const itemCount = ref(0)
provide('dt-stepper-register', () => itemCount.value++)
provide('dt-stepper-compact',  computed(() => props.compact))
provide('dt-stepper-color',    computed(() => props.color))
provide('dt-stepper-show-all', computed(() => props.showAll))
</script>

<template>
  <div class="dt-stepper" :class="{ 'dt-stepper--show-all': showAll }">
    <slot />
    <div v-if="loop" class="dt-stepper__loop" :style="{ borderColor: resolvedColor }" />
  </div>
</template>

<style scoped>
.dt-stepper {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 1.4em;
}

.dt-stepper__loop {
  position: absolute;
  left: 0;
  top: 0.9em;
  bottom: 0.9em;
  width: 1.2em;
  border-left: 2px solid;
  border-top: 2px solid;
  border-bottom: 2px solid;
  border-right: none;
  border-radius: 4px 0 0 4px;
  pointer-events: none;
}
</style>

<style>
/* hide not-yet-clicked items from layout */
.dt-stepper .slidev-vclick-hidden {
  display: none !important;
}

/* past item: visible sibling after it exists */
.dt-stepper-item:not(.slidev-vclick-hidden):has(~ .dt-stepper-item:not(.slidev-vclick-hidden)) {
  opacity: 0.45;
}

/* active item: last visible one */
.dt-stepper-item:not(.slidev-vclick-hidden):not(:has(~ .dt-stepper-item:not(.slidev-vclick-hidden))) {
  opacity: 1;
}

/* reset indicator style for past items */
.dt-stepper-item:not(.slidev-vclick-hidden):has(~ .dt-stepper-item:not(.slidev-vclick-hidden)) .dt-stepper-item__indicator {
  background: rgba(0, 9, 47, 0.07) !important;
  box-shadow: none !important;
}
.dark .dt-stepper-item:not(.slidev-vclick-hidden):has(~ .dt-stepper-item:not(.slidev-vclick-hidden)) .dt-stepper-item__indicator {
  background: rgba(255, 255, 255, 0.08) !important;
}

/* body only for active item */
.dt-stepper-item__body { display: none; }
.dt-stepper-item:not(.slidev-vclick-hidden):not(:has(~ .dt-stepper-item:not(.slidev-vclick-hidden))) .dt-stepper-item__body {
  display: block;
}

/* showAll: past items stay at full opacity instead of fading to 0.45 */
.dt-stepper--show-all .dt-stepper-item:not(.slidev-vclick-hidden):has(~ .dt-stepper-item:not(.slidev-vclick-hidden)) {
  opacity: 1;
}
.dt-stepper--show-all .dt-stepper-item:not(.slidev-vclick-hidden):has(~ .dt-stepper-item:not(.slidev-vclick-hidden)) .dt-stepper-item__indicator {
  background: var(--indicator-color, var(--dt-accent1)) !important;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--indicator-color, var(--dt-accent1)) 16%, transparent) !important;
}
</style>
