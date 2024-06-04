<script setup lang="ts">
const { t, setLocale } = useI18n();
// @@eos
</script>
<template>
  <section class="page--index">
    <button @click="setLocale('en')">en</button>
    <button @click="setLocale('sr')">sr</button>
    <p>
      {{ t("message.apple", 1) }}
    </p>
  </section>
</template>
<style lang="scss" scoped></style>
