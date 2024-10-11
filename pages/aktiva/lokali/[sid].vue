<script setup lang="ts">
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const sid = computed(() => get(route.params, "sid"));

// @@eos
</script>
<template>
  <section class="component--aktiva-lokali-sid">
    <h1>:lokali-{{ sid }}</h1>
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
