<script setup lang="ts">
import { Demo } from "@/components/dev";
definePageMeta({
  middleware: "access-debug",
});

// @@eos
</script>
<template>
  <section class="page--demo">
    <div>
      <VBtn icon density="comfortable" :to="{ name: 'index' }"> &lt; </VBtn>
    </div>
    <hr />
    <Demo />
  </section>
</template>
<style lang="scss" scoped></style>
