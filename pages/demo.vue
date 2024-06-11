<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const gv = useStoreGravatars();

// const {
//   stores: {
//     gravatars: { GRAVATARS_CACHE },
//   },
// } = useAppConfig();
// const { data } = useDoc(GRAVATARS_CACHE);

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <VBtn @click="gv.refresh()">refresh</VBtn>
    <VAvatar :image="gv.src" />
    <Dump :data="{ store: gv.store }" />
  </section>
</template>
<style lang="scss" scoped></style>
