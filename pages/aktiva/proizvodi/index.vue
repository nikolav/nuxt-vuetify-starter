<script setup lang="ts">
import { Dump } from "@/components/dev";
import { VFabMain } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { products } = useQueryProductsList();
// @@eos
</script>
<template>
  <section class="page--proizvodi">
    <p>:proizvodi</p>
    <NuxtLink :to="{ name: 'aktiva-proizvodi-pid', params: { pid: 1 } }"
      >p:1</NuxtLink
    >
    <VFabMain :to="{ name: 'aktiva-proizvodi-nov' }" />
    <Dump :data="{ products }" />
  </section>
</template>
<style lang="scss" scoped></style>
