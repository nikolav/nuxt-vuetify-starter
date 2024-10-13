<script setup lang="ts">
import type { ILightboxSlide } from "@/types";
const props = defineProps<{
  slides: ILightboxSlide[];
  options?: Record<string, any> | undefined;
}>();
const { $lightbox } = useNuxtApp();

const vbinds = {
  open: (overideOptions?: any) =>
    $lightbox.open(props.slides, assign({}, props.options, overideOptions)),
};

// @@eos
</script>
<template>
  <slot name="activator" v-bind="{ ...vbinds, slides, options }" />
</template>
<style lang="scss" scoped></style>
