<script setup lang="ts">
import { Dump } from "@/components/dev";

// definePageMeta({
//   layout: false,
// });

const {
  icon: {
    aliases: { nuxt: iconNuxt },
  },
} = useAppConfig();

// @@eos
</script>
<template>
  <section class="page--demo">
    <Icon :size="`12rem`" :name="iconNuxt" />
  </section>
</template>
<style lang="scss" scoped></style>
