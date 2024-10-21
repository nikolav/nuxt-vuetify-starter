<script setup lang="ts">
import {
  VFabMain,
  VCardDataIterator,
  ProvideAssetImages,
  VBtnOpenGallery,
  VSheetPinCodeRequired,
} from "@/components/app";
import { Iconx } from "@/components/icons";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
const {
  app: { DEFAULT_TRANSITION, TOOLTIPS_OPEN_DELAY },
} = useAppConfig();

const productsSelected = ref();
const {
  assets: products,
  reload,
  remove: assetsRemove,
  processing,
} = useQueryManageAssetsProducts();
const itemLinkTo = (item: any) => ({
  to: {
    name: "aktiva-proizvodi-pid",
    params: { pid: item?.id },
  },
  external: true,
  target: "_blank",
});
const productGrops = (p: any) => [
  String(last(p.name.split(":"))).toLocaleUpperCase(),
];
const getid = (node: any) => get(node, "id");
const assetNameById = (id: any) => get(find(products.value, { id }), "name");

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
          <NuxtLink v-bind="itemLinkTo(item)">
            <VBtn
              @click.stop
              icon
              variant="text"
              size="small"
              density="comfortable"
              color="secondary"
              class="ms-2"
            >
              <Iconx
                icon="tabler:external-link"
                size="1.33rem"
                class="*-translate-y-px"
              />
            </VBtn>
          </NuxtLink>
          <span class="ps-4">{{ title }}</span>
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
        <VBtn
          @click.stop.prevent
          icon
          variant="plain"
          color="error"
          density="comfortable"
          class="ms-3"
        >
          <Iconx icon="mdi:trash-can" size="1.22rem" class="opacity-40" />
          <VMenu
            location="center"
            activator="parent"
            :close-on-content-click="false"
            :transition="DEFAULT_TRANSITION"
          >
            <VSheetPinCodeRequired
              message="Pin za brisanje proizvoda:"
              :props-actions="{ class: 'flex-col !gap-3' }"
            >
              <template #actions="{ pin, text }">
                <VBtn
                  @click="pin == text && assetsRemove([getid(item)])"
                  :disabled="text != pin"
                  color="error"
                  variant="tonal"
                  rounded="pill"
                  class="px-3"
                >
                  <template #prepend>
                    <Iconx size="1.22rem" icon="mdi:trash-can" />
                  </template>
                  <span>Obriši proizvod</span>
                </VBtn>
                <em
                  class="text-error"
                  :class="[text != pin ? 'opacity-20' : undefined]"
                  >{{ assetNameById(getid(item)) }}</em
                >
              </template>
            </VSheetPinCodeRequired>
          </VMenu>
        </VBtn>
      </template>
    </VCardDataIterator>
    <VFabMain :to="{ name: 'aktiva-proizvodi-nov' }" />
  </section>
</template>
<style lang="scss" scoped></style>
