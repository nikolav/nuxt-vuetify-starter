<script setup lang="ts">
// ##imports
import { useDisplay } from "vuetify";
import { Dump } from "@/components/dev";
import {
  VToolbarPrimary,
  VRatingTopicRating,
  VBtnGroupTopicLikeDislike,
  VBtnTopicChatToggle,
  VBtnShareSocialNetworks,
} from "@/components/app";
import { Iconx } from "@/components/icons";
// ##config
definePageMeta({
  layout: "default",
  // middleware: "authorized",
});
const {
  app: { DEFAULT_NO_IMAGE_AVAILABLE },
  layout: { toolbarMainHeight },
} = useAppConfig();

// ##utils
const { ratingAssets, likesAssets, chatAssets } = useTopics();
const { mdAndUp, smAndUp } = useDisplay();
const route = useRoute();
const pid = computed(() => get(route.params, "pid"));
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const { assets: products } = useQueryManageAssetsProducts(() => [pid.value]);
const p = computed(() => first(products.value));
const ID = computed(() => p.value?.id);
const { images } = useFirebaseStorageAssetImages(ID);
// ##computed
const assetPathPublicUrl = usePublicUrlAssetProduct(ID);
const titleProductName = computed(() => p.value?.name || "");
const topicRatingAssets = computed(() => ratingAssets(ID.value));
const topicLikesAsset = computed(() => likesAssets(ID.value));
const topicChatAsset = computed(
  () => `${chatAssets(ID.value)} --title ${kebabCase(titleProductName.value)}`
);
const {
  current: imageCurrent,
  size: imagesLength,
  start: slidesStart,
} = useSampleCollection(images, undefined, undefined, [
  DEFAULT_NO_IMAGE_AVAILABLE,
]);
const assetDescription = computed(() => p.value?.notes || "");
// ##forms ##helpers
const aFields = {
  name: computed(() => p.value?.name),
  linkTo: computed(() => {
    const lnk = get(p.value, "data.link");
    return lnk
      ? {
          href: lnk,
          external: true,
          target: "_blank",
        }
      : undefined;
  }),
};
// ##watch
// ##hooks:lifecycle
useOnceMountedOn(() => 1 < imagesLength.value, slidesStart);
// ##head
useHead({ title: titleProductName });

// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi-pid">
    <VCard :disabled="false" variant="text" rounded="0">
      <VToolbarPrimary
        :props-title="{ class: 'text-start text-body-1 font-italic' }"
        :props-actions="{ class: 'pe-5' }"
        route-back-name="index"
      >
        <template #prepend>
          <Iconx
            size="1.5rem"
            class="ms-1 opacity-30"
            icon="game-icons:cardboard-box-closed"
          />
        </template>
        <template v-if="smAndUp" #title>
          <span> Podaci o proizvodu </span>
        </template>
        <template #actions>
          <VBtnTopicChatToggle :topic="topicChatAsset" />
          <VBtnShareSocialNetworks
            :item="{
              url: assetPathPublicUrl,
              title: titleProductName,
              description: assetDescription,
            }"
            :small="!smAndUp"
            :props-share-buttons="{ color: 'primary-darken-1' }"
            :props-icon-share="{ size: '1.22rem' }"
          />
        </template>
      </VToolbarPrimary>
      <VContainer fluid class="pa-2 ma-0">
        <VRow no-gutters class="pa-0 ma-0">
          <VCol class="pa-0 ma-0" v-if="mdAndUp" md="5" order="-1">
            <VResponsive :height="`calc(100vh - ${toolbarMainHeight}px - 1em)`">
              <VFadeTransition mode="out-in">
                <NuxtImg
                  :key="imageCurrent"
                  class="fill-height *bg-red !object-cover rounded-lg border p-[2px] mx-auto"
                  sizes="100vw"
                  :src="imageCurrent"
                />
              </VFadeTransition>
            </VResponsive>
          </VCol>
          <VCol md="7">
            <section>
              <!-- @@social -->
              <div
                class="__spacer d-flex justify-between items-center pa-1 ps-0"
              >
                <VRatingTopicRating
                  :topic="topicRatingAssets"
                  color="secondary-lighten-2"
                  :density="smAndUp ? undefined : 'compact'"
                />
                <VBtnGroupTopicLikeDislike :topic="topicLikesAsset" />
              </div>
              <!-- @@title -->
              <h1 v-if="aFields.linkTo.value" class="ps-3">
                <NuxtLink v-bind="aFields.linkTo.value">
                  <a class="text-primary-darken-3 text-decoration-underline">
                    <Iconx
                      icon="tabler:external-link"
                      size="1.33rem"
                      class="*-translate-y-px me-3 opacity-20"
                    />
                    <span>
                      {{ aFields.name }}
                    </span>
                  </a>
                </NuxtLink>
              </h1>
              <h1 v-else>{{ aFields.name }}</h1>
            </section>
            <hr />
            <Dump :data="{ images, p }" />
          </VCol>
        </VRow>
      </VContainer>
    </VCard>
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
