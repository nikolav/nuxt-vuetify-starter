<script setup lang="ts">
import { useTheme } from "vuetify";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";

const props = withDefaults(defineProps<{ opacity?: number }>(), {
  opacity: 0.5,
});
const color$ = computed(() =>
  secureLeft("#", useTheme().current.value.colors.primary)
);

// #eos
</script>
<template>
  <FadeLoader
    :color="`${color$}`"
    :key="color$"
    :style="`opacity: ${opacity}`"
  />
</template>
