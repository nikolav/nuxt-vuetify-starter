<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const { store, rate } = useTopicRating("@R1");

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <Dump :data="{ store }" />
    <VBtn v-for="n in 5" :key="n" @click="rate(n)">{{ n }}</VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
