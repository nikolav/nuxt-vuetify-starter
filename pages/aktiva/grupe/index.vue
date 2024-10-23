<script setup lang="ts">
// mGboFLwXJpbrJ1T
import { useDisplay } from "vuetify";
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

// @utils
const { smAndUp } = useDisplay();

// @data @auth
const { assets: groups, reload, processing } = useQueryManageAssetsGroups();

// @forms @helpers
const itemTo = (item: any) => ({
  name: "aktiva-grupe-gid",
  params: { gid: item?.id },
});
const {
  categoryNodeByTag,
  categoryTagByAsset,
  groups: { top: parent },
} = useCategoryAssets();
const itemGroups = (g: any) =>
  [categoryNodeByTag(categoryTagByAsset(g), parent)?.value().title].filter(
    Boolean
  );
useHead({ title: "Grupe" });
// @@eos
</script>
<template>
  <section class="page--aktiva-grupe">
    <VCardDataIterator
      :items="groups"
      item-title="name"
      :item-groups="itemGroups"
      :item-to="itemTo"
      :reload="reload"
      :card-props="{ disabled: processing }"
      :menu-props="{ 'max-height': 255 }"
      :per-page="3"
    >
      <template #menu="{ selection }">
        <p>{{ selection?.length }}</p>
      </template>
    </VCardDataIterator>
    <VFabMain
      :class="[smAndUp ? '-translate-x-12' : '-translate-y-8 translate-x-2']"
      :to="{ name: 'aktiva-grupe-nova' }"
    />
  </section>
</template>
<style lang="scss" scoped></style>
