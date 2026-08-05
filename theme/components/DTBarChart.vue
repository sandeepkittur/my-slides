<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  // [{ label: 'Mon', value: 12 }, ...] OR [{ label, values: [v1, v2, ...] }, ...] for multi-series
  data: { type: Array, required: true },
  // ['Series A', 'Series B'] for multi-series
  series: { type: Array, default: () => [] },
  // width/height define the SVG viewBox (and internal coordinate system).
  // By default the chart renders fluid (100% width, auto height via viewBox).
  // Pass numeric width/height props to force a specific rendered size.
  width: { type: [String, Number], default: 520 },
  height: { type: [String, Number], default: 280 },
  fluid: { type: Boolean, default: true },
  yTicks: { type: Number, default: 5 },
})

const PALETTE = ['#1866FE', '#7F1AFE', '#01D393', '#85ADFF', '#C499FE', '#5CFDCC']
const PAD = { top: 16, right: 16, bottom: 44, left: 44 }

const isMulti = computed(() => props.data.some(d => Array.isArray(d.values)))

const seriesCount = computed(() => isMulti.value ? Math.max(...props.data.map(d => d.values.length)) : 1)

const maxVal = computed(() => {
  const vals = isMulti.value
    ? props.data.flatMap(d => d.values)
    : props.data.map(d => d.value)
  const m = Math.max(...vals)
  const order = Math.pow(10, Math.floor(Math.log10(m)))
  return Math.ceil(m / order) * order
})

const inner = computed(() => ({
  w: Number(props.width) - PAD.left - PAD.right,
  h: Number(props.height) - PAD.top - PAD.bottom,
}))

const yTickValues = computed(() => {
  const out = []
  for (let i = 0; i <= props.yTicks; i++)
    out.push(Math.round((maxVal.value / props.yTicks) * i))
  return out
})

function barRect(catIdx, serIdx) {
  const groupW = inner.value.w / props.data.length
  const groupPad = groupW * 0.2
  const usable = groupW - groupPad
  const barW = usable / seriesCount.value
  const x = PAD.left + catIdx * groupW + groupPad / 2 + serIdx * barW
  const v = isMulti.value ? props.data[catIdx].values[serIdx] : props.data[catIdx].value
  const height = (v / maxVal.value) * inner.value.h
  const y = PAD.top + inner.value.h - height
  return { x, y, width: barW * 0.85, height }
}
</script>

<template>
  <div class="dt-chart dt-chart--bar">
    <div v-if="title" class="dt-chart__title">{{ title }}</div>
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      :width="fluid ? '100%' : width"
      :height="fluid ? undefined : height"
      preserveAspectRatio="xMidYMid meet"
      class="dt-chart__svg"
    >
      <!-- gridlines + y ticks -->
      <g class="dt-chart__grid">
        <line
          v-for="(t, i) in yTickValues"
          :key="i"
          :x1="PAD.left"
          :x2="PAD.left + inner.w"
          :y1="PAD.top + inner.h - (t / maxVal) * inner.h"
          :y2="PAD.top + inner.h - (t / maxVal) * inner.h"
        />
        <text
          v-for="(t, i) in yTickValues"
          :key="`t${i}`"
          class="dt-chart__tick-label"
          :x="PAD.left - 8"
          :y="PAD.top + inner.h - (t / maxVal) * inner.h + 4"
          text-anchor="end"
        >{{ t }}</text>
      </g>

      <!-- bars -->
      <g class="dt-chart__bars">
        <template v-for="(d, ci) in data" :key="ci">
          <rect
            v-for="si in seriesCount"
            :key="`${ci}-${si}`"
            v-bind="barRect(ci, si - 1)"
            :fill="PALETTE[(si - 1) % PALETTE.length]"
            rx="2"
          />
        </template>
      </g>

      <!-- x-axis baseline -->
      <line
        class="dt-chart__axis"
        :x1="PAD.left"
        :x2="PAD.left + inner.w"
        :y1="PAD.top + inner.h"
        :y2="PAD.top + inner.h"
      />

      <!-- x labels -->
      <text
        v-for="(d, i) in data"
        :key="`x${i}`"
        class="dt-chart__tick-label"
        :x="PAD.left + (i + 0.5) * (inner.w / data.length)"
        :y="PAD.top + inner.h + 18"
        text-anchor="middle"
      >{{ d.label }}</text>

      <!-- legend (multi-series) -->
      <g v-if="isMulti && series.length" :transform="`translate(${PAD.left}, ${Number(height) - 12})`">
        <g v-for="(s, i) in series" :key="i" :transform="`translate(${i * 110}, 0)`">
          <rect :fill="PALETTE[i % PALETTE.length]" width="10" height="10" rx="2" />
          <text class="dt-chart__legend-label" x="16" y="9">{{ s }}</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.dt-chart { font-family: 'DTFlow', sans-serif; color: var(--dt-navy); width: 100%; max-width: 100%; }
.dt-chart__svg { display: block; max-width: 100%; max-height: 100%; height: auto; }
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
.dt-chart__grid line { stroke: var(--dt-gray); stroke-width: 1; }
.dt-chart__axis { stroke: var(--dt-navy); stroke-width: 1; }
.dt-chart__tick-label { font-size: 11px; font-weight: 300; fill: var(--dt-navy); }
.dt-chart__legend-label { font-size: 11px; font-weight: 500; fill: var(--dt-navy); }
:global(.dark) .dt-chart { color: var(--dt-white); }
:global(.dark) .dt-chart__grid line { stroke: rgba(255,255,255,0.15); }
:global(.dark) .dt-chart__axis { stroke: var(--dt-white); }
:global(.dark) .dt-chart__tick-label,
:global(.dark) .dt-chart__legend-label { fill: var(--dt-white); }
</style>
