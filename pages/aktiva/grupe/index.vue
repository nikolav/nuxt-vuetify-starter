<script setup lang="ts">
// mGboFLwXJpbrJ1T
import { VFabMain, VCardDataIterator } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

// @data @auth

const {
  db: {
    Assets: {
      type: { PEOPLE_GROUP_TEAM },
    },
  },
} = useAppConfig();
const {
  assets: groups,
  reload,
  processing,
} = useQueryManageAssets(PEOPLE_GROUP_TEAM);
const itemTo = (item: any) => ({
  name: "aktiva-grupe-gid",
  params: { gid: item.raw.id },
});
const lsItemGroups = (d: any) => [last(d.name.split(":"))];

// @@eos
</script>
<template>
  <section class="page--aktiva-grupe">
    <VCardDataIterator
      :items="groups"
      item-title="name"
      :reload="reload"
      :card-props="{ disabled: processing }"
      :menu-props="{ 'max-height': 255 }"
      :item-to="itemTo"
      :item-groups="lsItemGroups"
      :per-page="3"
    >
      <template #menu="{ selection }">
        <p>{{ selection?.length }}</p>
      </template>
    </VCardDataIterator>
    <VFabMain :to="{ name: 'aktiva-grupe-nova' }" />
  </section>
</template>
<style lang="scss" scoped></style>
