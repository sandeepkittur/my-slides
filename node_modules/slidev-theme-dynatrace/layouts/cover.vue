<script setup>
import coverBg from '../assets/cover-bg.png'

defineProps({
  class: String,
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="slidev-layout cover dt-cover">
    <!-- background image -->
    <div class="dt-cover__bg" :style="{ backgroundImage: `url(${coverBg})` }" />
    <!-- dark overlay -->
    <div class="dt-cover__overlay" />

    <!-- logo top-right -->
    <div class="dt-cover__logo">
      <DTLogo variant="white" :width="140" />
    </div>

    <!-- centered content -->
    <div class="dt-cover__body">
      <template v-if="title">
        <h1 class="dt-cover__title">{{ title }}</h1>
        <p v-if="subtitle" class="dt-cover__subtitle">{{ subtitle }}</p>
      </template>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dt-cover {
  position: relative;
  overflow: hidden;
  background-color: var(--dt-navy);
  color: var(--dt-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
}

.dt-cover__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.dt-cover__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 9, 47, 0.2);
  z-index: 1;
}

.dt-cover__logo {
  position: absolute;
  top: 36px;
  right: var(--dt-spacing-h);
  z-index: 10;
}

.dt-cover__body {
  position: relative;
  z-index: 10;
  padding: 0 var(--dt-spacing-h);
  width: 100%;
  max-width: 820px;
  margin-top: 48px;
}

.dt-cover__body :deep(h1),
.dt-cover__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-cover-title);
  color: var(--dt-white);
  margin: 0 0 0.2em;
  border: none;
  padding: 0;
  line-height: 1.1;
}

.dt-cover__body :deep(h2),
.dt-cover__body :deep(p),
.dt-cover__subtitle {
  font-family: 'DTFlow', sans-serif;
  font-weight: 500;
  font-size: 1.5em;
  color: var(--dt-white);
  margin: 0 0 1em;
}
</style>
