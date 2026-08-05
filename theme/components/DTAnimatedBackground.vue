<template>
  <canvas ref="canvasRef" class="dt-animated-bg-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ColorWave from './animated-background/gradient-animation.js'

const canvasRef = ref(null)
let colorWave = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  if (canvas.parentElement) {
    canvas.parentElement.style.isolation = 'isolate'
  }

  colorWave = new ColorWave(canvas)
  colorWave.initColorWave()
})

onUnmounted(() => {
  colorWave?.destroy?.()
  colorWave = null
})
</script>

<style scoped>
.dt-animated-bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1000;
}
</style>
