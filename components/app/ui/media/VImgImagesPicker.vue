<script setup lang="ts">
// L37CVEkpd2mQLX1I1GR8
import { VBtnOpenGallery } from "@/components/app";
import type { ILightboxSlide } from "@/types";
defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{
    defaultNoImage?: string;
    containerProps?: any;
    // signal external form-reset
    keyImagesCleared?: any;
  }>(),
  {
    defaultNoImage: "/no-image.jpg",
    containerProps: {},
  }
);
// { file:File, dataurl:string }[]
const imagesPicked = defineModel();
const numImagesPicked = computed(() =>
  imagesPicked.value ? len(imagesPicked.value) : 0
);
const slidesImagesPicked = computed<ILightboxSlide[]>(() =>
  imagesPicked.value
    ? map(imagesPicked.value, (node: any) => ({
        src: node.dataurl,
        caption: node.file.name,
      }))
    : []
);
const imageCurrent = computed(() =>
  get(imagesPicked.value, "0.dataurl", props.defaultNoImage)
);
const { onChange, open, reset } = useFileDialog({
  accept: "image/*",
  multiple: true,
});
onChange(async (files) => {
  if (isEmpty(files)) return;
  imagesPicked.value = await Promise.all(
    map(files, async (file) => ({ file, dataurl: await dataUrl(file) }))
  );
});
const filesClear = () => {
  reset();
  imagesPicked.value = undefined;
};

onMounted(() => {
  watchEffect(() => {
    if (props.keyImagesCleared) filesClear();
  });
});

// @@eos
</script>
<template>
  <VSheet
    elevation="2"
    rounded
    class="w-full overflow-hidden p-[2px] position-relative"
    v-bind="containerProps"
  >
    <VImg
      :src="imageCurrent"
      rounded
      cover
      class="component--NuxtImgImagesPicker fill-height"
      v-bind="$attrs"
    >
      <VToolbar
        v-if="0 < numImagesPicked"
        class="opacity-50"
        elevation="1"
        height="32"
      >
        <template #prepend>
          <VBtnOpenGallery :slides="slidesImagesPicked" />
        </template>
        <template #append>
          <VBtn
            @click="filesClear"
            icon
            size="small"
            color="error"
            density="comfortable"
          >
            <Icon size="1.22rem" name="material-symbols:delete" />
          </VBtn>
        </template>
      </VToolbar>
      <slot name="action" :open="open">
        <VBtn
          @click="open()"
          size="4.55rem"
          color="surface"
          variant="plain"
          icon
          class="position-absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
        >
          <Icon size="4.55rem" name="material-symbols:photo-camera-rounded" />
        </VBtn>
      </slot>
    </VImg>
  </VSheet>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
