<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
  </section>
</template>
<style lang="scss" scoped></style>
