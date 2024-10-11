<script setup lang="ts">
// iR60kdog
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{ elevation?: number; padding?: any }>(),
  {
    padding: ".22rem",
  }
);

const padding_ = computed(() =>
  isNumeric(props.padding) ? `${props.padding}px` : props.padding
);

// @@eos
</script>
<template>
  <VSheet
    class="component--VAvatarProfileImage d-flex items-center justify-center"
    rounded="circle"
    :style="`padding: ${padding_}`"
    :elevation="elevation"
  >
    <VAvatar class="ma-0 pa-0" variant="flat" v-bind="$attrs" />
  </VSheet>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
