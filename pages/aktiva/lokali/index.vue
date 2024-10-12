<script setup lang="ts">
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const {
  db: {
    Assets: {
      type: { PHYSICAL_STORE },
    },
  },
} = useAppConfig();
const {
  assets: sites,
  processing,
  reload: sitesReload,
} = useQueryManageAssets(PHYSICAL_STORE);
const itemLinkToSite = (node: any) => ({
  name: "aktiva-lokali-sid",
  params: { sid: node.raw.id },
});
const sitesSelected = ref();

// @@eos
</script>
<template>
  <section class="page--aktiva-lokali">
    <VCardDataIterator
      v-model="sitesSelected"
      :items="sites"
      :card-props="{ disabled: processing }"
      item-title="name"
      :item-to="itemLinkToSite"
      :per-page="2"
      :reload="sitesReload"
    >
      <template #menu> foo </template>
    </VCardDataIterator>
    <VFabMain :to="{ name: 'aktiva-lokali-nov' }" />
  </section>
</template>
<style lang="scss" scoped></style>
