<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const date = new Date();

// @@eos
</script>
<template>
  <section class="component--">
    <div class="d-flex items-center gap-5 justify-center ma-2">
      <NuxtLinkLocale to="/">index</NuxtLinkLocale>
      <NuxtLinkLocale to="o-nama">o-nama</NuxtLinkLocale>
      <NuxtLinkLocale to="demo">demo</NuxtLinkLocale>
    </div>
    <hr />
    <p>{{ t("message.about") }}</p>
  </section>
</template>
<style lang="scss" scoped></style>
