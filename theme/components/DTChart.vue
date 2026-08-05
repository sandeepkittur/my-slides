<script setup>
// Generic chart wrapper: adds a DT-styled title and a fixed-height frame
// around any chart content (Mermaid diagram, DT chart component, custom SVG).
//
// Usage in markdown:
//   <DTChart title="Tool Loop" :height="380">
//
//   ```mermaid
//   flowchart LR
//     A --> B
//   ```
//
//   </DTChart>
defineProps({
  title: { type: String, default: '' },
  // Pixel height of the chart frame. Mermaid SVGs scale proportionally to fit.
  height: { type: [String, Number], default: 400 },
  // Constrain max width so very wide diagrams stay readable on full-width slides
  maxWidth: { type: [String, Number], default: '' },
})
</script>

<template>
  <div class="dt-chart-wrap" :style="{ maxWidth: maxWidth ? (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth) : null }">
    <div v-if="title" class="dt-chart-title">{{ title }}</div>
    <div
      class="dt-chart-wrap__body"
      :style="{ height: typeof height === 'number' ? `${height}px` : height }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dt-chart-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}

.dt-chart-wrap__body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
}

/* When the body contains a Mermaid diagram, let the diagram fill the body
   instead of using its own default 400px height. */
.dt-chart-wrap__body :deep(.mermaid) {
  width: 100%;
  height: 100%;
}

/* When wrapping a DT chart component, no extra sizing needed — those are
   already fluid. Just inherit the body's flex behavior. */
.dt-chart-wrap__body :deep(.dt-chart) {
  width: 100%;
  height: 100%;
}
</style>
