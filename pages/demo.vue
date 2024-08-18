<script setup lang="ts">
import { Dump } from "@/components/dev";

// definePageMeta({
//   layout: false,
// });

const { config } = useFirebaseRemoteConfig();

const configApp = await config("app");

// @@eos
</script>
<template>
  <section class="page--demo">
    <Dump :data="{ configApp }" />
  </section>
</template>
<style lang="scss" scoped></style>
