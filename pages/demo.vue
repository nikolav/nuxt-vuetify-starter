<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const { data, commit, rm, length } =
  useFirebaseCloudFirestoreCollection("demo");
const dropVar = async () => {
  console.log({ res: await rm("MUhZc2LCLrb6rdqnrwFG") });
};
const updateVar = async () => {
  await commit({ value: `::${Math.random()}` }, "MUhZc2LCLrb6rdqnrwFG");
};

const ids = computed(() => map(data.value, "id"));

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
    <Dump :data="{ length, ids, vars: data }" />
  </section>
</template>
<style lang="scss" scoped></style>
