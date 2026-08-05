<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  dark: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <footer class="dt-footer" :class="{ 'dt-footer--dark': dark }">
    <div class="dt-footer__gradient" />
    <div class="dt-footer__content">
      <span v-if="text" class="dt-footer__text">{{ text }}</span>
      <slot />
    </div>
  </footer>
</template>

<style scoped>
.dt-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.dt-footer__gradient {
  height: 3px;
  background: linear-gradient(90deg, #49C2B3, #3BACF0, #1966FF, #5E28E5, #8D1CDC, #C93FDB);
}

.dt-footer__content {
  padding: 6px 32px;
  font-size: 0.65em;
  color: var(--dt-muted);
  display: flex;
  align-items: center;
  gap: 1em;
}

.dt-footer--dark .dt-footer__content {
  color: rgba(255,255,255,0.5);
}
</style>
