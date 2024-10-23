<script setup lang="ts">
// iR60kdog
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{
    size?: any;
    elevation?: any;
    padding?: any;
    propsContainer?: any;
  }>(),
  {
    padding: ".33rem",
    size: 192,
    elevation: 2,
  }
);

const padding_ = computed(() =>
  isNumeric(props.padding) ? `${props.padding}px` : props.padding
);
const size_ = computed(() =>
  isNumeric(props.size) ? `${props.size}px` : props.size
);

// @@eos
</script>
<template>
  <VSheet
    class="component--VAvatarProfileImage d-flex items-center justify-center"
    :width="size_"
    :height="size_"
    rounded="circle"
    :style="`padding: ${padding_}`"
    :elevation="elevation"
    v-bind="propsContainer"
  >
    <VAvatar
      class="ma-0 pa-0"
      variant="flat"
      :size="`calc(${size_} - ${padding_})`"
      v-bind="$attrs"
    />
  </VSheet>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
