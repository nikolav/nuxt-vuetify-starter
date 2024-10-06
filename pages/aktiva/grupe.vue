<script setup lang="ts">
import { VFabMain } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
// @@eos
</script>
<template>
  <section class="page--grupe">
    <p>:grupe</p>
    <VFabMain />
  </section>
</template>
<style lang="scss" scoped></style>
