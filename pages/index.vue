<script setup lang="ts">
const { n, d, t, setLocale } = useI18n();
const date = new Date();
// @@eos
</script>
<template>
  <section class="page--index">
    <VBtn color="primary" @click="setLocale('sr-Latn-RS')">sr-Latn-RS</VBtn>
    <VBtn color="primary" @click="setLocale('sr-Cyrl-RS')">sr-Cyrl-RS</VBtn>
    <VBtn @click="setLocale('en')">en</VBtn>
    <p>
      {{ t("message.welcome") }} | {{ d(date, "short") }} |
      {{ n(122333, "currency") }}
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
