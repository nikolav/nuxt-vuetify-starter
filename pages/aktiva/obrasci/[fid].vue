<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const fid = computed(() => get(route.params, "fid"));

const { assets } = useQueryManageAssets(undefined, () => [fid.value]);
const form = computed(() => first(assets.value));

// @@eos
</script>
<template>
  <section class="component--aktiva-obrasci-fid">
    <Dump :data="{ form }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
