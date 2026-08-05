<script setup>
defineProps({
  class: String,
})
</script>

<template>
  <div class="slidev-layout statement dt-statement">
    <div class="dt-statement__accent-left" />
    <div class="dt-statement__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dt-statement {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  background: var(--dt-white);
  color: var(--dt-navy);
  position: relative;
  overflow: hidden;
  padding: 0;
}

:global(.dark) .dt-statement {
  background: var(--dt-navy);
  color: var(--dt-white);
}

.dt-statement__accent-left {
  width: 6px;
  flex-shrink: 0;
  background: linear-gradient(180deg, var(--dt-accent3), var(--dt-accent1), var(--dt-accent2));
}

.dt-statement__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--dt-spacing-h) 64px;
}

.dt-statement__body :deep(h1),
.dt-statement__body :deep(h2),
.dt-statement__body :deep(p) {
  font-family: 'DTFlow', sans-serif;
  font-weight: 300;
  font-size: 2.2em;
  line-height: 1.4;
  margin: 0;
  border: none;
  padding: 0;
  color: inherit;
}

.dt-statement__body :deep(strong) {
  font-weight: 600;
  color: var(--dt-accent1);
}

:global(.dark) .dt-statement__body :deep(strong) {
  color: var(--dt-accent3);
}


</style>
