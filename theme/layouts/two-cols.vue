<script setup>
import { useNav } from '@slidev/client'

const props = defineProps({
  class: String,
  heading: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  confidential: {
    type: Boolean,
    default: true,
  },
})

const { currentSlideNo } = useNav()
</script>

<template>
  <div class="slidev-layout two-cols dt-two-cols">
    <!-- header: prop heading (or legacy title) or slot -->
    <div class="dt-two-cols__header">
      <h1 v-if="heading || title" class="dt-two-cols__title">{{ heading || title }}</h1>
      <slot name="header" />
    </div>

    <!-- two columns -->
    <div class="dt-two-cols__columns">
      <div class="dt-two-cols__left">
        <slot name="left" />
        <slot />
      </div>
      <div class="dt-two-cols__divider" />
      <div class="dt-two-cols__right">
        <slot name="right" />
      </div>
    </div>

    <!-- footer: confidential (left) + icon + divider + slide number (right) -->
    <div class="dt-two-cols__footer">
      <span v-if="confidential" class="dt-two-cols__footer-confidential">Confidential</span>
      <span class="dt-two-cols__footer-right">
        <DTLogoIcon variant="black" :size="22" />
        <span class="dt-two-cols__footer-divider" />
        <span class="dt-two-cols__footer-pageno">{{ currentSlideNo }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.dt-two-cols {
  display: flex;
  flex-direction: column;
  background: var(--dt-white);
  color: var(--dt-navy);
  position: relative;
  overflow: hidden;
  padding: 0;
}

:global(.dark) .dt-two-cols {
  background: var(--dt-navy);
  color: var(--dt-white);
}

.dt-two-cols__header {
  padding: var(--dt-spacing-v) var(--dt-spacing-h) 0;
  flex-shrink: 0;
}

.dt-two-cols :deep(h1),
.dt-two-cols__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-slide-title);
  margin: 0 0 0.5em;
  padding: 0 0 0.25em;
  border: none;
  position: relative;
  display: inline-block;
  color: inherit;
}

.dt-two-cols :deep(h1)::after,
.dt-two-cols__title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 88px;
  height: 4px;
  background: linear-gradient(90deg, var(--dt-accent2) 0%, var(--dt-accent1) 47%, var(--dt-accent3) 100%);
}

.dt-two-cols__columns {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0;
  padding: 16px var(--dt-spacing-h) 8px;
  overflow: auto;
}

.dt-two-cols__left,
.dt-two-cols__right {
  padding: 0 24px;
}

.dt-two-cols__left {
  padding-left: 0;
}

.dt-two-cols__right {
  padding-right: 0;
}

.dt-two-cols__divider {
  background: var(--dt-gray);
  margin: 8px 0;
}

:global(.dark) .dt-two-cols__divider {
  background: rgba(255,255,255,0.15);
}

.dt-two-cols__footer {
  flex-shrink: 0;
  padding: 12px var(--dt-spacing-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: var(--dt-font-small);
  color: inherit;
}

.dt-two-cols__footer-confidential {
  color: var(--dt-muted);
  letter-spacing: 0.08em;
  font-weight: 300;
  text-transform: uppercase;
  font-size: var(--dt-font-small);
}

:global(.dark) .dt-two-cols__footer-confidential {
  color: rgba(255, 255, 255, 0.5);
}

.dt-two-cols__footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dt-two-cols__footer-divider {
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, var(--dt-accent2) 0%, var(--dt-accent1) 47%, var(--dt-accent3) 100%);
}

.dt-two-cols__footer-pageno {
  letter-spacing: 0.02em;
  font-weight: 500;
}
</style>
