<script setup lang="ts">
import { Dump } from "@/components/dev";
definePageMeta({
  middleware: "authorized",
  layout: "app-default",
});

const route = useRoute();
const { users } = useQueryUsers(() => [Number(route.params.uid)]);
const user = computed(() => first(users.value));

// @@eos
</script>
<template>
  <section class="page--tim-uid">
    <Dump :data="{ user }" />
  </section>
</template>
<style lang="scss" scoped></style>
