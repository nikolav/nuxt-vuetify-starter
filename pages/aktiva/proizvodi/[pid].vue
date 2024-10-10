<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const pid = computed(() => get(route.params, "pid"));
const { products } = useQueryProductsList(() => [pid.value]);
const p = computed(() => first(products.value));
// @@eos
</script>
<template>
  <section class="page--aktiva-proizvodi-pid">
    <h1>:proizvodi-pid</h1>
    <Dump :data="{ product: p }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
