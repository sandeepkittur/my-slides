<script setup>
import { inject, ref, computed } from 'vue'

const props = defineProps({
  title:  { type: String, required: true },
  accent: { type: String, default: null },
})

const palette   = ['var(--dt-accent1)', 'var(--dt-accent3)', 'var(--dt-accent2)', 'var(--dt-accent6)']
const accentMap = { blue: 'var(--dt-accent1)', teal: 'var(--dt-accent3)', purple: 'var(--dt-accent2)', cyan: 'var(--dt-accent6)' }

const register  = inject('dt-stepper-register', null)
const compact   = inject('dt-stepper-compact', ref(false))
const monoColor = inject('dt-stepper-color',   ref(null))

if (!register)
  throw new Error('[slidev-theme-dynatrace] <DTStepperItem> must be used inside <DTStepper>.')

const index = register()

const color = computed(() => {
  if (monoColor.value) return accentMap[monoColor.value] ?? monoColor.value
  if (props.accent)    return accentMap[props.accent]    ?? props.accent
  return palette[index % palette.length]
})
</script>

<template>
  <div class="dt-stepper-item" :class="{ 'dt-stepper-item--compact': compact }">
    <div v-if="index > 0" class="dt-stepper-item__line" />

    <div
      class="dt-stepper-item__indicator"
      :style="{ background: color, '--indicator-color': color }"
    >
      <slot v-if="$slots.icon" name="icon" />
      <span v-else class="dt-stepper-item__number">{{ index + 1 }}</span>
    </div>

    <div class="dt-stepper-item__content">
      <div class="dt-stepper-item__title">{{ title }}</div>
      <div v-if="$slots.default" class="dt-stepper-item__body"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.dt-stepper-item {
  display: flex;
  align-items: flex-start;
  gap: 0.85em;
  position: relative;
  margin-top: 0.75em;
  transition: opacity 0.35s ease;
  animation: dt-item-in 0.35s ease both;
}

@keyframes dt-item-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.dt-stepper-item__line {
  position: absolute;
  left: calc(0.9em - 1px);
  bottom: 100%;
  width: 2px;
  height: 0.75em;
  background: rgba(0, 9, 47, 0.2);
}

:global(.dark) .dt-stepper-item__line {
  background: rgba(255, 255, 255, 0.2);
}

.dt-stepper-item__indicator {
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.35s ease;
  width: 2em;
  height: 2em;
  font-size: 0.9em;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--indicator-color) 16%, transparent);
}

.dt-stepper-item__number {
  font-family: 'DTFlow', sans-serif;
  font-weight: 600;
  color: var(--dt-white);
  font-size: 0.9em;
  line-height: 1;
}

.dt-stepper-item__content {
  flex: 1;
  padding-top: 0.1em;
}

.dt-stepper-item__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 600;
  line-height: 1.3;
  font-size: 1em;
}

.dt-stepper-item__body {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: 0.85em;
  line-height: 1.55;
  opacity: 0.75;
  margin-top: 0.3em;
}

.dt-stepper-item--compact {
  margin-top: 0.4em;
}

.dt-stepper-item--compact .dt-stepper-item__indicator {
  width: 1.5em;
  height: 1.5em;
  font-size: 0.75em;
}

.dt-stepper-item--compact .dt-stepper-item__line {
  height: 0.4em;
  left: calc(0.675em - 1px);
}

.dt-stepper-item--compact .dt-stepper-item__title {
  font-size: 0.85em;
}

.dt-stepper-item--compact .dt-stepper-item__body {
  font-size: 0.78em;
}
</style>
