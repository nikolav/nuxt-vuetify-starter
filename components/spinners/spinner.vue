<script setup lang="ts">
import { useTheme } from "vuetify";
// import FadeLoader from "vue-spinner/src/FadeLoader.vue";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";

const props = withDefaults(defineProps<{ opacity?: number }>(), {
  opacity: 0.5,
});
const theme = useTheme();
const colorCurrentPrimary = computed(() =>
  secureLeft("#", theme.current.value.colors.primary)
);

// #eos
</script>
<template>
  <FadeLoader
    :color="`${colorCurrentPrimary}`"
    :key="colorCurrentPrimary"
    :style="`opacity: ${opacity}`"
  />
</template>
