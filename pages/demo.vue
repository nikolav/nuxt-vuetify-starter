<script setup lang="ts">
import { Dump } from "@/components/dev";

definePageMeta({
  layout: false,
});

const {
  data,
  commit,
  clear: dataClear,
  drop: fieldDrop,
} = useFirebaseCloudFirestoreDoc("app:config");

const fieldPut = async () => {
  await commit({ foo: Math.random(), bar: Math.random() });
};

const fieldDropFoo = async () => {
  await fieldDrop("foo");
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
    <VBtn @click="fieldPut">put</VBtn>
    <VBtn @click="dataClear">clear</VBtn>
    <VBtn @click="fieldDropFoo">drop:foo</VBtn>
    <Dump :data="{ data }" />
  </section>
</template>
<style lang="scss" scoped></style>
