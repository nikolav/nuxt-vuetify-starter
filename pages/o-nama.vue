<script setup lang="ts">
const { n, d, t, setLocale, locale } = useI18n();
const localePath = useLocalePath();
const date = new Date();

// @@eos
</script>
<template>
  <section class="component--">
    <pre>{{ locale }}</pre>
    <VBtn color="primary" @click="setLocale('sr-Latn-RS')">sr-Latn-RS</VBtn>
    <VBtn color="primary" @click="setLocale('sr-Cyrl-RS')">sr-Cyrl-RS</VBtn>
    <VBtn @click="setLocale('en')">en</VBtn>
    |
    <NuxtLinkLocale to="/">index</NuxtLinkLocale>
    <hr />
    <p>{{ t("message.about") }}</p>
  </section>
</template>
<style lang="scss" scoped></style>
