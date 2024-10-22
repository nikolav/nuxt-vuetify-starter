<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
import type { ILightboxSlide } from "@/types";
import { LightboxSlides } from "@/components/ui";
const props = withDefaults(
  defineProps<{
    slides: ILightboxSlide[];
    showBadge?: boolean;
    hideIfEmpty?: boolean;
    propsBadge?: any;
  }>(),
  {
    showBadge: true,
  }
);
const isEmptySLides = computed(() => isEmpty(props.slides));

// @@eos
</script>
<template>
  <LightboxSlides
    v-if="!isEmptySLides || !hideIfEmpty"
    :slides="slides"
    class="component--VBtnOpenGallery"
  >
    <template #activator="props_">
      <slot name="activator" :showBadge="showBadge" v-bind="props_">
        <VBadge
          color="secondary"
          offset-x="-8"
          floating
          :model-value="showBadge"
          location="end"
          :content="props_.slides.length"
          v-bind="propsBadge"
        >
          <VBtn
            @click.stop.prevent="props_.open()"
            icon
            color="primary"
            size="small"
            :disabled="isEmptySLides"
            v-bind="$attrs"
          >
            <slot name="icon">
              <Icon name="bi:images" size="1.22rem" />
            </slot>
          </VBtn>
        </VBadge>
      </slot>
    </template>
  </LightboxSlides>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
