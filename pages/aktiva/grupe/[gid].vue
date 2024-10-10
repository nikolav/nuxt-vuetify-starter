<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  layout: "app-default",
  middleware: "authorized",
});

const route = useRoute();
const gid = computed(() => get(route.params, "gid"));
const { ls } = useQueryGroupsManage(() => [gid.value]);
const g = computed(() => first(ls.value));

// @@eos
</script>
<template>
  <section class="page--aktiva-grupe-gid">
    <h1>aktiva-grupe-gid</h1>
    <Dump :data="{ group: g }" />
  </section>
</template>
<style lang="scss" scoped></style>
<style lang="scss"></style>
