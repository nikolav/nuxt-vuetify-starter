<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
// @@eos
</script>
<template>
  <section class="page--index">
    <NuxtLink :to="localePath('o-nama')">{{ t("message.about") }}</NuxtLink> |
    <NuxtLink :to="localePath('o-nama', 'en')">{{
      t("message.about")
    }}</NuxtLink>
  </section>
</template>
<style lang="scss" scoped></style>
