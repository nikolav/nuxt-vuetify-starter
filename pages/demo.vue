<script setup lang="ts">
import { Dump } from "@/components/dev";
import { renderIcon } from "@/components/icons";
// definePageMeta({
//   layout: false,
// });

const { store, rate } = useTopicRating("$_1");
// @@eos
</script>
<template>
  <section class="page--demo">
    <VBtn v-for="i in range(1, 6)" @click="rate(i)" :key="i">r:{{ i }}</VBtn>
    <VResponsive max-width="550" class="mx-auto overflow-visible">
      <Dump :data="{ store }" />
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped></style>
