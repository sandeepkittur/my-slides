<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  // [{ label: 'Mon', values: [v1, v2, ...] }, ...]
  data: { type: Array, required: true },
  series: { type: Array, default: () => [] },
  width: { type: [String, Number], default: 520 },
  height: { type: [String, Number], default: 280 },
  fluid: { type: Boolean, default: true },
  yTicks: { type: Number, default: 5 },
})

const PALETTE = ['#1866FE', '#7F1AFE', '#01D393', '#85ADFF', '#C499FE', '#5CFDCC']
const PAD = { top: 16, right: 16, bottom: 44, left: 44 }

const seriesCount = computed(() => Math.max(...props.data.map(d => (d.values || [d.value]).length)))

const maxVal = computed(() => {
  const vals = props.data.flatMap(d => d.values || [d.value])
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

function point(ci, si) {
  const x = PAD.left + (ci / (props.data.length - 1)) * inner.value.w
  const v = (props.data[ci].values || [props.data[ci].value])[si]
  const y = PAD.top + inner.value.h - (v / maxVal.value) * inner.value.h
  return { x, y, v }
}

const paths = computed(() => {
  const out = []
  for (let si = 0; si < seriesCount.value; si++) {
    const pts = props.data.map((_, ci) => point(ci, si))
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    out.push({ d, pts, color: PALETTE[si % PALETTE.length] })
  }
  return out
})
</script>

<template>
  <div class="dt-chart dt-chart--line">
    <div v-if="title" class="dt-chart__title">{{ title }}</div>
    <svg
      :viewBox="`0 0 ${width} ${height}`"
      :width="fluid ? '100%' : width"
      :height="fluid ? undefined : height"
      preserveAspectRatio="xMidYMid meet"
      class="dt-chart__svg"
    >
      <!-- gridlines -->
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

      <!-- series lines + dots -->
      <g class="dt-chart__series">
        <g v-for="(p, si) in paths" :key="si">
          <path :d="p.d" fill="none" :stroke="p.color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle v-for="(pt, i) in p.pts" :key="i" :cx="pt.x" :cy="pt.y" r="4" :fill="p.color" />
        </g>
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
        :x="PAD.left + (i / (data.length - 1)) * inner.w"
        :y="PAD.top + inner.h + 18"
        text-anchor="middle"
      >{{ d.label }}</text>

      <!-- legend -->
      <g v-if="series.length" :transform="`translate(${PAD.left}, ${Number(height) - 12})`">
        <g v-for="(s, i) in series" :key="i" :transform="`translate(${i * 110}, 0)`">
          <line :x1="0" :x2="14" :y1="6" :y2="6" :stroke="PALETTE[i % PALETTE.length]" stroke-width="2.5" />
          <circle :cx="7" :cy="6" r="3" :fill="PALETTE[i % PALETTE.length]" />
          <text class="dt-chart__legend-label" x="22" y="9">{{ s }}</text>
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
