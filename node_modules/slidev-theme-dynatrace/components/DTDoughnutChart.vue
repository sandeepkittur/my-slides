<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  // [{ label, value }, ...]
  data: { type: Array, required: true },
  size: { type: [String, Number], default: 280 },
  fluid: { type: Boolean, default: true },
  innerRatio: { type: Number, default: 0.6 },
  showLegend: { type: Boolean, default: true },
  centerLabel: { type: String, default: '' },
  centerValue: { type: String, default: '' },
})

const PALETTE = ['#1866FE', '#7F1AFE', '#01D393', '#85ADFF', '#C499FE', '#5CFDCC']

const total = computed(() => props.data.reduce((s, d) => s + d.value, 0))

const arcs = computed(() => {
  const cx = Number(props.size) / 2
  const cy = Number(props.size) / 2
  const rOuter = Number(props.size) / 2 - 4
  const rInner = rOuter * props.innerRatio
  let acc = 0
  return props.data.map((d, i) => {
    const startAngle = (acc / total.value) * 2 * Math.PI - Math.PI / 2
    acc += d.value
    const endAngle = (acc / total.value) * 2 * Math.PI - Math.PI / 2
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
    const x1 = cx + rOuter * Math.cos(startAngle)
    const y1 = cy + rOuter * Math.sin(startAngle)
    const x2 = cx + rOuter * Math.cos(endAngle)
    const y2 = cy + rOuter * Math.sin(endAngle)
    const x3 = cx + rInner * Math.cos(endAngle)
    const y3 = cy + rInner * Math.sin(endAngle)
    const x4 = cx + rInner * Math.cos(startAngle)
    const y4 = cy + rInner * Math.sin(startAngle)
    const path = [
      `M ${x1} ${y1}`,
      `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ')
    return { path, color: PALETTE[i % PALETTE.length], label: d.label, value: d.value, pct: ((d.value / total.value) * 100).toFixed(0) }
  })
})
</script>

<template>
  <div class="dt-chart dt-chart--doughnut">
    <div v-if="title" class="dt-chart__title">{{ title }}</div>
    <div class="dt-chart__doughnut-row">
      <svg
        :viewBox="`0 0 ${size} ${size}`"
        :width="fluid ? '100%' : size"
        :height="fluid ? undefined : size"
        preserveAspectRatio="xMidYMid meet"
        class="dt-chart__svg"
      >
        <path
          v-for="(a, i) in arcs"
          :key="i"
          :d="a.path"
          :fill="a.color"
          stroke="var(--dt-white)"
          stroke-width="2"
        />
        <g v-if="centerValue || centerLabel">
          <text
            v-if="centerValue"
            class="dt-chart__center-value"
            :x="Number(size) / 2"
            :y="Number(size) / 2 - (centerLabel ? 4 : -6)"
            text-anchor="middle"
          >{{ centerValue }}</text>
          <text
            v-if="centerLabel"
            class="dt-chart__center-label"
            :x="Number(size) / 2"
            :y="Number(size) / 2 + 18"
            text-anchor="middle"
          >{{ centerLabel }}</text>
        </g>
      </svg>

      <ul v-if="showLegend" class="dt-chart__legend">
        <li v-for="(a, i) in arcs" :key="i">
          <span class="dt-chart__legend-swatch" :style="{ background: a.color }" />
          <span class="dt-chart__legend-label">{{ a.label }}</span>
          <span class="dt-chart__legend-value">{{ a.pct }}%</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dt-chart { font-family: 'DTFlow', sans-serif; color: var(--dt-navy); width: 100%; max-width: 100%; }
.dt-chart__svg { display: block; max-width: 100%; max-height: 100%; height: auto; flex: 0 1 auto; }
.dt-chart__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 500;
  font-size: 0.78em;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--dt-navy);
  margin-bottom: 12px;
  border-bottom: 3px solid var(--dt-accent3);
  padding-bottom: 0.4em;
  display: inline-block;
}
:global(.dark) .dt-chart__title { color: var(--dt-white); }
.dt-chart__doughnut-row { display: flex; align-items: center; gap: 24px; }
.dt-chart__center-value { font-size: 28px; font-weight: 700; fill: var(--dt-navy); }
.dt-chart__center-label { font-size: 11px; font-weight: 500; fill: var(--dt-navy); letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.7; }
.dt-chart__legend { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.dt-chart__legend li { display: grid; grid-template-columns: 14px 1fr auto; align-items: center; gap: 8px; font-size: 12px; padding-left: 0; }
.dt-chart__legend li::before { content: none !important; }
.dt-chart__legend-swatch { width: 12px; height: 12px; border-radius: 2px; display: inline-block; }
.dt-chart__legend-label { font-weight: 300; color: inherit; }
.dt-chart__legend-value { font-weight: 600; color: inherit; }
:global(.dark) .dt-chart { color: var(--dt-white); }
:global(.dark) .dt-chart__center-value,
:global(.dark) .dt-chart__center-label { fill: var(--dt-white); }
:global(.dark) .dt-chart path { stroke: var(--dt-navy); }
</style>
