<script setup lang="ts">
import { Test } from "@/components/dev";

const ok = () => {
  throw createError({
    statusCode: 403,
    statusMessage: "error:test",
    fatal: true
  });
};

// @@eos
</script>
<template>
  <VResponsive :max-width="320" class="mx-auto">
    <VBtn @click="ok">ok</VBtn>
    <Test />
  </VResponsive>
</template>
<style lang="scss" scoped></style>
