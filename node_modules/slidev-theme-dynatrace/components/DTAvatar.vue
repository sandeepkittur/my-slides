<script setup>
import { computed } from 'vue'

const props = defineProps({
  src:  { type: String, default: null },
  name: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg | full
})

const initials = computed(() => {
  return props.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
})
</script>

<template>
  <div :class="['dt-avatar', `dt-avatar--${size}`]">
    <img v-if="src" :src="src" :alt="name" class="dt-avatar__img" />
    <span v-else class="dt-avatar__initials">{{ initials }}</span>
  </div>
</template>

<style scoped>
.dt-avatar {
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--dt-accent1), var(--dt-accent2));
}

.dt-avatar--sm   { width: 2em;   height: 2em;   font-size: 0.7em; }
.dt-avatar--md   { width: 3em;   height: 3em;   font-size: 0.85em; }
.dt-avatar--lg   { width: 4.5em; height: 4.5em; font-size: 1.1em; }
.dt-avatar--full { width: 100%;  height: 100%;  font-size: 1.2em; border-radius: 0; }

.dt-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.dt-avatar__initials {
  font-family: 'DTFlow', sans-serif;
  font-weight: 600;
  color: white;
  line-height: 1;
  letter-spacing: 0.03em;
}
</style>
