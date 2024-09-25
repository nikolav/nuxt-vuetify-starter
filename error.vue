<script setup lang="ts">
import { type NuxtError } from "#app";
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "default",
});
const props = defineProps<{
  error: NuxtError;
}>();

// @@eos
</script>
<template>
  <section class="page--Error">
    <Dump :data="{ error }" />
    <pre class="text-xs">{{ error.stack }}</pre>
  </section>
</template>
<style lang="scss" scoped></style>
