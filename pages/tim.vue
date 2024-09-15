<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const { users } = useQueryUsers();

// @@eos
</script>
<template>
  <section class="page--tim">
    <h1>tim</h1>
    <Dump :data="{ users }" />
  </section>
</template>
<style lang="scss" scoped></style>
