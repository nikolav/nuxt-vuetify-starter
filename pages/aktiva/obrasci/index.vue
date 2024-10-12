<script setup lang="ts">
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const {
  db: {
    Assets: {
      type: { DIGITAL_FORM },
    },
  },
} = useAppConfig();
const {
  assets: forms,
  processing,
  reload: formsReload,
} = useQueryManageAssets(DIGITAL_FORM);
const formsSelected = ref();
const itemLinkToForm = (node: any) => ({
  name: "aktiva-obrasci-fid",
  params: { fid: node.raw.id },
});

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
    <VFabMain :to="{ name: 'aktiva-obrasci-nov' }" />
  </section>
</template>
<style lang="scss" scoped></style>
