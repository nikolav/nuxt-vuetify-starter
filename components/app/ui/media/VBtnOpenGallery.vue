<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
import type { ILightboxSlide } from "@/types";
import { LightboxSlides } from "@/components/ui";
const props = withDefaults(
  defineProps<{ slides: ILightboxSlide[]; showBadge?: boolean }>(),
  {
    showBadge: true,
  }
);
// @@eos
</script>
<template>
  <LightboxSlides :slides="slides" class="component--VBtnOpenGallery">
    <template #activator="props_">
      <slot name="activator" :showBadge="showBadge" v-bind="props_">
        <VBadge
          color="secondary"
          offset-x="-4"
          floating
          :model-value="showBadge"
          location="end"
          :content="props_.slides.length"
        >
          <VBtn
            @click="props_.open()"
            icon
            color="primary"
            density="comfortable"
            size="small"
            v-bind="$attrs"
          >
            <Icon name="bi:images" size="1.22rem" />
          </VBtn>
        </VBadge>
      </slot>
    </template>
  </LightboxSlides>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
