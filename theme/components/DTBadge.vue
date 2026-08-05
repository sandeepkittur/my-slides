<script setup>
defineProps({
  color: { type: String, default: 'blue' }, // blue | teal | purple | cyan | gray | warning | error
})
</script>
<template>
  <span :class="['dt-badge', color]"><slot /></span>
</template>
<style scoped>
.dt-badge { display: inline-block; padding: 0.15em 0.6em; border-radius: 999px; font-size: 0.72em; font-weight: 600; font-family: 'DTFlow', sans-serif; letter-spacing: 0.02em; vertical-align: middle; }
.blue    { background: var(--dt-accent1); color: var(--dt-white); }
.teal    { background: var(--dt-accent3); color: var(--dt-navy); }
.purple  { background: var(--dt-accent2); color: var(--dt-white); }
.cyan    { background: var(--dt-accent6); color: var(--dt-navy); }
.gray    { background: var(--dt-gray);    color: var(--dt-navy); }
.warning { background: var(--dt-warning); color: var(--dt-navy); }
.error   { background: var(--dt-error);   color: var(--dt-white); }
</style>
