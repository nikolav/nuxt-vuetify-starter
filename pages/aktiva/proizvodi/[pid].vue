<script setup lang="ts">
// ##imports
import { Dump } from "@/components/dev";
// ##config
definePageMeta({
  layout: "default",
  // middleware: "authorized",
});

// ##utils
const route = useRoute();
const pid = computed(() => get(route.params, "pid"));
// ##icons
// ##refs ##flags
// ##data ##auth ##state
const { assets: products } = useQueryManageAssetsProducts(() => [pid.value]);
// ##computed
const p = computed(() => first(products.value));
const titleProductName = computed(() => p.value?.name || "");
// ##forms ##helpers
// ##watch
// ##hooks:lifecycle
// ##head
useHead({ title: titleProductName });

// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi-pid">
    <h1>[# {{ p?.id }}]</h1>
    <h2>{{ p?.name }}</h2>
    <Dump :data="{ p }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style module></style>
<style lang="scss"></style>
