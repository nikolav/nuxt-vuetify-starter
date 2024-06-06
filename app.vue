<script lang="ts" setup>
import { SpinnerAppProcessing } from "@/components/ui";
const {
  $theme: { theme },
} = useNuxtApp();

// #seo :locale
const localeHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
// #eos
</script>
<template>
  <VApp :theme="theme" class="component--app-main">
    <!-- locale seo, i18n, html, title, links, meta -->
    <Html :lang="localeHead.htmlAttrs.lang" :dir="localeHead.htmlAttrs.dir" />
    <!-- <Title>{{ title }}</Title> -->
    <template v-for="link in localeHead.link" :key="link.id">
      <Link
        :id="link.id"
        :rel="link.rel"
        :href="link.href"
        :hreflang="link.hreflang"
      />
    </template>
    <template v-for="meta in localeHead.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
    <!-- @pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- @ui:status -->
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing :opacity="0.8" />
  </VApp>
</template>
<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.24s;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}
</style>
