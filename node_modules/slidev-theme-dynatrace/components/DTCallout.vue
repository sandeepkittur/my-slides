<script setup>
defineProps({
  type: { type: String, default: 'info' }, // info | success | warning | error
  title: { type: String, default: '' },
})
</script>
<template>
  <div :class="['dt-callout', type]">
    <div v-if="title" class="dt-callout__title">{{ title }}</div>
    <slot />
  </div>
</template>
<style scoped>
.dt-callout { border-left: 4px solid; border-radius: 0 6px 6px 0; padding: 0.75em 1em; margin: 1.25em 0; font-size: 0.9em; }
.dt-callout__title { font-weight: 700; margin-bottom: 0.25em; font-size: 0.95em; }
.info    { border-color: var(--dt-accent1); background: rgba(24,102,254,0.09); color: inherit; }
.success { border-color: var(--dt-accent3); background: rgba(1,211,147,0.09); color: inherit; }
.warning { border-color: var(--dt-warning);  background: rgba(253,195,0,0.09); color: inherit; }
.error   { border-color: var(--dt-error);    background: rgba(244,61,90,0.09); color: inherit; }
.dt-callout__title { color: inherit; }
</style>
