<script setup lang="ts">
import { Dump } from "@/components/dev";
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const productsSelected = ref();
// const { products, reload: productsReload, processing } = useQueryProductsList();
const {
  db: {
    Assets: {
      type: { PHYSICAL_PRODUCT },
    },
  },
} = useAppConfig();
const {
  assets: products,
  reload,
  processing,
} = useQueryManageAssets(PHYSICAL_PRODUCT);
const itemLinkTo = (node: any) => ({
  name: "aktiva-proizvodi-pid",
  params: { pid: node.raw.id },
});
const productGrops = (p: any) => [
  String(last(p.name.split(":"))).toLocaleUpperCase(),
];
// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi">
    <VCardDataIterator
      v-model="productsSelected"
      :items="products"
      item-title="name"
      :item-to="itemLinkTo"
      item-value="id"
      :reload="reload"
      :per-page="2"
      :item-groups="productGrops"
      :card-props="{ disabled: processing }"
    >
      <template #menu>
        <pre>{{ productsSelected?.length }}</pre>
      </template>
    </VCardDataIterator>
    <VFabMain :to="{ name: 'aktiva-proizvodi-nov' }" />
  </section>
</template>
<style lang="scss" scoped></style>
