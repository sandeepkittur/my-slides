<script setup>
import { inject, ref } from 'vue'

defineProps({
  title: { type: String, required: true },
})

const color = inject('dt-timeline-color', ref('var(--dt-accent3)'))
</script>

<template>
  <div class="dt-tl-item">

    <div class="dt-tl-top">
      <div class="dt-tl-line dt-tl-line--left">
        <div class="dt-tl-line__fill" :style="{ background: color }" />
      </div>

      <div class="dt-tl-circle" :style="{ background: color, '--circle-color': color }">
        <span class="dt-tl-number" />
      </div>

      <div class="dt-tl-line dt-tl-line--right">
        <div class="dt-tl-line__fill" :style="{ background: color }" />
      </div>
    </div>

    <div class="dt-tl-title">{{ title }}</div>
    <div v-if="$slots.default" class="dt-tl-body"><slot /></div>

  </div>
</template>

<style scoped>
.dt-tl-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.dt-tl-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.dt-tl-line {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}

:global(html:not(.dark)) .dt-tl-line {
  background: rgba(0, 9, 47, 0.12);
}

.dt-tl-item:first-child .dt-tl-line--left,
.dt-tl-item:last-child  .dt-tl-line--right {
  visibility: hidden;
}

.dt-tl-line__fill {
  position: absolute;
  inset: 0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.dt-tl-item:not(.slidev-vclick-hidden) .dt-tl-line__fill {
  transform: scaleX(1);
}

.dt-tl-circle {
  width: 2.4em;
  height: 2.4em;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  counter-increment: dt-tl-counter;
  transition: box-shadow 0.4s ease;
}

.dt-tl-item:not(.slidev-vclick-hidden) .dt-tl-circle {
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--circle-color) 16%, transparent);
}

.dt-tl-number::before {
  content: counter(dt-tl-counter);
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: 0.85em;
  color: var(--dt-navy);
  line-height: 1;
}

.dt-tl-title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 600;
  font-size: 0.8em;
  text-align: center;
  white-space: nowrap;
  margin-top: 0.5em;
}

.dt-tl-body {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: 0.72em;
  text-align: center;
  line-height: 1.5;
  opacity: 0.75;
  max-width: 10em;
  margin-top: 0.2em;
}
</style>
