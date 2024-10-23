<script setup lang="ts">
import { useDisplay } from "vuetify";
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { smAndUp } = useDisplay();

const {
  assets: sites,
  processing,
  reload: sitesReload,
} = useQueryManageAssetsSites();
const itemLinkToSite = (item: any) => ({
  name: "aktiva-lokali-sid",
  params: { sid: item?.id },
});
const sitesSelected = ref();

useHead({ title: "Lokali" });
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
    <VFabMain
      :class="[smAndUp ? '-translate-x-12' : '-translate-y-8 translate-x-2']"
      :to="{ name: 'aktiva-lokali-nov' }"
    />
  </section>
</template>
<style lang="scss" scoped></style>
