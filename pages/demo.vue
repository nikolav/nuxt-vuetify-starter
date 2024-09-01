<script setup lang="ts">
import { Dump } from "@/components/dev";
// definePageMeta({
//   layout: false,
// });

const { store, rate } = useTopicRating("$_1");
const range16 = range(1, 6);
// @@eos
</script>
<template>
  <section class="page--demo">
    <VBtn v-for="i in range16" :key="i" @click="rate(i)">r:{{ i }}</VBtn>
    <VResponsive max-width="550" class="mx-auto overflow-visible">
      <Dump :data="{ store }" />
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped></style>
