<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const { data, commit, rm, length } =
  useFirebaseCloudFirestoreCollection("demo");
const dropVar = async () => {
  console.log({ res: await rm("3U4smPGogYfpyd1pB1cO") });
};
const updateVar = async () => {
  await commit({ value: `::${Math.random()}` }, "3U4smPGogYfpyd1pB1cO");
};

// @@eos
</script>
<template>
  <section class="page--demo">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <VBtn @click="updateVar">put</VBtn>
    <VBtn @click="dropVar">drop</VBtn>
    <Dump :data="{ length, vars: data }" />
  </section>
</template>
<style lang="scss" scoped></style>
