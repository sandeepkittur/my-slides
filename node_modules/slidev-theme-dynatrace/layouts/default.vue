<script setup>
import { useNav } from '@slidev/client'

defineProps({
  class: String,
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
  <div class="slidev-layout default dt-default">
    <!-- slide content -->
    <div class="dt-default__content">
      <h1 v-if="title" class="dt-default__title">{{ title }}</h1>
      <slot />
    </div>

    <!-- footer: confidential (left) + icon + divider + slide number (right) -->
    <div class="dt-default__footer">
      <span v-if="confidential" class="dt-default__footer-confidential">Confidential</span>
      <span class="dt-default__footer-right">
        <DTLogoIcon variant="black" :size="22" />
        <span class="dt-default__footer-divider" />
        <span class="dt-default__footer-pageno">{{ currentSlideNo }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.dt-default {
  display: flex;
  flex-direction: column;
  background: var(--dt-white);
  color: var(--dt-navy);
  position: relative;
  overflow: hidden;
  padding: 0;
}

:global(.dark) .dt-default {
  background: var(--dt-navy);
  color: var(--dt-white);
}

.dt-default__content {
  flex: 1;
  padding: var(--dt-spacing-v) var(--dt-spacing-h) 16px;
  overflow: auto;
}

/* title: text + short gradient bar underneath */
.dt-default__content :deep(h1),
.dt-default__title {
  font-family: 'DTFlow', sans-serif;
  font-weight: 700;
  font-size: var(--dt-font-slide-title);
  color: inherit;
  margin: 0 0 0.5em;
  padding: 0 0 0.25em;
  border: none;
  position: relative;
  display: inline-block;
}

.dt-default__content :deep(h1)::after,
.dt-default__title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 88px;
  height: 4px;
  background: linear-gradient(90deg, var(--dt-accent2) 0%, var(--dt-accent1) 47%, var(--dt-accent3) 100%);
}

/* footer */
.dt-default__footer {
  flex-shrink: 0;
  padding: 12px var(--dt-spacing-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: var(--dt-font-small);
  color: var(--dt-navy);
}

:global(.dark) .dt-default__footer {
  color: rgba(255, 255, 255, 0.7);
}

.dt-default__footer-confidential {
  color: var(--dt-muted);
  letter-spacing: 0.08em;
  font-weight: 300;
  text-transform: uppercase;
  font-size: var(--dt-font-small);
}

:global(.dark) .dt-default__footer-confidential {
  color: rgba(255, 255, 255, 0.5);
}

.dt-default__footer-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dt-default__footer-divider {
  width: 3px;
  height: 18px;
  background: linear-gradient(180deg, var(--dt-accent2) 0%, var(--dt-accent1) 47%, var(--dt-accent3) 100%);
}

.dt-default__footer-pageno {
  letter-spacing: 0.02em;
  font-weight: 500;
}
</style>
