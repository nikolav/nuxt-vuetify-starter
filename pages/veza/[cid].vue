<script setup lang="ts">
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const cid = computed(() => get(route.params, "cid"));

// @@eos
</script>
<template>
  <section class="page--veza-cid">
    <h1>:veza-{{ cid }}</h1>
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
