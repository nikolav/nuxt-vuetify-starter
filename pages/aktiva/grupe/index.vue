<script setup lang="ts">
import { VFabMain } from "@/components/app";
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { ls } = useQueryGroupsManage();

// @@eos
</script>
<template>
  <section class="page--grupe">
    <p>:grupe</p>
    <NuxtLink :to="{ name: `aktiva-grupe-gid`, params: { gid: 46 } }">
      <a>gid:goto</a>
    </NuxtLink>

    <VFabMain :to="{ name: 'aktiva-grupe-nova' }" />
    <Dump :data="{ ls }" />
  </section>
</template>
<style lang="scss" scoped></style>
