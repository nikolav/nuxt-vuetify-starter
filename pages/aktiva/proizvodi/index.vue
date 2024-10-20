<script setup lang="ts">
import { Dump } from "@/components/dev";
import {
  VFabMain,
  VCardDataIterator,
  ProvideAssetImages,
  VBtnOpenGallery,
} from "@/components/app";
import { Iconx } from "@/components/icons";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const productsSelected = ref();
const { assets: products, reload, processing } = useQueryManageAssetsProducts();
const itemLinkTo = (node: any) => ({
  name: "aktiva-proizvodi-pid",
  params: { pid: node.raw.id },
});
const productGrops = (p: any) => [
  String(last(p.name.split(":"))).toLocaleUpperCase(),
];
const getid = (node: any) => get(node, "id");
const { $lightbox } = useNuxtApp();

// ##head
useHead({ title: "Roba" });

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
      <template #list-item-title="{ item, title }">
        <span class="d-inline-flex items-center translate-y-[2px]">
          <!-- @@btn:assets:images -->
          <ProvideAssetImages :aid="getid(item)" v-slot="{ images }">
            <VBtnOpenGallery
              :hide-if-empty="true"
              :slides="images.map((src) => ({ src }))"
              :show-badge="false"
              variant="text"
              color="secondary"
              density="comfortable"
              class="pa-0 ma-0"
            />
          </ProvideAssetImages>
          <span class="ps-3">{{ title }}</span>
        </span>
      </template>
      <template #list-item-append="{ item }">
        <VBtn
          @click.stop.prevent
          :to="{
            name: 'aktiva-proizvodi-uredi-pid',
            params: { pid: getid(item) },
          }"
          icon
          density="comfortable"
          variant="plain"
          color="secondary"
        >
          <Iconx icon="$edit" />
        </VBtn>
      </template>
    </VCardDataIterator>
    <VFabMain :to="{ name: 'aktiva-proizvodi-nov' }" />
  </section>
</template>
<style lang="scss" scoped></style>
