<script setup lang="ts">
import { VFabMain } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
// @@eos
</script>
<template>
  <section class="page--obrasci">
    <p>:obrasci</p>
    <VFabMain />
  </section>
</template>
<style lang="scss" scoped></style>
