<script setup lang="ts">
definePageMeta({
  layout: false,
});
const { tr } = useGoogleTranslateApi();
const gtr = async () => {
  const res = await tr({
    q: "hello",
    target: "es",
  });
  console.log({ res });
};
// @@eos
</script>
<template>
  <section class="page--demo">
    <NuxtLinkLocale to="/">index</NuxtLinkLocale> |
    <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    <hr />
    <VBtn @click="gtr">tr</VBtn>
  </section>
</template>
<style lang="scss" scoped></style>
