<script setup>
import sectionBg from '../assets/section-bg.png'

defineProps({
  class: String,
  sectionNumber: {
    type: [String, Number],
    default: '',
  },
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
  <div class="slidev-layout section dt-section">
    <div class="dt-section__bg" :style="{ backgroundImage: `url(${sectionBg})` }" />

    <!-- decorative section number -->
    <div v-if="sectionNumber" class="dt-section__number">{{ sectionNumber }}</div>

    <!-- centered card -->
    <div class="dt-section__card">
      <template v-if="title">
        <h1 class="dt-section__title">{{ title }}</h1>
        <p v-if="subtitle" class="dt-section__subtitle">{{ subtitle }}</p>
      </template>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dt-section {
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

.dt-section__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.dt-section__number {
  position: absolute;
  right: -0.05em;
  bottom: -0.2em;
  font-family: 'DTFlow', sans-serif;
  font-weight: 100;
  font-size: 14em;
  color: rgba(255, 255, 255, 0.05);
  line-height: 1;
  z-index: 2;
  user-select: none;
  pointer-events: none;
}

.dt-section__card {
  position: relative;
  z-index: 10;
  width: 80%;
  max-width: 900px;
  background: linear-gradient(180deg, var(--dt-white) 0%, var(--dt-off-white) 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 64px var(--dt-spacing-h);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5em;
}

.dt-section__card :deep(h1),
.dt-section__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-section-title);
  color: var(--dt-navy);
  margin: 0;
  border: none;
  padding: 0;
  line-height: 1.1;
  text-align: center;
}

.dt-section__card :deep(h2),
.dt-section__subtitle {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: var(--dt-font-body);
  color: var(--dt-navy);
  margin: 0;
  border: none;
  padding: 0;
  text-align: center;
  letter-spacing: 0.02em;
}

.dt-section__card :deep(p) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: var(--dt-font-body);
  color: var(--dt-navy);
  margin: 0;
  text-align: center;
}
</style>
