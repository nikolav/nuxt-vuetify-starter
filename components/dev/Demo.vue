<script setup lang="ts">
import { Test } from "@/components/dev";

const foo = ref("");
const fooupdate = () => {
  foo.value = idGen();
};

// @@eos
</script>
<template>
  <VResponsive class="component--Demo mx-auto" :max-width="320">
    <VBtn @click="fooupdate">ok</VBtn>
    <Test :foo="foo">
      <template #prepend>
        1
      </template>
      <template #append>
        2
      </template>
      bar
    </Test>
  </VResponsive>
</template>
<style lang="scss" scoped></style>
