<script setup lang="ts">
interface TLightboxSlide {
  src: any;
  caption?: string | undefined;
  thumb?: string | undefined;
  type?: any;
  // type?: "image" | "iframe" | "video" | "pdf" | "inline" | "html"| "ajax" | "youtube" | "vimeo" | undefined;
}
const props = defineProps<{
  slides: TLightboxSlide[];
  options?: Record<string, any> | undefined;
}>();
const { $lightbox } = useNuxtApp();

const bindProps = {
  open: (overideOptions?: any) =>
    $lightbox.open(props.slides, assign({}, props.options, overideOptions)),
};

// @@eos
</script>
<template>
  <slot name="activator" v-bind="{ ...bindProps, slides, options }" />
</template>
<style lang="scss" scoped></style>
