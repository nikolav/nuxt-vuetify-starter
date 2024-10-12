<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const sid = computed(() => get(route.params, "sid"));

const { assets } = useQueryManageAssets(undefined, () => [sid.value]);
const site = computed(() => first(assets.value));

// @@eos
</script>
<template>
  <section class="component--aktiva-lokali-sid">
    <Dump :data="{ site }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
