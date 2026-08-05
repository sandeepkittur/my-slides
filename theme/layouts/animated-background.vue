<script setup>
import DTAnimatedBackground from '../components/DTAnimatedBackground.vue'
</script>

<template>
  <div class="slidev-layout animated-background dt-animated-bg-layout">
    <DTAnimatedBackground />

    <div class="dt-animated-bg-layout__logo">
      <DTLogo variant="white" :width="140" />
    </div>

    <div class="dt-animated-bg-layout__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dt-animated-bg-layout {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  color: var(--dt-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
}

.dt-animated-bg-layout__logo {
  position: absolute;
  top: 36px;
  right: var(--dt-spacing-h);
  z-index: 10;
}

.dt-animated-bg-layout__body {
  position: relative;
  z-index: 10;
  padding: 0 var(--dt-spacing-h);
  width: 100%;
  max-width: 820px;
  margin-top: 48px;
}

.dt-animated-bg-layout__body :deep(h1) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-cover-title);
  color: var(--dt-white);
  margin: 0 0 0.2em;
  border: none;
  padding: 0;
  line-height: 1.1;
}

.dt-animated-bg-layout__body :deep(h2),
.dt-animated-bg-layout__body :deep(p) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: var(--dt-white);
  margin: 0 0 1em;
}
</style>
