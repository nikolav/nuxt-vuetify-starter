<script setup lang="ts">
import { useDisplay } from "vuetify";
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { smAndUp } = useDisplay();

const {
  assets: forms,
  processing,
  reload: formsReload,
} = useQueryManageAssetsForms();
const formsSelected = ref();
const itemLinkToForm = (item: any) => ({
  name: "aktiva-obrasci-fid",
  params: { fid: item?.id },
});

useHead({ title: "Obrasci" });
// @@eos
</script>
<template>
  <section class="page--aktiva-obrasci">
    <VCardDataIterator
      v-model="formsSelected"
      :items="forms"
      :card-props="{ disabled: processing }"
      item-title="name"
      :item-to="itemLinkToForm"
      :per-page="2"
      :reload="formsReload"
    >
      <template #menu> forms:active </template>
    </VCardDataIterator>
    <VFabMain
      :class="[smAndUp ? '-translate-x-12' : '-translate-y-8 translate-x-2']"
      :to="{ name: 'aktiva-obrasci-nov' }"
    />
  </section>
</template>
<style lang="scss" scoped></style>
