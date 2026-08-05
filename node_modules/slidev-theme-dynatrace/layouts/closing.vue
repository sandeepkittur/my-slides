<script setup>
import coverBg from '../assets/cover-bg.png'

defineProps({
  class: String,
})
</script>

<template>
  <div class="slidev-layout closing dt-closing">
    <div class="dt-closing__bg" :style="{ backgroundImage: `url(${coverBg})` }" />
    <div class="dt-closing__overlay" />

    <!-- logo top-right -->
    <div class="dt-closing__logo">
      <DTLogo variant="white" :width="140" />
    </div>

    <!-- centered content -->
    <div class="dt-closing__body">
      <slot />
    </div>

    <!-- contact / footer slot -->
    <div class="dt-closing__footer">
      <slot name="contact" />
    </div>
  </div>
</template>

<style scoped>
.dt-closing {
  position: relative;
  overflow: hidden;
  background-color: var(--dt-navy);
  color: var(--dt-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0;
}

.dt-closing__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.dt-closing__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 9, 47, 0.2);
  z-index: 1;
}

.dt-closing__logo {
  position: absolute;
  top: var(--dt-spacing-v);
  right: var(--dt-spacing-h);
  z-index: 10;
}

.dt-closing__body {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
  padding: 0 var(--dt-spacing-h);
  max-width: 760px;
}

.dt-closing__body :deep(h1),
.dt-closing__body :deep(h2) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-cover-title);
  color: var(--dt-white);
  margin: 0;
  border: none;
  padding: 0;
}

.dt-closing__body :deep(p) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: var(--dt-font-body-sm);
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

.dt-closing__footer {
  position: absolute;
  bottom: var(--dt-spacing-v);
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 0 var(--dt-spacing-h);
  font-size: var(--dt-font-small);
  color: rgba(255, 255, 255, 0.6);
}
</style>
