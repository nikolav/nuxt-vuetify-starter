<script setup lang="ts">
import { Dump } from "@/components/dev";

// definePageMeta({
//   layout: false,
// });
const configRC = useFirebaseRemoteConfig();
const x$ = configRC("x");

// @@eos
</script>
<template>
  <section class="page--demo">
    <Dump :data="{ x$ }" />
  </section>
</template>
<style lang="scss" scoped></style>
