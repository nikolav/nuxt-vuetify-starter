<script setup lang="ts">
import { VFabMain } from "@/components/app";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});
// @@eos
</script>
<template>
  <section class="page--teren">
    <h1>teren</h1>
    <VFabMain :to="{ name: 'teren-izvestaj' }" />
  </section>
</template>
<style lang="scss" scoped></style>
