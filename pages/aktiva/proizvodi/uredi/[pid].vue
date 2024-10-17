<script setup lang="ts">
// ##notes
// updates
//   name, code, barcode, link, notes, images
// ##imports
import { Dump } from "@/components/dev";
import { VToolbarPrimary, VImgImagesPicker } from "@/components/app";
import { Iconx } from "@/components/icons";
// ##config
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
useHead({ title: "Ažuriraj proizvod" });
const IMAGE_PICKER_SIZE_MAX = {
  h: 255,
  w: 320,
};
// ##utils
const route = useRoute();
const { file } = useFetchUrlToFileData();
const { firebasePathAssets } = useTopics();
// ##icons
// ##refs
const newProductImagesPicked = ref();
const imagesUpdated = ref();
const pid = computed(() => get(route.params, "pid"));
// ##state ##data ##auth
const { ls, url } = useFirebaseStorage(() => firebasePathAssets(pid.value));
const { products } = useQueryProductsList(() => [pid.value]);
// ##computed
const p = computed(() => first(products.value));
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle
useOnceMountedOn(true, async () => {
  newProductImagesPicked.value = await Promise.all(
    map(await ls(), async (node) => {
      const f = await file(await url(node.name), node.name);
      return {
        file: f,
        dataurl: await dataUrl(f as File),
      };
    })
  );
});
// ##handlers
const onUpdateModelValue = (args: any[]) => {
  imagesUpdated.value = !isEmpty(args);
};

// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi-uredi-pid">
    <VCard variant="text" rounded="0">
      <VToolbarPrimary text="Ažuriraj proizvod">
        <template #prepend>
          <Iconx size="1.22rem" class="opacity-40 ms-1" icon="$iconBox3DEdit" />
        </template>
      </VToolbarPrimary>
      <VCardText>
        <VImgImagesPicker
          v-model="newProductImagesPicked"
          @update:model-value="onUpdateModelValue"
          :props-container="{
            height: IMAGE_PICKER_SIZE_MAX.h,
            maxWidth: IMAGE_PICKER_SIZE_MAX.w,
            class: 'mx-auto',
          }"
          :height="IMAGE_PICKER_SIZE_MAX.h - 4"
          :max-width="IMAGE_PICKER_SIZE_MAX.w"
        />
      </VCardText>
    </VCard>

    <Dump :data="{ imagesUpdated, p }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
